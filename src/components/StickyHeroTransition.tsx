import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CyberRoom from './CyberRoom';
import RetroTerminal from './RetroTerminal';

/**
 * Sticky-scroll wrapper that pins the Hero + About transition.
 * During a 200vh tall scroll container the hero scales down to the
 * top-left corner while the RetroTerminal slides in from the bottom-right
 * and the background transitions from particles to a glowing grid.
 */
const StickyHeroTransition = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Hero: scale 1 → 0.45, move to top-left
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.45]);
  const heroX = useTransform(scrollYProgress, [0, 0.6], ['0%', '-28%']);
  const heroY = useTransform(scrollYProgress, [0, 0.6], ['0%', '-20%']);
  const heroOpacity = useTransform(scrollYProgress, [0.5, 0.85], [1, 0.7]);

  // Terminal: slide in from bottom-right
  const termX = useTransform(scrollYProgress, [0.25, 0.7], ['120%', '0%']);
  const termY = useTransform(scrollYProgress, [0.25, 0.7], ['80%', '0%']);
  const termOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  const termScale = useTransform(scrollYProgress, [0.25, 0.7], [0.8, 1]);

  // Background grid opacity
  const gridOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const particleFade = useTransform(scrollYProgress, [0.2, 0.6], [1, 0.15]);

  return (
    <div ref={containerRef} className="relative" style={{ height: '250vh' }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Glowing grid background */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ opacity: gridOpacity }}
        >
          <div className="absolute inset-0 glowing-grid" />
          {/* Radial glow center */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.12)_0%,transparent_70%)]" />
        </motion.div>

        {/* Particle layer fade */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ opacity: particleFade }}
        />

        {/* Hero (CyberRoom) – scales down to top-left */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{
            scale: heroScale,
            x: heroX,
            y: heroY,
            opacity: heroOpacity,
            transformOrigin: 'top left',
            willChange: 'transform, opacity',
            translateZ: 0,
          }}
        >
          <CyberRoom />
        </motion.div>

        {/* RetroTerminal – slides in from bottom-right */}
        <motion.div
          className="absolute bottom-8 right-8 z-20 w-full max-w-xl"
          style={{
            x: termX,
            y: termY,
            opacity: termOpacity,
            scale: termScale,
            willChange: 'transform, opacity',
            translateZ: 0,
          }}
        >
          <div className="depth-foreground">
            <RetroTerminal />
            {/* Floor shadow */}
            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-8 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse, hsl(var(--primary) / 0.25) 0%, transparent 70%)',
                filter: 'blur(12px)',
              }}
            />
          </div>
        </motion.div>

        {/* Heading that fades in at the end */}
        <motion.div
          className="absolute top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
          style={{
            opacity: useTransform(scrollYProgress, [0.6, 0.85], [0, 1]),
            y: useTransform(scrollYProgress, [0.6, 0.85], [40, 0]),
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient text-center">
            About Me
          </h2>
        </motion.div>
      </div>
    </div>
  );
};

export default StickyHeroTransition;
