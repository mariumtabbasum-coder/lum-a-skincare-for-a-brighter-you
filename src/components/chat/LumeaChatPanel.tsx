import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  RotateCcw,
  Send,
  Loader2,
  Info,
  ChevronDown,
} from 'lucide-react';
import { ChatMessage, QuickReplyOption } from './types';
import { ChatMessageItem } from './ChatMessageItem';
import { QuickReplies } from './QuickReplies';

const INITIAL_QUICK_REPLIES: QuickReplyOption[] = [
  { label: '✨ Find products for my skin', actionText: 'Find products for my skin' },
  { label: '🌿 Help with a skincare concern', actionText: 'Help with a skincare concern' },
  { label: '🧴 Build my skincare routine', actionText: 'Build my skincare routine' },
  { label: '🌸 Explore Luméa products', actionText: 'Explore Luméa products' },
];

const SECONDARY_SKIN_TYPES: QuickReplyOption[] = [
  { label: 'Dry Skin', actionText: 'My skin is dry and feels tight' },
  { label: 'Oily Skin', actionText: 'My skin is oily and prone to shine' },
  { label: 'Combination', actionText: 'I have combination skin (oily T-zone)' },
  { label: 'Sensitive Skin', actionText: 'My skin is sensitive and prone to redness' },
  { label: 'Normal Skin', actionText: 'My skin is normal and balanced' },
];

const SECONDARY_CONCERNS: QuickReplyOption[] = [
  { label: '💧 Hydration & Dryness', actionText: 'I need intense hydration for dry skin' },
  { label: '✨ Brightening & Glow', actionText: 'I want to brighten dull skin and dark spots' },
  { label: '🌱 Acne & Blemishes', actionText: 'I want help with breakouts and blemishes' },
  { label: '⏳ Anti-Aging & Fine Lines', actionText: 'I am looking for anti-aging and firming care' },
  { label: '🍃 Soothing Redness', actionText: 'I need soothing formulas for irritated skin' },
];

const WELCOME_TEXT =
  "Hi, welcome to Luméa! ✨ I'm your personal skincare assistant. I can help you understand your skincare needs and discover products from our botanical collection. Let's find something that suits you!";

const STORAGE_SESSION_KEY = 'lumea_assistant_chat_session';

