import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // 0-1, controls parallax strength
}

const ParallaxSection = ({ children, className = '', intensity = 1 }: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Smooth raw scroll progress with a spring before mapping to CSS
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.5 });

  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.95]);
  const z = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    [-100 * intensity, 0, 0, -50 * intensity]
  );

  return (
    <div
      ref={ref}
      className={className}
      style={{
        willChange: 'transform, opacity',
        transform: 'translate3d(0,0,0)',
        contain: 'paint layout',
      }}
    >
      <motion.div
        style={{
          opacity,
          scale,
          translateZ: z,
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection;
