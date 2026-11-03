import React from 'react';

interface LumeaLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export const LumeaLogo: React.FC<LumeaLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md'
}) => {
  const isLight = variant === 'light';

  // Responsive sizing configurations with elegant typography
  const config = {
    sm: {
      markHeight: 'h-6 sm:h-7',
      taglineSize: 'text-[5px] sm:text-[6px]',
      tracking: 'tracking-[0.18em] sm:tracking-[0.22em]',
      gap: 'mt-0.5',
    },
    md: {
      markHeight: 'h-7 sm:h-9 md:h-11',
      taglineSize: 'text-[5.5px] sm:text-[7px] md:text-[7.5px]',
      tracking: 'tracking-[0.18em] sm:tracking-[0.24em]',
      gap: 'mt-0.5 sm:mt-1',
    },
    lg: {
      markHeight: 'h-12 sm:h-16 md:h-20',
      taglineSize: 'text-[8px] sm:text-[9.5px]',
      tracking: 'tracking-[0.22em] sm:tracking-[0.26em]',
      gap: 'mt-1 sm:mt-1.5',
    }
  }[size];

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none text-center ${className}`}>
      {/* Brand Emblem & Luméa Wordmark - Transparent without white box */}
      <img
        src="/assets/aistudio/lumea-brandmark-transparent.png"
        alt="Luméa"
        width={1133}
        height={570}
        decoding="async"
        fetchPriority="high"
        className={`${config.markHeight} w-auto object-contain transition-transform duration-300 hover:scale-[1.02] ${
          isLight ? 'brightness-0 invert opacity-95' : 'mix-blend-multiply'
        }`}
      />
      {/* Refined tagline: regular/light weight, reduced size, elegant letter-spacing */}
      <span
        className={`font-normal tracking-[0.24em] uppercase whitespace-nowrap leading-none transition-colors ${config.taglineSize} ${config.gap} ${
          isLight ? 'text-[#FFF7F7]/90 font-light' : 'text-[#4A2D4A]/90'
        }`}
      >
        Skincare for a brighter you
      </span>
    </div>
  );
};
