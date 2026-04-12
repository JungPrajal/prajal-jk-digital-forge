import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Returns a ref to attach to headings and a dynamic font weight (300-800)
 * that shifts based on how centered the element is in the viewport.
 * Centered = 800 (ExtraBold), far away = 300 (Light).
 */
const useScrollWeight = () => {
  const ref = useRef<HTMLHeadingElement>(null);
  const [weight, setWeight] = useState(800);

  const update = useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const viewH = window.innerHeight;
    // How centered is the element? 0 = perfectly centered, 1 = at edge/off-screen
    const center = rect.top + rect.height / 2;
    const distance = Math.abs(center - viewH / 2) / (viewH / 2);
    const clamped = Math.min(1, Math.max(0, distance));
    // Map: 0 distance → 800, 1 distance → 300
    const w = Math.round(800 - clamped * 500);
    setWeight(w);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  return { ref, weight };
};

export default useScrollWeight;
