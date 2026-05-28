import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import CyberRoom from './CyberRoom';

// Defer terminal until after hero settles
const RetroTerminal = lazy(() => import('./RetroTerminal'));

/**
 * Sticky-scroll wrapper that pins the Hero + About transition.
 * During a 200vh tall scroll container the hero scales down to the
 * top-left corner while the RetroTerminal slides in from the bottom-right
 * and the background transitions from particles to a glowing grid.
 */
const StickyHeroTransition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    // Wait for hero animation + first paint to finish before mounting terminal
    let raf2 = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        timeoutId = setTimeout(() => setHeroReady(true), 1500);
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const sp = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.5 });

  // Hero: scale 1 -> 0.7, fade out, translate -100px on Y across 0% -> 50%
  const heroScale = useTransform(sp, [0, 0.5], [1, 0.7]);
  const heroY = useTransform(sp, [0, 0.5], [0, -100]);
  const heroOpacity = useTransform(sp, [0, 0.5], [1, 0]);

  // Terminal: hidden until 30%, fully in by 80%. translateY 150 -> 0, scale 0.9 -> 1
  const termY = useTransform(sp, [0.3, 0.8], [150, 0]);
  const termOpacity = useTransform(sp, [0.3, 0.8], [0, 1]);
  const termScale = useTransform(sp, [0.3, 0.8], [0.9, 1]);

  const gridOpacity = useTransform(sp, [0.2, 0.6], [0, 1]);
  const particleFade = useTransform(sp, [0.2, 0.6], [1, 0.15]);

  const headingOpacity = useTransform(sp, [0.6, 0.85], [0, 1]);
  const headingY = useTransform(sp, [0.6, 0.85], [40, 0]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: '150vh', contain: 'paint layout' }}
    >
      {/* Sticky viewport */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ willChange: 'transform, opacity' }}
      >
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
            y: heroY,
            opacity: heroOpacity,
            transformOrigin: 'center center',
            willChange: 'transform, opacity',
            translateZ: 0,
          }}
        >
          <CyberRoom />
        </motion.div>

        {/* RetroTerminal – slides up into grid position */}
        <motion.div
          className="absolute inset-x-0 bottom-16 z-20 mx-auto w-full max-w-2xl px-4"
          style={{
            y: termY,
            opacity: termOpacity,
            scale: termScale,
            willChange: 'transform, opacity',
            translateZ: 0,
          }}
        >
          <div className="depth-foreground">
            {heroReady && (
              <Suspense fallback={null}>
                <RetroTerminal />
              </Suspense>
            )}
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
            opacity: headingOpacity,
            y: headingY,
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
