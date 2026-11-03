import React, { useState, useEffect } from 'react';
import { CheckCircle2, Heart, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'cart' | 'wishlist' | 'info' | 'success';
  title: string;
  description?: string;
}

export const TOAST_EVENT = 'lumea_toast_trigger';

export function showToast(message: Omit<ToastMessage, 'id'>) {
  if (typeof window === 'undefined') return;
  const event = new CustomEvent(TOAST_EVENT, {
    detail: { ...message, id: Math.random().toString(36).substring(2, 9) }
  });
  window.dispatchEvent(event);
}

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<ToastMessage>;
      const newToast = customEvent.detail;
      setToasts(prev => [...prev, newToast]);

      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== newToast.id));
      }, 3500);
    };

    window.addEventListener(TOAST_EVENT, handleToast);
    return () => window.removeEventListener(TOAST_EVENT, handleToast);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 bg-[#FFF7F7] border border-[#EFC6D8] rounded-[16px] shadow-lg animate-in slide-in-from-bottom-4 duration-300"
        >
          {(toast.type === 'cart' || toast.type === 'success') && (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          )}
          {toast.type === 'wishlist' && (
            <Heart className="w-5 h-5 text-[#6B4B6B] fill-[#EFC6D8] shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="w-5 h-5 text-[#6B4B6B] shrink-0 mt-0.5" />
          )}

          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#3E2F3F]">{toast.title}</p>
            {toast.description && (
              <p className="text-[11px] text-[#3E2F3F]/70 mt-0.5">{toast.description}</p>
            )}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss notification"
            className="text-[#79566E] hover:text-[#3E2F3F] transition-colors p-1 -mr-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
