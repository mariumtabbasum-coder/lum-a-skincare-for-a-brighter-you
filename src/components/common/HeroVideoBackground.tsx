import React from 'react';

/** Soft, decorative skincare footage behind page hero content. */
export const HeroVideoBackground: React.FC = () => (
  <video
    className="absolute inset-0 w-full h-full object-cover object-center blur-[5px] opacity-40 scale-105 pointer-events-none"
    autoPlay
    muted
    loop
    playsInline
    preload="none"
    aria-hidden="true"
    tabIndex={-1}
  >
    <source src="https://videos.pexels.com/video-files/8131885/8131885-uhd_2160_4096_25fps.mp4" type="video/mp4" />
  </video>
);
