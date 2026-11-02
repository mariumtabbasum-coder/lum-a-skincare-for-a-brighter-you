import React from 'react';
import { QuickReplyOption } from './types';

interface QuickRepliesProps {
  options: QuickReplyOption[];
  onSelect: (actionText: string) => void;
  disabled?: boolean;
}

export const QuickReplies: React.FC<QuickRepliesProps> = ({
  options,
  onSelect,
  disabled = false,
}) => {
  if (!options || options.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 py-1" role="group" aria-label="Quick reply suggestions">
      {options.map((option, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onSelect(option.actionText)}
          disabled={disabled}
          className="text-[12px] font-medium px-3 py-1.5 rounded-full bg-[#FFF0F4] hover:bg-[#FCE1E9] active:bg-[#F7D2DC] text-[#5D3A58] border border-[#F2D0DC] hover:border-[#E8B9C9] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-left focus:outline-hidden focus:ring-2 focus:ring-[#5D3A58]/30 shadow-2xs"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
