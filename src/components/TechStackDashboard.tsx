import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Server, Brain, Terminal, Palette, Globe, Clock, Cpu, Zap } from 'lucide-react';

/* ─── Mouse-tracking border light card ─── */
const GlassCard = ({
  children,
  className = '',
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

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
      className={`relative rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] ${className}`}
      style={style}
    >
      {/* Dynamic border light */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,229,255,0.25), transparent 60%)`,
        }}
      />
      {/* Border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        style={{
          border: '1px solid transparent',
          background: isHovered
            ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,229,255,0.4), rgba(168,85,247,0.1) 60%) border-box`
            : 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(0,229,255,0.1)) border-box',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'exclude',
          maskComposite: 'exclude',
        }}
      />
      {/* Glass fill */}
      <div className="absolute inset-0 bg-[rgba(10,15,26,0.6)] backdrop-blur-xl rounded-2xl" />
      {/* Content */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
};

/* ─── 3D Icon with CSS depth ─── */
const Icon3D = ({ icon: Icon, color, size = 40 }: { icon: React.ElementType; color: string; size?: number }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative transition-transform duration-500 cursor-pointer"
      style={{
        perspective: '200px',
        transform: hovered ? 'scale(1.15)' : 'scale(1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Shadow layer */}
      <div
        className="absolute inset-0 rounded-xl blur-lg transition-opacity duration-500"
        style={{ background: color, opacity: hovered ? 0.5 : 0.2 }}
      />
      {/* Icon body */}
      <div
        className="relative p-3 rounded-xl transition-all duration-500"
        style={{
          background: `linear-gradient(135deg, ${color}30, ${color}10)`,
          border: `1px solid ${color}40`,
          transform: hovered ? 'rotateY(12deg) rotateX(-5deg) translateZ(8px)' : 'rotateY(0) rotateX(0)',
          transformStyle: 'preserve-3d',
          boxShadow: hovered ? `0 8px 30px ${color}30` : `0 4px 12px ${color}15`,
        }}
      >
        <Icon size={size} style={{ color }} />
      </div>
    </div>
  );
};

/* ─── Live Uptime Counter ─── */
const UptimeCounter = () => {
  // Portfolio "launch" date
  const launchDate = useRef(new Date('2025-01-01T00:00:00'));
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = now.getTime() - launchDate.current.getTime();
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setElapsed({ days, hours, minutes, seconds });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <span className="text-2xl md:text-3xl font-bold font-mono" style={{ color: '#00e5ff' }}>
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{label}</span>
    </div>
  );

  return (
    <div className="flex items-center gap-3 md:gap-4">
      <TimeBlock value={elapsed.days} label="Days" />
      <span className="text-xl text-muted-foreground animate-pulse">:</span>
      <TimeBlock value={elapsed.hours} label="Hrs" />
      <span className="text-xl text-muted-foreground animate-pulse">:</span>
      <TimeBlock value={elapsed.minutes} label="Min" />
      <span className="text-xl text-muted-foreground animate-pulse">:</span>
      <TimeBlock value={elapsed.seconds} label="Sec" />
    </div>
  );
};

/* ─── Mini 3D Globe (pure CSS/SVG) ─── */
const MiniGlobe = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let frame: number;
    const animate = () => {
      setRotation((r) => (r + 0.3) % 360);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto">
      {/* Glow ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%)',
        }}
      />
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="globe-grad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0a0f1a" stopOpacity="0.9" />
          </radialGradient>
          <clipPath id="globe-clip">
            <circle cx="100" cy="100" r="80" />
          </clipPath>
        </defs>
        {/* Globe body */}
        <circle cx="100" cy="100" r="80" fill="url(#globe-grad)" stroke="#00e5ff" strokeWidth="1" strokeOpacity="0.4" />
        {/* Latitude lines */}
        <g clipPath="url(#globe-clip)" opacity="0.3" stroke="#00e5ff" fill="none" strokeWidth="0.5">
          {[-40, -20, 0, 20, 40].map((lat) => (
            <ellipse
              key={lat}
              cx="100"
              cy={100 + lat}
              rx={Math.cos((lat * Math.PI) / 90) * 80}
              ry="8"
            />
          ))}
        </g>
        {/* Longitude lines (rotating) */}
        <g clipPath="url(#globe-clip)" opacity="0.25" stroke="#00e5ff" fill="none" strokeWidth="0.5"
          style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '100px 100px' }}>
          {[0, 30, 60, 90, 120, 150].map((lon) => (
            <ellipse
              key={lon}
              cx="100"
              cy="100"
              rx={Math.cos((lon * Math.PI) / 180) * 80}
              ry="80"
            />
          ))}
        </g>
        {/* Location pin – Pokhara, Nepal approx */}
        <g style={{ transform: `rotate(${rotation * 0.1}deg)`, transformOrigin: '100px 100px' }}>
          <circle cx="130" cy="70" r="4" fill="#00e5ff" opacity="0.9">
            <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="130" cy="70" r="2" fill="#fff" />
        </g>
        {/* Shine */}
        <circle cx="75" cy="75" r="50" fill="white" opacity="0.03" />
      </svg>
    </div>
  );
};

