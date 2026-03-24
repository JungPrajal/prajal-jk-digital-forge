import React, { useState, useEffect, useRef, useMemo } from 'react';

/* ── Typewriter code snippets for the monitor ── */
const CODE_SNIPPETS = [
  {
    lang: 'Python',
    lines: [
      '# neural_network.py',
      'import torch',
      'import torch.nn as nn',
      '',
      'class Transformer(nn.Module):',
      '    def __init__(self, d_model=512):',
      '        super().__init__()',
      '        self.attn = nn.MultiheadAttention(d_model, 8)',
      '        self.ffn = nn.Sequential(',
      '            nn.Linear(d_model, 2048),',
      '            nn.GELU(),',
      '            nn.Linear(2048, d_model)',
      '        )',
      '',
      '    def forward(self, x):',
      '        out = self.attn(x, x, x)[0]',
      '        return self.ffn(out) + x',
    ],
  },
  {
    lang: 'Flutter',
    lines: [
      '// home_screen.dart',
      "import 'package:flutter/material.dart';",
      '',
      'class HomeScreen extends StatefulWidget {',
      '  @override',
      '  _HomeScreenState createState() =>',
      '      _HomeScreenState();',
      '}',
      '',
      'class _HomeScreenState extends State<HomeScreen> {',
      '  @override',
      '  Widget build(BuildContext context) {',
      '    return Scaffold(',
      '      body: AnimatedContainer(',
      '        duration: Duration(ms: 300),',
      '        child: Center(',
      '          child: Text("Hello World"),',
      '        ),',
      '      ),',
      '    );',
      '  }',
      '}',
    ],
  },
  {
    lang: 'React',
    lines: [
      '// Portfolio.tsx',
      "import { motion } from 'framer-motion';",
      "import { Canvas } from '@react-three/fiber';",
      '',
      'const Portfolio = () => {',
      '  const [active, setActive] = useState(0);',
      '',
      '  return (',
      '    <motion.div',
      '      initial={{ opacity: 0 }}',
      '      animate={{ opacity: 1 }}',
      '      className="cyber-room"',
      '    >',
      '      <Canvas camera={{ fov: 45 }}>',
      '        <ambientLight intensity={0.4} />',
      '        <RoomScene active={active} />',
      '      </Canvas>',
      '    </motion.div>',
      '  );',
      '};',
    ],
  },
];

