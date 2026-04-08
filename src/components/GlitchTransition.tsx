import React, { useState, useEffect, useCallback } from 'react';

/**
 * GlitchTransition — wraps the app and triggers a 150ms pixelation glitch
 * whenever a navigation link or CTA is clicked.
 */
const GlitchTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [glitching, setGlitching] = useState(false);

  const triggerGlitch = useCallback(() => {
    setGlitching(true);
    setTimeout(() => setGlitching(false), 150);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isNav = target.closest('nav a, nav button, .glitch-trigger');
      if (isNav) triggerGlitch();
    };
    document.addEventListener('click', handler, { passive: true });
    return () => document.removeEventListener('click', handler);
  }, [triggerGlitch]);

  return (
    <div
      style={{
        filter: glitching ? 'url(#glitch-pixel)' : 'none',
        transition: 'filter 0.05s',
      }}
    >
      {children}
      {/* SVG pixelation filter */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="glitch-pixel">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default GlitchTransition;
