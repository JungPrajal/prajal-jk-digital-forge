import React, { useEffect, useRef, useState } from 'react';

const LiquidCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isInteractive = el?.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer, .magnetic-btn');
      setIsHovering(!!isInteractive);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onLeave = () => {
      target.current = { x: -100, y: -100 };
      pos.current = { x: -100, y: -100 };
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);

    // Smooth animation loop
    const animate = () => {
      const ease = 0.15;
      pos.current.x += (target.current.x - pos.current.x) * ease;
      pos.current.y += (target.current.y - pos.current.y) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      // Trail follows slower
      if (trailRef.current) {
        const trailEase = 0.08;
        const tx = parseFloat(trailRef.current.dataset.x || String(pos.current.x));
        const ty = parseFloat(trailRef.current.dataset.y || String(pos.current.y));
        const nx = tx + (pos.current.x - tx) * trailEase;
        const ny = ty + (pos.current.y - ty) * trailEase;
        trailRef.current.dataset.x = String(nx);
        trailRef.current.dataset.y = String(ny);
        trailRef.current.style.transform = `translate(${nx}px, ${ny}px) translate(-50%, -50%)`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  // Don't render on touch-only devices
  const isTouchOnly = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches;
  if (isTouchOnly) return null;

  const baseSize = isHovering ? 60 : isClicking ? 28 : 16;
  const trailSize = isHovering ? 80 : 40;

  return (
    <>
      {/* Inversion trail (larger, slower) */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-[width,height] duration-500 ease-out"
        style={{
          width: trailSize,
          height: trailSize,
          background: 'white',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      {/* Core cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full transition-[width,height,background] duration-300 ease-out"
        style={{
          width: baseSize,
          height: baseSize,
          background: isHovering
            ? 'rgba(0, 229, 255, 0.4)'
            : 'rgba(255, 255, 255, 0.9)',
          mixBlendMode: 'difference',
          willChange: 'transform',
          backdropFilter: isHovering ? 'blur(4px)' : 'none',
        }}
      />
    </>
  );
};

export default LiquidCursor;
