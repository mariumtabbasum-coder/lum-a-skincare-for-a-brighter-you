import React from 'react';
import { Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { ChatMessage } from './types';
import { RecommendedProductCard } from './RecommendedProductCard';

interface ChatMessageItemProps {
  message: ChatMessage;
  onRetry?: () => void;
  onQuickSelect?: (text: string) => void;
  onNavigate?: () => void;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  onRetry,
  onQuickSelect,
  onNavigate,
}) => {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end mb-3">
        <div className="max-w-[85%] bg-[#5D3A58] text-white px-4 py-2.5 rounded-[18px] rounded-br-[4px] shadow-xs">
          <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{message.text}</p>
          <span className="text-[10px] text-white/60 block text-right mt-1">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    );
  }

  // Assistant message
  return (
    <div className="flex items-start gap-2.5 mb-4 group">
      {/* Botanical Assistant Avatar */}
      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#5D3A58] to-[#8C5E87] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
        <Sparkles className="w-3.5 h-3.5 text-[#FDE8EF]" />
      </div>

      <div className="max-w-[88%] space-y-2.5">
        {/* Assistant Bubble */}
        <div
          className={`bg-white border rounded-[18px] rounded-tl-[4px] p-3.5 shadow-xs ${
            message.isError ? 'border-rose-300 bg-rose-50/50' : 'border-[#F0D5DF]'
          }`}
        >
          {message.isError ? (
            <div className="flex items-start gap-2 text-rose-800">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="text-[13px] leading-relaxed">
                <p>{message.text}</p>
                {onRetry && (
                  <button
                    type="button"
                    onClick={onRetry}
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-rose-300 rounded-full text-[12px] font-medium text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Try again</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-[13px] text-[#3E2F3F] leading-relaxed space-y-2">
              {message.text.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          )}

          {/* Follow-up question banner */}
          {message.followUpQuestion && !message.isError && (
            <div className="mt-2.5 pt-2 border-t border-[#F5E2E8] flex items-start gap-1.5 text-[12px] font-medium text-[#5D3A58]">
              <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#A8587C]" />
              <p>{message.followUpQuestion}</p>
            </div>
          )}

          <span className="text-[10px] text-[#9C7F94] block text-right mt-1">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Product Recommendation Cards Carousel / List */}
        {message.recommendations && message.recommendations.length > 0 && (
          <div className="space-y-2 pt-1">
            <div className="text-[11px] font-semibold tracking-wider uppercase text-[#7D5377] px-1">
              Curated Luméa Recommendations ({message.recommendations.length})
            </div>
            <div className="space-y-2">
              {message.recommendations.map((rec) => (
                <RecommendedProductCard
                  key={rec.productId}
                  item={rec}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
