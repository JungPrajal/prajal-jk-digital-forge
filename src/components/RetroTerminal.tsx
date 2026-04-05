import React, { useState, useEffect, useRef } from 'react';

const terminalLines = [
  { type: 'cmd', text: '$ whoami' },
  { type: 'out', text: '> Prajal — Full Stack Developer & Tech Enthusiast' },
  { type: 'cmd', text: '$ cat about.txt' },
  { type: 'out', text: '> Passionate about building modern web applications' },
  { type: 'out', text: '> and exploring the intersection of AI & software.' },
  { type: 'out', text: '> BSc (Hons) in Business Information Technology' },
  { type: 'out', text: '> from London Metropolitan University.' },
  { type: 'cmd', text: '$ cat interests.txt' },
  { type: 'out', text: '> Full-stack development, Machine Learning,' },
  { type: 'out', text: '> Mobile apps, Cloud architecture, and' },
  { type: 'out', text: '> turning caffeine into code since day one.' },
  { type: 'cmd', text: '$ echo $MOTTO' },
  { type: 'out', text: '> "Ship fast. Learn faster. Never stop building."' },
];

const RetroTerminal = () => {
  const [displayedLines, setDisplayedLines] = useState<{ type: string; text: string }[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isTyping) return;

    if (currentLine >= terminalLines.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLine(0);
        setCurrentChar(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const line = terminalLines[currentLine];
    const speed = line.type === 'cmd' ? 60 : 30;

    if (currentChar < line.text.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => {
          const copy = [...prev];
          copy[currentLine] = { type: line.type, text: line.text.substring(0, currentChar + 1) };
          return copy;
        });
        setCurrentChar(c => c + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      const pause = line.type === 'cmd' ? 400 : 150;
      const timer = setTimeout(() => {
        setCurrentLine(l => l + 1);
        setCurrentChar(0);
      }, pause);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar, isTyping]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedLines]);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* 3D Monitor Frame */}
      <div className="relative" style={{ perspective: '800px' }}>
        <div style={{ transform: 'rotateX(2deg) rotateY(-3deg)' }}>
          {/* Bezel */}
          <div className="bg-gradient-to-b from-gray-700 to-gray-900 rounded-2xl p-3 shadow-2xl border border-gray-600"
               style={{ boxShadow: '0 0 40px rgba(0,255,65,0.08), inset 0 2px 4px rgba(255,255,255,0.05)' }}>
            {/* Screen */}
            <div className="relative rounded-lg overflow-hidden"
                 style={{
                   background: '#0a120a',
                   boxShadow: 'inset 0 0 60px rgba(0,255,65,0.06), 0 0 30px rgba(0,255,65,0.1)',
                 }}>
              {/* Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none z-20 crt-scanlines" />

              {/* Vignette / barrel bulge illusion */}
              <div className="absolute inset-0 pointer-events-none z-20 rounded-lg"
                   style={{
                     background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.55) 100%)',
                   }} />

              {/* Flicker layer */}
              <div className="absolute inset-0 pointer-events-none z-20 animate-crt-flicker" />

              {/* Terminal content */}
              <div ref={scrollRef} className="relative z-10 p-4 h-64 md:h-72 overflow-y-auto font-mono text-sm scrollbar-hide">
                {displayedLines.map((line, i) => (
                  <div key={i} className="mb-1 leading-relaxed" style={{ textShadow: '0 0 8px rgba(0,255,65,0.5)' }}>
                    <span style={{ color: line.type === 'cmd' ? '#00ff41' : '#00cc33' }}>
                      {line.text}
                    </span>
                    {i === currentLine && currentChar < (terminalLines[currentLine]?.text.length ?? 0) && (
                      <span className="inline-block w-2 h-4 ml-0.5 animate-pulse" style={{ background: '#00ff41' }} />
                    )}
                  </div>
                ))}
                {/* Blinking cursor at end */}
                {currentLine < terminalLines.length && displayedLines.length <= currentLine && (
                  <span className="inline-block w-2 h-4 animate-pulse" style={{ background: '#00ff41' }} />
                )}
              </div>

              {/* Phosphor glow */}
              <div className="absolute inset-0 pointer-events-none z-0"
                   style={{ background: 'radial-gradient(ellipse at center, rgba(0,255,65,0.03) 0%, transparent 70%)' }} />
            </div>
          </div>

          {/* Monitor stand */}
          <div className="w-8 h-10 bg-gradient-to-b from-gray-700 to-gray-800 mx-auto" />
          <div className="w-28 h-4 bg-gradient-to-b from-gray-700 to-gray-900 mx-auto rounded-full border border-gray-600"
               style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }} />
        </div>
      </div>
    </div>
  );
};

export default RetroTerminal;
