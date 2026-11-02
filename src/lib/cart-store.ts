/**
 * LocalStorage-backed Shared Cart Store for Luméa Skincare
 * Versioned key, price re-validation against product catalog, cross-tab sync, custom event dispatching.
 */

import { PRODUCTS, getProductById, Product } from '../data/products';
import { validateCoupon } from './validation';

const STORAGE_KEY = 'lumea_cart_v1';
export const CART_UPDATED_EVENT = 'lumea_cart_updated';

export interface CartStoredItem {
  productId: string;
  quantity: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  itemTotal: number;
}

export interface CartState {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  couponCode?: string;
  discountPercent?: number;
}

function safeGetStoredItems(): CartStoredItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    
    // Validate each item against product database
    return parsed.filter(item => {
      return (
        item &&
        typeof item.productId === 'string' &&
        typeof item.quantity === 'number' &&
        item.quantity > 0 &&
        getProductById(item.productId) !== undefined
      );
    });
  } catch (err) {
    console.warn('Could not read cart from localStorage, initializing fresh', err);
    return [];
  }
}

function safeSaveStoredItems(items: CartStoredItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
  } catch (err) {
    console.warn('Could not save cart to localStorage', err);
  }
}

// In-memory active coupon state (persisted per session)
let appliedCouponCode: string | undefined = undefined;
let appliedDiscountPercent: number = 0;

export function getCartState(): CartState {
  const stored = safeGetStoredItems();
  const items: CartItem[] = [];
  let subtotal = 0;
  let itemCount = 0;

  for (const entry of stored) {
    const product = getProductById(entry.productId);
    if (product) {
      const quantity = Math.max(1, Math.min(99, Math.floor(entry.quantity)));
      const itemTotal = Number((product.price * quantity).toFixed(2));
      items.push({
        product,
        quantity,
        itemTotal
      });
      subtotal += itemTotal;
      itemCount += quantity;
    }
  }

  subtotal = Number(subtotal.toFixed(2));
  
  // Flat shipping demo fee: $5.00 unless empty or free shipping coupon
  let shipping = items.length > 0 ? 5.00 : 0.00;
  if (appliedCouponCode === 'FREESHIP') {
    shipping = 0.00;
  }

  // Calculate discount percentage if coupon is valid
  let discount = 0.00;
  if (appliedDiscountPercent > 0 && subtotal > 0) {
    discount = Number(((subtotal * appliedDiscountPercent) / 100).toFixed(2));
  }

  const total = Number(Math.max(0, subtotal - discount + shipping).toFixed(2));

  return {
    items,
    itemCount,
    subtotal,
    shipping,
    discount,
    total,
    couponCode: appliedCouponCode,
    discountPercent: appliedDiscountPercent
  };
}

export function addToCart(productId: string, quantity: number = 1): CartState {
  const product = getProductById(productId);
  if (!product) return getCartState();

  const validQty = Math.max(1, Math.min(99, Math.floor(quantity)));
  const stored = safeGetStoredItems();
  const existingIndex = stored.findIndex(i => i.productId === productId);

  if (existingIndex >= 0) {
    stored[existingIndex].quantity = Math.min(99, stored[existingIndex].quantity + validQty);
  } else {
    stored.push({ productId, quantity: validQty });
  }

  safeSaveStoredItems(stored);
  return getCartState();
}

export function updateCartQuantity(productId: string, quantity: number): CartState {
  const stored = safeGetStoredItems();
  const index = stored.findIndex(i => i.productId === productId);

  if (index >= 0) {
    if (quantity <= 0) {
      stored.splice(index, 1);
    } else {
      stored[index].quantity = Math.min(99, Math.max(1, Math.floor(quantity)));
    }
    safeSaveStoredItems(stored);
  }

  return getCartState();
}

export function removeFromCart(productId: string): CartState {
  const stored = safeGetStoredItems();
  const filtered = stored.filter(i => i.productId !== productId);
  safeSaveStoredItems(filtered);
  return getCartState();
}

export function clearCart(): CartState {
  appliedCouponCode = undefined;
  appliedDiscountPercent = 0;
  safeSaveStoredItems([]);
  return getCartState();
}

export function applyCartCoupon(code: string): { success: boolean; message: string; cart: CartState } {
  const result = validateCoupon(code);
  if (result.valid) {
    appliedCouponCode = code.trim().toUpperCase();
    appliedDiscountPercent = result.discountPercent || 0;
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
    }
    return { success: true, message: result.message, cart: getCartState() };
  } else {
    return { success: false, message: result.message, cart: getCartState() };
  }
}

export function removeCartCoupon(): CartState {
  appliedCouponCode = undefined;
  appliedDiscountPercent = 0;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
  }
  return getCartState();
}