/* ─── Skill Cell ─── */
const SkillCell = ({
  title,
  icon,
  skills,
  color,
}: {
  title: string;
  icon: React.ElementType;
  skills: string[];
  color: string;
}) => (
  <GlassCard className="h-full">
    <div className="p-5 md:p-6 flex flex-col gap-4 h-full">
      <div className="flex items-center gap-3">
        <Icon3D icon={icon} color={color} size={28} />
        <h3 className="text-base font-bold text-foreground">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2 mt-auto">
        {skills.map((s) => (
          <span
            key={s}
            className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 cursor-default hover:scale-105"
            style={{
              background: `${color}15`,
              color,
              border: `1px solid ${color}30`,
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  </GlassCard>
);

/* ─── Main Dashboard ─── */
const TechStackDashboard = () => {
  const skills = [
    {
      title: 'Backend',
      icon: Server,
      skills: ['PHP/Laravel', 'Python/Django'],
      color: '#10b981',
    },
    {
      title: 'AI & ML',
      icon: Brain,
      skills: ['TensorFlow', 'Computer Vision', 'NLP', 'Data Science'],
      color: '#f59e0b',
    },
    {
      title: 'DevOps',
      icon: Terminal,
      skills: ['Git/GitHub', 'VS Code'],
      color: '#3b82f6',
    },
    {
      title: 'Design',
      icon: Palette,
      skills: ['UI/UX', 'Figma', 'Adobe Suite', 'Prototyping'],
      color: '#ec4899',
    },
  ];

  return (
    <section id="skills" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient">
          Mission Control
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
          Real-time system overview — tech arsenal, uptime, and current base of operations.
        </p>

        {/* Bento Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[180px]">
          {/* Row 1: Skills (2 cols) + Uptime (2 cols) */}
          <div className="md:col-span-2 md:row-span-1">
            <SkillCell {...skills[0]} />
          </div>

          <div className="md:col-span-2 md:row-span-1">
            <GlassCard className="h-full">
              <div className="p-5 md:p-6 flex flex-col justify-between h-full">
                <div className="flex items-center gap-3 mb-2">
                  <Icon3D icon={Clock} color="#00e5ff" size={24} />
                  <div>
                    <h3 className="text-sm font-bold text-foreground">System Uptime</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[10px] text-green-400 uppercase tracking-widest">Online</span>
                    </div>
                  </div>
                </div>
                <UptimeCounter />
              </div>
            </GlassCard>
          </div>

          {/* Row 2: AI/ML (1 col) + Globe (2 cols) + DevOps (1 col) */}
          <div className="md:col-span-1 md:row-span-1">
            <SkillCell {...skills[1]} />
          </div>

          <div className="md:col-span-2 md:row-span-2">
            <GlassCard className="h-full">
              <div className="p-5 md:p-6 flex flex-col items-center justify-center h-full">
                <div className="flex items-center gap-2 mb-2">
                  <Icon3D icon={Globe} color="#00e5ff" size={20} />
                  <h3 className="text-sm font-bold text-foreground">Current Location</h3>
                </div>
                <MiniGlobe />
                <div className="text-center mt-1">
                  <span className="text-xs text-muted-foreground">28.2°N · 83.9°E</span>
                  <p className="text-sm font-semibold" style={{ color: '#00e5ff' }}>Pokhara, Nepal</p>
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="md:col-span-1 md:row-span-1">
            <SkillCell {...skills[2]} />
          </div>

          {/* Row 3: Design (2 cols, spanning under AI/ML & DevOps) */}
          <div className="md:col-span-1 md:row-span-1">
            <SkillCell {...skills[3]} />
          </div>
          <div className="md:col-span-1 md:row-span-1">
            <GlassCard className="h-full">
              <div className="p-5 md:p-6 flex flex-col items-center justify-center h-full gap-3">
                <Icon3D icon={Zap} color="#a855f7" size={32} />
                <div className="text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Status</p>
                  <p className="text-sm font-bold text-foreground mt-1">Available for Hire</p>
                  <div className="w-16 h-1 mx-auto mt-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackDashboard;
