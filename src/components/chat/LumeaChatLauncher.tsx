import React from 'react';
import { Sparkles, MessageCircle, X } from 'lucide-react';

interface LumeaChatLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const LumeaChatLauncher: React.FC<LumeaChatLauncherProps> = ({
  isOpen,
  onToggle,
}) => {
  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
      <button
        type="button"
        data-chat-launcher="true"
        onClick={onToggle}
        aria-label={isOpen ? 'Close Luméa Skin Assistant' : 'Open Luméa Skin Assistant'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#5D3A58] hover:bg-[#4E2E4A] active:scale-95 text-white rounded-full shadow-[0_6px_25px_rgba(93,58,88,0.35)] hover:shadow-[0_8px_30px_rgba(93,58,88,0.45)] transition-all duration-300 cursor-pointer focus:outline-hidden focus:ring-3 focus:ring-[#5D3A58]/40 border border-[#8C5E87]/40"
      >
        {/* Glow halo */}
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#EFC6D8]/30 to-[#8C5E87]/30 blur-xs opacity-70 group-hover:opacity-100 transition-opacity" />

        {/* Icon & Label */}
        <div className="relative flex items-center gap-2">
          {isOpen ? (
            <X className="w-5 h-5 text-white transition-transform duration-200 rotate-0 group-hover:rotate-90" />
          ) : (
            <>
              <div className="relative">
                <Sparkles className="w-5 h-5 text-[#FDE8EF]" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#EFC6D8]" />
              </div>
              <span className="text-[13px] font-medium font-serif tracking-wide hidden sm:inline-block pr-1">
                Skin Assistant
              </span>
            </>
          )}
        </div>
      </button>
    </div>
  );
};
