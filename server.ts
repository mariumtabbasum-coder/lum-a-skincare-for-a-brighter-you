import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { PRODUCTS, Product } from './src/data/products';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '1mb' }));

// API Key detection (supports both GEMINI_API_KEY and GOOGLE_GENAI_API_KEY)
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || '';

let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Compact catalogue representation for Gemini prompt context
const CATALOGUE_PROMPT_SUMMARY = PRODUCTS.map((p) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  price: p.price,
  skinTypes: p.skinTypes,
  concerns: p.concerns,
  shortDescription: p.shortDescription,
  keyBenefits: p.benefits.slice(0, 3),
  keyIngredients: p.ingredients.slice(0, 4),
}));

/**
 * Intelligent local fallback recommender when Gemini API is unavailable or encounters quota issues.
 * Ensures the assistant is 100% functional, responsive, and grounded in real Luméa products.
 */
function localSkincareRecommender(userMessage: string, history: Array<{ role: string; text: string }> = []) {
  const query = `${history.map((h) => h.text).join(' ')} ${userMessage}`.toLowerCase();

  // Detect skin type
  let detectedSkinType: string | null = null;
  if (query.includes('oily')) detectedSkinType = 'Oily';
  else if (query.includes('dry')) detectedSkinType = 'Dry';
  else if (query.includes('combination') || query.includes('combo')) detectedSkinType = 'Combination';
  else if (query.includes('sensitive') || query.includes('redness')) detectedSkinType = 'Sensitive';
  else if (query.includes('normal')) detectedSkinType = 'Normal';

  // Detect skin concerns
  const detectedConcerns: string[] = [];
  if (query.includes('hydrat') || query.includes('moisture') || query.includes('flak') || query.includes('dehydrat')) detectedConcerns.push('Hydration');
  if (query.includes('acne') || query.includes('blemish') || query.includes('breakout') || query.includes('pimple') || query.includes('pore')) detectedConcerns.push('Acne');
  if (query.includes('age') || query.includes('wrinkle') || query.includes('fine line') || query.includes('firm')) detectedConcerns.push('Anti-Aging');
  if (query.includes('bright') || query.includes('glow') || query.includes('dark spot') || query.includes('dull') || query.includes('pigment')) detectedConcerns.push('Brightening');
  if (query.includes('sooth') || query.includes('calm') || query.includes('irritat') || query.includes('sensitiv')) detectedConcerns.push('Soothing');

  // Detect category goal
  let targetCategory: string | null = null;
  if (query.includes('serum')) targetCategory = 'Serum';
  else if (query.includes('moisturizer') || query.includes('cream')) targetCategory = 'Moisturizer';
  else if (query.includes('cleanser') || query.includes('wash')) targetCategory = 'Cleanser';
  else if (query.includes('toner') || query.includes('mist')) targetCategory = 'Toner';
  else if (query.includes('mask')) targetCategory = 'Mask';
  else if (query.includes('eye')) targetCategory = 'Eye Care';
  else if (query.includes('sun') || query.includes('spf')) targetCategory = 'Sunscreen';

  // Score products
  const scored = PRODUCTS.map((product) => {
    let score = 0;
    const reasons: string[] = [];

    if (targetCategory && product.category === targetCategory) {
      score += 4;
      reasons.push(`Perfect match for your ${targetCategory.toLowerCase()} search`);
    }

    if (detectedSkinType && product.skinTypes.includes(detectedSkinType as any)) {
      score += 3;
      reasons.push(`Formulated specifically for ${detectedSkinType.toLowerCase()} skin`);
    }

    for (const concern of detectedConcerns) {
      if (product.concerns.includes(concern as any)) {
        score += 3;
        reasons.push(`Targets ${concern.toLowerCase()} effectively with gentle botanicals`);
      }
    }

    if (product.isBestseller) {
      score += 1;
    }

    return {
      product,
      score,
      reason: reasons.length > 0 ? reasons.slice(0, 2).join(' and ') + '.' : product.shortDescription,
    };
  });

  scored.sort((a, b) => b.score - a.score || b.product.popularity - a.product.popularity);

  // Pick top 2 or 3
  const topMatches = scored.slice(0, 3).filter((item) => item.score > 0);
  const finalMatches = topMatches.length > 0 ? topMatches : scored.slice(0, 2);

  let message = '';
  let followUpQuestion: string | null = null;

  if (query.includes('routine')) {
    message = "Here is a gentle, botanical routine tailored for your skin. Consistent daily care with clean, nourishing ingredients helps restore natural balance and radiance.";
    followUpQuestion = "Would you like advice on application order or daytime vs nighttime use?";
  } else if (detectedSkinType && detectedConcerns.length > 0) {
    message = `Based on your ${detectedSkinType.toLowerCase()} skin and focus on ${detectedConcerns.join(' & ').toLowerCase()}, I've selected Luméa formulas that balance hydration without clogging pores.`;
    followUpQuestion = "Are you looking for lightweight morning hydration or a richer restorative night routine?";
  } else if (detectedSkinType) {
    message = `For ${detectedSkinType.toLowerCase()} skin, gentle barrier support is key. Here are Luméa's most beloved botanical formulas designed for your skin's natural pH.`;
    followUpQuestion = "What is your primary skincare goal right now—brightening, soothing, or anti-aging?";
  } else {
    message = "I've curated some of Luméa's top botanical favorites that nurture skin texture, lock in hydration, and reveal a luminous complexion.";
    followUpQuestion = "Tell me a bit about your skin type (dry, oily, combination, or sensitive) so I can further refine these recommendations for you!";
  }

  return {
    message,
    followUpQuestion,
    recommendations: finalMatches.map((m) => ({
      productId: m.product.id,
      reason: m.reason,
    })),
  };
}

