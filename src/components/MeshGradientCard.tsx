import React, { useRef, useState, useEffect, useCallback } from 'react';

/**
 * MeshGradientCard — Apple-style glassmorphism card with:
 * - Animated mesh gradient background (#00D2FF → #9D50BB) at 20% opacity
 * - 0.5px border that glows when scrolled into view
 * - Mouse-tracking border light
 */
const MeshGradientCard = ({
  children,
  className = '',
  style = {},
  glowColor = 'rgba(0,210,255,0.5)',
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glowColor?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Scroll-triggered glow
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-2xl overflow-hidden transition-all duration-700 hover:scale-[1.02] ${className}`}
      style={style}
    >
      {/* Animated mesh gradient background */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(0,210,255,0.20) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(157,80,187,0.20) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(0,210,255,0.12) 0%, transparent 50%)
          `,
          animation: 'meshDrift 8s ease-in-out infinite alternate',
        }}
      />

      {/* Glass fill */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'rgba(10,15,26,0.55)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      />

      {/* Mouse-tracking radial light */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,210,255,0.18), transparent 60%)`,
        }}
      />

      {/* Glowing 0.5px border — lights up on scroll + hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-all duration-700"
        style={{
          border: '0.5px solid transparent',
          background: isHovered
            ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, rgba(157,80,187,0.3) 60%) border-box`
            : isInView
              ? 'linear-gradient(135deg, rgba(0,210,255,0.35), rgba(157,80,187,0.25)) border-box'
              : 'linear-gradient(135deg, rgba(0,210,255,0.08), rgba(157,80,187,0.05)) border-box',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'exclude',
          maskComposite: 'exclude',
          boxShadow: isInView
            ? `0 0 15px rgba(0,210,255,0.08), 0 0 30px rgba(157,80,187,0.05)`
            : 'none',
        }}
      />

      {/* Content */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
};

export default MeshGradientCard;
