import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

  // Map scroll progress to animation values
  // Section enters from bottom (0) → centered (0.5) → exits top (1)
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.95]);
  const z = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [-100 * intensity, 0, 0, -50 * intensity]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{
          opacity,
          scale,
          translateZ: z,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection;