interface LumeaChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LumeaChatPanel: React.FC<LumeaChatPanelProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem(STORAGE_SESSION_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (err) {
        console.warn('Could not read chat history from sessionStorage', err);
      }
    }
    return [
      {
        id: 'welcome-msg',
        role: 'assistant',
        text: WELCOME_TEXT,
        timestamp: Date.now(),
      },
    ];
  });

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const [quickReplies, setQuickReplies] = useState<QuickReplyOption[]>(INITIAL_QUICK_REPLIES);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync to sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(messages));
      } catch (err) {
        console.warn('Could not save chat history to sessionStorage', err);
      }
    }
  }, [messages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Focus textarea when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const panelRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside of the chat panel anywhere on the website
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;
      // If clicking inside the panel, do nothing
      if (panelRef.current && panelRef.current.contains(target)) {
        return;
      }
      // If clicking the launcher button, ignore (launcher handles its own toggle)
      if (target.closest && target.closest('[data-chat-launcher="true"]')) {
        return;
      }
      onClose();
    };

    // Use capture phase for immediate responsiveness anywhere on document
    document.addEventListener('mousedown', handleClickOutside, true);
    document.addEventListener('touchstart', handleClickOutside, { capture: true, passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('touchstart', handleClickOutside, { capture: true });
    };
  }, [isOpen, onClose]);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSendMessage = async (userTextToSend?: string) => {
    const messageToSend = (userTextToSend || inputText).trim();
    if (!messageToSend || isLoading) return;

    setInputText('');
    setLastFailedMessage(null);

    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      role: 'user',
      text: messageToSend,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Update contextual quick replies based on intent
    const lower = messageToSend.toLowerCase();
    if (lower.includes('skin') || lower.includes('find products')) {
      setQuickReplies(SECONDARY_SKIN_TYPES);
    } else if (lower.includes('concern') || lower.includes('blemish') || lower.includes('dry') || lower.includes('acne')) {
      setQuickReplies(SECONDARY_CONCERNS);
    } else if (lower.includes('routine')) {
      setQuickReplies([
        { label: 'Morning Routine', actionText: 'What is a good morning botanical routine?' },
        { label: 'Nighttime Routine', actionText: 'What is a soothing nighttime routine?' },
        { label: 'Order of Application', actionText: 'In what order should I apply serums, moisturizers, and oils?' },
      ]);
    } else {
      setQuickReplies([]);
    }

    try {
      // Build server request payload
      const historyPayload = messages
        .filter((m) => !m.isError)
        .slice(-6)
        .map((m) => ({
          role: m.role,
          text: m.text,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToSend,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with ${res.status}`);
      }

      const data = await res.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        role: 'assistant',
        text: data.message || "Here are my thoughts on your skincare routine:",
        followUpQuestion: data.followUpQuestion || null,
        recommendations: data.recommendations || [],
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setLastFailedMessage(messageToSend);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        text:
          err.message ||
          "I'm sorry, I encountered a temporary connection issue. Please tap 'Try again' to re-send your message.",
        timestamp: Date.now(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      handleSendMessage(lastFailedMessage);
    }
  };

  const handleResetChat = () => {
    const freshWelcome: ChatMessage = {
      id: 'welcome-msg',
      role: 'assistant',
      text: WELCOME_TEXT,
      timestamp: Date.now(),
    };
    setMessages([freshWelcome]);
    setQuickReplies(INITIAL_QUICK_REPLIES);
    setInputText('');
    setLastFailedMessage(null);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(STORAGE_SESSION_KEY);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Click-away backdrop overlay covering the website */}
      <div
        className="fixed inset-0 z-45 bg-[#3E2F3F]/20 backdrop-blur-[0.5px] transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-label="Luméa Skin Assistant"
        aria-modal="true"
        className="fixed z-50 bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-32px)] sm:w-[420px] max-w-[430px] h-[82vh] max-h-[640px] flex flex-col bg-[#FFF9FA] border border-[#F0D5DF] rounded-[24px] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300"
      >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#5D3A58] via-[#6B4B6B] to-[#5D3A58] text-white px-4 py-3.5 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center border border-white/20">
            <Sparkles className="w-4 h-4 text-[#FDE8EF]" />
          </div>
          <div>
            <h2 className="text-[14px] font-serif font-bold tracking-wide text-white leading-tight">
              Luméa Skin Assistant
            </h2>
            <p className="text-[11px] text-white/80 leading-none mt-0.5">
              Your personal botanical guide
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleResetChat}
            className="p-1.5 rounded-full hover:bg-white/15 text-white/85 hover:text-white transition-colors cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-white/40"
            title="Start New Chat"
            aria-label="Start New Chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/15 text-white/85 hover:text-white transition-colors cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-white/40"
            title="Close Assistant"
            aria-label="Close Assistant"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div className="bg-[#FAF0F3] border-b border-[#F5DFE6] px-3.5 py-1.5 text-[11px] text-[#7A5672] flex items-center gap-1.5 shrink-0">
        <Info className="w-3.5 h-3.5 shrink-0 text-[#9C7594]" />
        <span className="truncate">
          Cosmetic product guidance only. Not medical advice.
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {messages.map((message) => (
          <ChatMessageItem
            key={message.id}
            message={message}
            onRetry={handleRetry}
            onQuickSelect={(t) => handleSendMessage(t)}
            onNavigate={onClose}
          />
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#5D3A58] to-[#8C5E87] flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FDE8EF]" />
            </div>
            <div className="bg-white border border-[#F0D5DF] rounded-[18px] rounded-tl-[4px] px-4 py-2.5 shadow-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#5D3A58]/40 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#5D3A58]/60 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#5D3A58] animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] text-[#7A5672] ml-2">Consulting Luméa botanical catalogue...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies Footer */}
      {quickReplies.length > 0 && !isLoading && (
        <div className="px-3.5 py-1.5 border-t border-[#F5E2E8] bg-[#FFF5F7] shrink-0">
          <QuickReplies
            options={quickReplies}
            onSelect={(actionText) => handleSendMessage(actionText)}
            disabled={isLoading}
          />
        </div>
      )}

      {/* Composer Input */}
      <div className="p-3 bg-white border-t border-[#F0D5DF] shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-end gap-2 bg-[#FFF7F9] border border-[#EFC6D8] rounded-[20px] p-1.5 focus-within:border-[#C48FA8] focus-within:ring-2 focus-within:ring-[#F0D5DF] transition-all outline-none"
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={inputText}
            onChange={(e) => setInputText(e.target.value.slice(0, 1000))}
            onKeyDown={handleKeyDown}
            placeholder="Ask about skin type, concerns, or ingredients..."
            disabled={isLoading}
            style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
            className="chat-composer-textarea flex-1 bg-transparent border-0 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 shadow-none resize-none px-3 py-1.5 text-[13px] text-[#3E2F3F] placeholder-[#9C7F94] min-h-[38px] max-h-[100px]"
            aria-label="Message Luméa Skin Assistant"
          />

          <div className="flex items-center gap-1.5 shrink-0 pr-1 pb-0.5">
            {inputText.length > 150 && (
              <span className="text-[10px] text-[#9C7F94]">
                {inputText.length}/1000
              </span>
            )}

            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="w-8 h-8 rounded-full bg-[#5D3A58] hover:bg-[#4E2E4A] active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5 -ml-0.5" />
              )}
            </button>
          </div>
        </form>

        <div className="mt-1.5 text-center">
          <span className="text-[10px] text-[#9C7F94]">
            Press Enter to send • Shift+Enter for new line
          </span>
        </div>
      </div>
    </div>
  </>
);
};
