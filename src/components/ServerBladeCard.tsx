import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface Project {
  title: string;
  description: string;
  tech: string[];
  type: string;
  color: string;
}

/* ─── Binary Data Stream Overlay ─── */
const BinaryStream = ({ isHovered }: { isHovered: boolean }) => (
  <div
    className="absolute inset-0 overflow-hidden pointer-events-none z-10 transition-opacity duration-500"
    style={{ opacity: isHovered ? 0 : 0.25 }}
  >
    <div className="binary-rain absolute inset-0 font-mono text-[10px] leading-3 text-green-400/40 whitespace-pre overflow-hidden select-none">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="animate-binary-scroll"
          style={{
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${4 + Math.random() * 3}s`,
          }}
        >
          {Array.from({ length: 60 }).map(() => Math.round(Math.random())).join('')}
        </div>
      ))}
    </div>
  </div>
);

/* ─── Server Blade Card ─── */
const ServerBladeCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  // Subtle click sound on slide-in
  useEffect(() => {
    if (isInView && !hasPlayed) {
      setHasPlayed(true);
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800 + index * 100, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.connect(gain).connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.12);
      } catch (_) {}
    }
  }, [isInView, hasPlayed, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ x: -120, opacity: 0, rotateY: -15 }}
      animate={isInView ? { x: 0, opacity: 1, rotateY: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.23, 1, 0.32, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer"
      style={{ perspective: '800px' }}
    >
      {/* Server Blade Shell */}
      <div
        className="relative overflow-hidden transition-all duration-500"
        style={{
          background: `linear-gradient(145deg, #1a1a2e 0%, #16162a 40%, #0f0f23 100%)`,
          borderRadius: '8px',
          border: `1px solid ${isHovered ? project.color + '60' : 'rgba(60,60,80,0.4)'}`,
          boxShadow: isHovered
            ? `0 0 30px ${project.color}20, inset 0 1px 0 rgba(255,255,255,0.05)`
            : '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)',
          transform: isHovered ? 'translateZ(10px) scale(1.02)' : 'translateZ(0)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Rack mounting holes */}
        <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-around py-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: 'rgba(40,40,60,0.8)', border: '1px solid rgba(60,60,80,0.5)' }}
            />
          ))}
        </div>

        {/* Status LED */}
        <div className="absolute right-3 top-3 flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: project.color, boxShadow: `0 0 8px ${project.color}` }}
          />
          <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
            {project.type}
          </span>
        </div>

        {/* Binary overlay */}
        <BinaryStream isHovered={isHovered} />

        {/* Content */}
        <div className="relative z-20 p-6 pl-8 min-h-[160px] flex flex-col justify-between">
          <div>
            <h3
              className="text-lg font-bold mb-2 transition-colors duration-300"
              style={{ color: isHovered ? project.color : 'hsl(var(--foreground))' }}
            >
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>

          <div className="flex items-end justify-between mt-4">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[10px] font-mono transition-all duration-300"
                  style={{
                    background: isHovered ? project.color + '18' : 'rgba(30,30,50,0.6)',
                    color: isHovered ? project.color : 'hsl(var(--muted-foreground))',
                    border: `0.5px solid ${isHovered ? project.color + '40' : 'rgba(60,60,80,0.3)'}`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
              transition={{ duration: 0.3 }}
            >
              <ExternalLink className="w-4 h-4" style={{ color: project.color }} />
            </motion.div>
          </div>
        </div>

        {/* Bottom edge light */}
        <div
          className="absolute bottom-0 left-8 right-8 h-[1px] transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)`,
            opacity: isHovered ? 1 : 0.2,
          }}
        />
      </div>

      {/* Dynamic floor shadow */}
      <div
        className="absolute -bottom-3 left-4 right-4 h-6 transition-all duration-500 rounded-full"
        style={{
          background: `radial-gradient(ellipse, ${project.color}15 0%, transparent 70%)`,
          filter: 'blur(8px)',
          opacity: isHovered ? 1 : 0.3,
          transform: isHovered ? 'scaleX(1.1)' : 'scaleX(0.9)',
        }}
      />
    </motion.div>
  );
};

export default ServerBladeCard;
