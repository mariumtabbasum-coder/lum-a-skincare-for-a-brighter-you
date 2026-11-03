import React from 'react';

/** Soft, decorative skincare imagery behind page hero content. */
export const HeroImageBackground: React.FC<{ src: string }> = ({ src }) => (
  <div
    aria-hidden="true"
    className="absolute inset-0 scale-[1.02] bg-cover bg-center opacity-35 blur-[2px] pointer-events-none select-none"
    style={{ backgroundImage: `url("${src}")` }}
  />
);
