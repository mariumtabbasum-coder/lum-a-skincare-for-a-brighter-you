import React from 'react';

/** Soft, decorative skincare footage behind page hero content. */
export const HeroVideoBackground: React.FC<{ src: string }> = ({ src }) => (
  <video
    className="absolute inset-0 w-full h-full object-cover object-center blur-[1.5px] opacity-50 scale-[1.02] pointer-events-none"
    autoPlay
    muted
    loop
    playsInline
    preload="none"
    aria-hidden="true"
    tabIndex={-1}
  >
    <source src={src} type="video/mp4" />
  </video>
);
