import React, { useRef, useState, useCallback, useEffect } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  strength?: number;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  style: externalStyle,
  onClick,
  href,
  target,
  rel,
  strength = 0.35,
}) => {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const magnetRadius = 120;

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < magnetRadius) {
        const pull = (1 - dist / magnetRadius) * strength;
        setOffset({ x: dx * pull, y: dy * pull });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const style: React.CSSProperties = {
    ...externalStyle,
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    transition: offset.x === 0 && offset.y === 0 ? 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)' : 'transform 0.15s ease-out',
  };

  const props = {
    ref: ref as any,
    className: `magnetic-btn ${className}`,
    style,
    onMouseLeave: handleMouseLeave,
  };

  if (href) {
    return (
      <a {...props} href={href} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  );
};

export default MagneticButton;
