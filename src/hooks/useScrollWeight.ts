import { useEffect, useRef, useState, useCallback } from 'react';
import { useMotionValue, useSpring, useMotionValueEvent } from 'framer-motion';

/**
 * Returns a ref to attach to headings and a dynamic font weight (300-800)
 * that shifts based on how centered the element is in the viewport.
 * Centered = 800 (ExtraBold), far away = 300 (Light).
 */
const useScrollWeight = () => {
  const ref = useRef<HTMLHeadingElement>(null);
  const [weight, setWeight] = useState(800);
  const raw = useMotionValue(800);
  const smoothed = useSpring(raw, { stiffness: 300, damping: 40 });

  useMotionValueEvent(smoothed, 'change', (v) => {
    setWeight(Math.round(v));
  });

  const rafRef = useRef<number | null>(null);

  const update = useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const viewH = window.innerHeight;
    const center = rect.top + rect.height / 2;
    const distance = Math.abs(center - viewH / 2) / (viewH / 2);
    const clamped = Math.min(1, Math.max(0, distance));
    raw.set(800 - clamped * 500);
  }, [raw]);

  const schedule = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      update();
    });
  }, [update]);

  useEffect(() => {
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [update, schedule]);

  return { ref, weight };
};

export default useScrollWeight;