/**
 * Chat API endpoint
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length > 1000) {
      return res.status(400).json({ error: 'Message exceeds 1000 characters limit.' });
    }

    const safeHistory = Array.isArray(history)
      ? history.slice(-8).map((h) => ({
          role: h.role === 'assistant' || h.role === 'model' ? 'model' : 'user',
          text: String(h.text || '').slice(0, 1000),
        }))
      : [];

    // Skincare safety check for serious medical symptoms
    const lower = trimmedMessage.toLowerCase();
    const severeTerms = ['burn', 'severe bleeding', 'infection', 'open wound', 'prescription', 'corticosteroid', 'cystic severe', 'blistering'];
    const hasSevereTerm = severeTerms.some((t) => lower.includes(t));
    if (hasSevereTerm) {
      return res.json({
        message:
          "Your skin health and well-being come first. For persistent, severe, blistering, or painful symptoms, we strongly recommend having your skin evaluated in person by a board-certified dermatologist or medical professional. Luméa products are gentle cosmetic formulations meant for daily skincare maintenance, not medical treatment.",
        followUpQuestion: null,
        recommendations: [],
      });
    }

    // Try Gemini API if key is present
    if (aiClient) {
      try {
        const systemInstruction = `You are Luméa Skin Assistant, the official AI skincare advisor for Luméa—a luxury botanical clean skincare brand.
Your brand values are: gentle botanical efficacy, elegant luxury, scientific formulation, and kindness to skin and planet.
Your tone is warm, refined, knowledgeable, and polite.

CRITICAL RULES:
1. Luméa Product Catalogue is your ABSOLUTE source of truth.
Here is the available Luméa product list:
${JSON.stringify(CATALOGUE_PROMPT_SUMMARY, null, 2)}

2. NEVER invent product names, IDs, prices, ingredients, or clinical guarantees. Only recommend products whose IDs exist in the catalogue list above.
3. Recommend 1 to 3 relevant products when appropriate. If the user is just saying hello or asking a general question, you do not need to force recommendations unless relevant.
4. Always provide an authentic reason grounded in the product's actual botanical ingredients or benefits.
5. Ask ONE concise, helpful follow-up question when useful to narrow down skin needs (skin type, concern, or texture preference).
6. Never diagnose medical conditions, promise cures for chronic diseases, or offer medical advice. Keep advice cosmetic and educational.
7. Return your response strictly following the JSON schema provided.`;

        // Format conversation contents for Gemini
        const formattedContents: any[] = [];
        for (const item of safeHistory) {
          formattedContents.push({
            role: item.role === 'model' ? 'model' : 'user',
            parts: [{ text: item.text }],
          });
        }
        formattedContents.push({
          role: 'user',
          parts: [{ text: trimmedMessage }],
        });

        const geminiResponse = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: formattedContents,
          config: {
            systemInstruction,
            temperature: 0.7,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                message: {
                  type: Type.STRING,
                  description: 'Polite, concise conversational response tailored to Luméa skincare.',
                },
                followUpQuestion: {
                  type: Type.STRING,
                  description: 'A helpful follow-up question, or empty string if none needed.',
                },
                recommendations: {
                  type: Type.ARRAY,
                  description: 'List of 0 to 3 product recommendations from the Luméa catalogue.',
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      productId: {
                        type: Type.STRING,
                        description: 'The exact Luméa product ID from the catalogue (e.g., lumea-01).',
                      },
                      reason: {
                        type: Type.STRING,
                        description: 'A brief, evidence-based reason referencing real botanical benefits.',
                      },
                    },
                    required: ['productId', 'reason'],
                  },
                },
              },
              required: ['message', 'recommendations'],
            },
          },
        });

        const textOutput = geminiResponse.text?.trim();
        if (textOutput) {
          const parsed = JSON.parse(textOutput);
          
          // Validate recommendations against PRODUCTS
          const validRecs: Array<{ product: Product; reason: string }> = [];
          if (Array.isArray(parsed.recommendations)) {
            for (const rec of parsed.recommendations) {
              const matchedProduct = PRODUCTS.find((p) => p.id === rec.productId);
              if (matchedProduct && !validRecs.some((r) => r.product.id === matchedProduct.id)) {
                validRecs.push({
                  product: matchedProduct,
                  reason: rec.reason || matchedProduct.shortDescription,
                });
              }
            }
          }

          return res.json({
            message: parsed.message,
            followUpQuestion: parsed.followUpQuestion || null,
            recommendations: validRecs.slice(0, 3).map((r) => ({
              productId: r.product.id,
              product: {
                id: r.product.id,
                slug: r.product.slug,
                name: r.product.name,
                category: r.product.category,
                price: r.product.price,
                images: r.product.images,
                badge: r.product.badge,
                rating: r.product.rating,
                reviewCount: r.product.reviewCount,
              },
              reason: r.reason,
            })),
          });
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to local intelligent matcher:', geminiError);
      }
    }

    // Fallback: Local rule-based recommendation engine
    const fallbackResult = localSkincareRecommender(trimmedMessage, safeHistory);
    const enrichedRecs = fallbackResult.recommendations
      .map((rec) => {
        const prod = PRODUCTS.find((p) => p.id === rec.productId);
        if (!prod) return null;
        return {
          productId: prod.id,
          product: {
            id: prod.id,
            slug: prod.slug,
            name: prod.name,
            category: prod.category,
            price: prod.price,
            images: prod.images,
            badge: prod.badge,
            rating: prod.rating,
            reviewCount: prod.reviewCount,
          },
          reason: rec.reason,
        };
      })
      .filter(Boolean);

    return res.json({
      message: fallbackResult.message,
      followUpQuestion: fallbackResult.followUpQuestion,
      recommendations: enrichedRecs,
    });
  } catch (error: any) {
    console.error('Error in /api/chat endpoint:', error);
    return res.status(500).json({
      error: 'An unexpected error occurred while processing your request. Please try again.',
    });
  }
});

// Production static file serving or Dev Vite middleware
async function setupServer() {
  if (isProduction) {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Luméa server running on http://0.0.0.0:${PORT} (${isProduction ? 'production' : 'development'})`);
  });
}

setupServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