/* ── Syntax highlighting ── */
const colorize = (text: string): React.ReactNode => {
  if (!text) return '\u00A0';
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  const rules: [RegExp, string][] = [
    [/^(#.*|\/\/.*)/, 'text-emerald-500/70'], // comments
    [/(["'])(?:(?=(\\?))\2.)*?\1/, 'text-amber-400'], // strings
    [/\b(import|from|class|def|return|const|let|var|function|extends|super|new|this|self|override|setState)\b/, 'text-pink-400'], // keywords
    [/\b(nn|torch|React|motion|Canvas|Widget|Scaffold|StatefulWidget|State|Center|Text|AnimatedContainer|Duration)\b/, 'text-cyan-400'], // types
    [/\b(useState|useEffect|build|forward|__init__)\b/, 'text-purple-400'], // functions
    [/(@\w+)/, 'text-yellow-400'], // decorators
    [/\b(\d+)\b/, 'text-orange-400'], // numbers
  ];

  // Simple approach: color entire line by first match, fallback to default
  for (const [regex, color] of rules) {
    if (regex.test(remaining)) {
      // Apply color to the whole line for simplicity
      return <span className={color}>{text}</span>;
    }
  }
  return <span className="text-slate-300">{text}</span>;
};

/* ── Monitor code display with typewriter ── */
const MonitorScreen = React.memo(() => {
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const snippet = CODE_SNIPPETS[snippetIdx];

  useEffect(() => {
    const totalChars = snippet.lines.join('\n').length;
    if (charCount < totalChars) {
      const speed = 25 + Math.random() * 35;
      const t = setTimeout(() => setCharCount((c) => c + 1), speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setSnippetIdx((i) => (i + 1) % CODE_SNIPPETS.length);
        setCharCount(0);
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [charCount, snippet]);

  // Build visible lines from charCount
  const fullText = snippet.lines.join('\n');
  const visible = fullText.slice(0, charCount);
  const visibleLines = visible.split('\n');

  return (
    <div className="w-full h-full flex flex-col bg-[#0d1117] overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center gap-1 px-2 py-1 bg-[#161b22] border-b border-white/5 shrink-0">
        <div className="flex gap-1.5 mr-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-[9px] text-cyan-400/60 font-mono">{snippet.lang}</span>
      </div>
      {/* Code area */}
      <div className="flex-1 p-2 font-mono text-[7px] sm:text-[8px] leading-[1.6] overflow-hidden">
        {visibleLines.map((line, i) => (
          <div key={i} className="flex whitespace-pre">
            <span className="w-5 text-right mr-2 text-slate-600 select-none shrink-0">
              {i + 1}
            </span>
            <span>{colorize(line)}</span>
            {i === visibleLines.length - 1 && charCount < fullText.length && (
              <span className="inline-block w-[5px] h-[10px] bg-cyan-400 animate-pulse ml-px" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
});
MonitorScreen.displayName = 'MonitorScreen';

/* ── Floating text element ── */
const FloatingText = ({
  children,
  className = '',
  style = {},
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) => (
  <div
    className={`absolute pointer-events-none select-none ${className}`}
    style={{
      animation: `floatText 6s ease-in-out ${delay}s infinite`,
      ...style,
    }}
  >
    {children}
  </div>
);

/* ── RGB strip glow ── */
const RGBStrip = ({ className = '', color = 'cyan' }: { className?: string; color?: string }) => {
  const colors: Record<string, string> = {
    cyan: 'from-cyan-500/60 via-cyan-400/30 to-transparent',
    purple: 'from-purple-500/60 via-purple-400/30 to-transparent',
    pink: 'from-pink-500/50 via-pink-400/20 to-transparent',
  };
  return (
    <div className={`absolute ${className}`}>
      <div className={`w-full h-full bg-gradient-to-r ${colors[color] || colors.cyan} blur-sm animate-pulse`} />
    </div>
  );
};

/* ── Main CyberRoom component ── */
const CyberRoom = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMouseX(((e.clientX - rect.left) / rect.width - 0.5) * 2);
      setMouseY(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const roomRotateX = 55 + mouseY * 3;
  const roomRotateZ = -45 + mouseX * 3;

  return (
    <section id="home" className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Dark ambient background */}
      <div className="absolute inset-0 bg-[#05080f]" />
      <div className="absolute inset-0 bg-gradient-radial from-cyan-900/10 via-transparent to-transparent" />

      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-cyan-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatParticle ${4 + Math.random() * 6}s ease-in-out ${Math.random() * 5}s infinite`,
            }}
          />
        ))}
      </div>

      <div ref={containerRef} className="relative w-full max-w-5xl mx-auto px-4">
        {/* ── Floating text elements integrated in 3D space ── */}
        <FloatingText
          className="top-[5%] left-[3%] sm:left-[5%] z-30"
          delay={0}
        >
          <p
            className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-cyan-400/50"
            style={{ fontFamily: "'Unbounded', sans-serif" }}
          >
            Hi, I'm
          </p>
        </FloatingText>

        <FloatingText
          className="top-[10%] left-[2%] sm:left-[3%] z-30"
          delay={0.2}
        >
          <h1
            className="text-3xl sm:text-5xl md:text-7xl font-black"
            style={{
              fontFamily: "'Unbounded', sans-serif",
              background: 'linear-gradient(135deg, #00e5ff 0%, #a855f7 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 30px rgba(0,229,255,0.3))',
            }}
          >
            PRAJAL
          </h1>
          <p
            className="text-sm sm:text-lg tracking-[0.2em] uppercase text-slate-400/60 mt-1"
            style={{ fontFamily: "'Unbounded', sans-serif" }}
          >
            Jung Kunwar
          </p>
        </FloatingText>

        <FloatingText
          className="top-[30%] sm:top-[28%] left-[2%] sm:left-[3%] z-30 max-w-[200px] sm:max-w-xs"
          delay={0.5}
        >
          <p className="text-sm sm:text-base text-cyan-300/40 leading-relaxed">
            Future <span className="text-purple-400/60">AI/ML Developer</span>
          </p>
          <p className="text-[10px] sm:text-xs text-slate-500/50 mt-2 leading-relaxed">
            I create beautiful mobile apps and websites with cutting-edge technologies
          </p>
        </FloatingText>

        {/* Social links floating */}
        <FloatingText
          className="bottom-[18%] sm:bottom-[15%] left-[2%] sm:left-[3%] z-30"
          delay={0.8}
        >
          <div className="flex gap-3">
            {[
              { href: 'https://github.com/JungPrajal', label: 'GH' },
              { href: 'https://www.linkedin.com/in/prajal-jung-kunwar-a2a7b2270/', label: 'LI' },
              { href: 'https://medium.com/@prajaljungkunwar', label: 'MD' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto w-8 h-8 sm:w-9 sm:h-9 rounded border border-cyan-500/20 bg-cyan-500/5 flex items-center justify-center text-[9px] sm:text-[10px] font-mono text-cyan-400/60 hover:bg-cyan-500/20 hover:text-cyan-300 transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </FloatingText>

        {/* ── Isometric 3D Room ── */}
        <div
          className="relative mx-auto w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] md:w-[580px] md:h-[520px] lg:w-[700px] lg:h-[560px]"
          style={{
            perspective: '1200px',
            perspectiveOrigin: '50% 30%',
          }}
        >
          <div
            className="relative w-full h-full transition-transform duration-300 ease-out"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${roomRotateX}deg) rotateZ(${roomRotateZ}deg)`,
            }}
          >
            {/* ── Floor ── */}
            <div
              className="absolute"
              style={{
                width: '350px',
                height: '350px',
                left: '50%',
                top: '50%',
                marginLeft: '-175px',
                marginTop: '-175px',
                transformStyle: 'preserve-3d',
                transform: 'translateZ(0px)',
                background: 'linear-gradient(135deg, #0a0e17 0%, #111827 50%, #0a0e17 100%)',
                border: '1px solid rgba(0,229,255,0.08)',
                boxShadow: '0 0 80px rgba(0,229,255,0.05)',
              }}
            >
              {/* Floor grid lines */}
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)
                `,
                backgroundSize: '35px 35px',
              }} />
            </div>

            {/* ── Back wall (left) ── */}
            <div
              className="absolute"
              style={{
                width: '350px',
                height: '200px',
                left: '50%',
                top: '50%',
                marginLeft: '-175px',
                marginTop: '-375px',
                transformStyle: 'preserve-3d',
                transformOrigin: 'bottom center',
                transform: 'rotateX(90deg)',
                background: 'linear-gradient(180deg, #060a12 0%, #0d1420 100%)',
                borderTop: '1px solid rgba(0,229,255,0.06)',
              }}
            >
              {/* Wall poster / decoration */}
              <div className="absolute top-6 left-8 w-16 h-20 border border-purple-500/15 bg-purple-500/5 rounded-sm flex items-center justify-center">
                <span className="text-[6px] text-purple-400/30 font-mono">AI/ML</span>
              </div>
              <div className="absolute top-4 right-10 w-12 h-12 border border-cyan-500/10 bg-cyan-500/5 rounded-sm flex items-center justify-center">
                <span className="text-[5px] text-cyan-400/30 font-mono">{'{ }'}</span>
              </div>
            </div>

            {/* ── Side wall (right) ── */}
            <div
              className="absolute"
              style={{
                width: '200px',
                height: '350px',
                left: '50%',
                top: '50%',
                marginLeft: '175px',
                marginTop: '-350px',
                transformStyle: 'preserve-3d',
                transformOrigin: 'left center',
                transform: 'rotateY(-90deg) translateZ(0px)',
                background: 'linear-gradient(180deg, #060a12 0%, #0d1420 100%)',
                borderTop: '1px solid rgba(0,229,255,0.06)',
              }}
            >
              <RGBStrip className="bottom-0 left-0 w-full h-1" color="purple" />
            </div>

            {/* ── Desk ── */}
            <div
              className="absolute"
              style={{
                width: '220px',
                height: '120px',
                left: '50%',
                top: '50%',
                marginLeft: '-60px',
                marginTop: '-90px',
                transformStyle: 'preserve-3d',
                transform: 'translateZ(55px)',
                background: 'linear-gradient(135deg, #1a1f2e 0%, #151a26 100%)',
                borderRadius: '3px',
                border: '1px solid rgba(0,229,255,0.1)',
                boxShadow: '0 5px 30px rgba(0,0,0,0.5)',
              }}
            >
              {/* Desk edge RGB */}
              <RGBStrip className="bottom-0 left-2 right-2 h-0.5" color="cyan" />

              {/* Mouse pad */}
              <div
                className="absolute"
                style={{
                  width: '50px',
                  height: '35px',
                  right: '15px',
                  top: '50%',
                  marginTop: '-17px',
                  background: 'rgba(0,229,255,0.03)',
                  border: '1px solid rgba(0,229,255,0.08)',
                  borderRadius: '4px',
                }}
              >
                {/* Mouse */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-5 rounded-full bg-[#1a1f2e] border border-white/10"
                  style={{ boxShadow: '0 0 8px rgba(0,229,255,0.15)' }}
                />
              </div>

              {/* Keyboard */}
              <div
                className="absolute"
                style={{
                  width: '90px',
                  height: '35px',
                  left: '25px',
                  top: '50%',
                  marginTop: '-5px',
                  background: '#111622',
                  borderRadius: '3px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  overflow: 'hidden',
                }}
              >
                {/* Key rows */}
                <div className="p-1 grid grid-cols-10 gap-[1px]">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-[3px] rounded-[1px] bg-slate-700/40"
                      style={{
                        animation: i % 7 === 0 ? 'keyPress 3s ease-in-out infinite' : undefined,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
                <RGBStrip className="bottom-0 left-0 w-full h-[2px]" color="purple" />
              </div>
            </div>

            {/* ── Monitor ── */}
            <div
              className="absolute"
              style={{
                width: '160px',
                height: '100px',
                left: '50%',
                top: '50%',
                marginLeft: '-30px',
                marginTop: '-210px',
                transformStyle: 'preserve-3d',
                transform: 'translateZ(55px) rotateX(-90deg)',
                transformOrigin: 'bottom center',
              }}
            >
              {/* Monitor frame */}
              <div
                className="relative w-full h-full rounded-md overflow-hidden"
                style={{
                  border: '2px solid rgba(255,255,255,0.08)',
                  boxShadow: `
                    0 0 40px rgba(0,229,255,0.15),
                    0 0 80px rgba(0,229,255,0.05),
                    inset 0 0 20px rgba(0,229,255,0.05)
                  `,
                }}
              >
                <MonitorScreen />
              </div>
              {/* Monitor stand */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
                <div className="w-3 h-6 bg-slate-800 mx-auto border-x border-white/5" />
                <div className="w-12 h-1.5 bg-slate-800 rounded-sm border border-white/5 mx-auto" />
              </div>
              {/* Screen glow on desk */}
              <div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-8 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse, rgba(0,229,255,0.12) 0%, transparent 70%)',
                }}
              />
            </div>

            {/* ── PC Case (tower) ── */}
            <div
              className="absolute"
              style={{
                width: '45px',
                height: '80px',
                left: '50%',
                top: '50%',
                marginLeft: '-180px',
                marginTop: '-80px',
                transformStyle: 'preserve-3d',
                transform: 'translateZ(0px)',
              }}
            >
              {/* Case body */}
              <div
                className="relative w-full h-full rounded-sm"
                style={{
                  background: 'linear-gradient(180deg, #111622 0%, #0d1117 100%)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.4)',
                }}
              >
                {/* RGB fan */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-cyan-500/20 flex items-center justify-center">
                  <div
                    className="w-6 h-6 rounded-full border-2 border-transparent"
                    style={{
                      background: 'conic-gradient(from 0deg, rgba(0,229,255,0.3), rgba(168,85,247,0.3), rgba(236,72,153,0.3), rgba(0,229,255,0.3))',
                      animation: 'spin 3s linear infinite',
                    }}
                  />
                </div>
                {/* Power LED */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" style={{ boxShadow: '0 0 8px rgba(0,229,255,0.6)' }} />
                {/* Side RGB strip */}
                <RGBStrip className="right-0 top-2 bottom-2 w-[2px]" color="cyan" />
              </div>
            </div>

            {/* ── Coffee mug ── */}
            <div
              className="absolute"
              style={{
                width: '14px',
                height: '14px',
                left: '50%',
                top: '50%',
                marginLeft: '120px',
                marginTop: '-110px',
                transform: 'translateZ(60px)',
              }}
            >
              <div className="w-full h-full rounded-full bg-slate-700 border border-white/10 relative">
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-3 border border-white/10 rounded-r-full" />
                {/* Steam */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-3 opacity-30" style={{ animation: 'steam 2s ease-in-out infinite' }}>
                  <div className="w-full h-full bg-gradient-to-t from-white/20 to-transparent rounded-full" />
                </div>
              </div>
            </div>

            {/* ── Headphones on desk ── */}
            <div
              className="absolute"
              style={{
                width: '20px',
                height: '12px',
                left: '50%',
                top: '50%',
                marginLeft: '100px',
                marginTop: '-70px',
                transform: 'translateZ(58px)',
              }}
            >
              <div className="w-full h-1/2 border-t-2 border-l-2 border-r-2 border-purple-500/20 rounded-t-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:block">
        <div className="w-5 h-8 border border-cyan-500/30 rounded-full flex justify-center">
          <div className="w-0.5 h-2 bg-cyan-400/50 rounded-full mt-1.5 animate-bounce" />
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes floatText {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0); opacity: 0.2; }
          50% { transform: translate(${Math.random() > 0.5 ? '' : '-'}15px, -20px); opacity: 0.5; }
        }
        @keyframes keyPress {
          0%, 90%, 100% { background: rgba(51,65,85,0.4); }
          95% { background: rgba(0,229,255,0.3); box-shadow: 0 0 4px rgba(0,229,255,0.3); }
        }
        @keyframes steam {
          0%, 100% { transform: translateY(0) scaleX(1); opacity: 0.2; }
          50% { transform: translateY(-4px) scaleX(1.5); opacity: 0.4; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default CyberRoom;
