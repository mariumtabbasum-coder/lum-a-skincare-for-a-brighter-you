import React from 'react';

/** Soft, decorative skincare imagery behind page hero content. */
export const HeroImageBackground: React.FC<{ src: string }> = ({ src }) => (
  <img
    src={src}
    alt=""
    aria-hidden="true"
    className="absolute inset-0 h-full w-full scale-[1.02] object-cover object-center opacity-35 blur-[2px] pointer-events-none select-none"
  />
);
