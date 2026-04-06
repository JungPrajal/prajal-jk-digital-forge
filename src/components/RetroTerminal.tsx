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
      {/* 3D Monitor Shell */}
      <div className="relative" style={{ perspective: '800px' }}>
        <div style={{ transform: 'rotateX(2deg) rotateY(-3deg)' }}>
          {/* Matte Charcoal Frame */}
          <div className="p-5"
               style={{
                 background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, #222222 100%)',
                 borderRadius: '30px',
                 boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 50px rgba(0,255,65,0.05), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.3)',
                 border: '1px solid rgba(60,60,60,0.5)',
               }}>
            {/* Inner bezel ridge */}
            <div className="p-1 rounded-[22px]"
                 style={{ background: 'linear-gradient(180deg, #111 0%, #1d1d1d 100%)' }}>
              {/* Screen with inner glow */}
              <div className="relative overflow-hidden"
                   style={{
                     background: '#050505',
                     borderRadius: '18px',
                     boxShadow: 'inset 0 0 80px rgba(0,255,65,0.08), inset 0 0 30px rgba(0,255,65,0.04), inset 0 0 120px rgba(0,200,50,0.03), 0 0 20px rgba(0,255,65,0.06)',
                   }}>
                {/* Scanline overlay */}
                <div className="absolute inset-0 pointer-events-none z-20 crt-scanlines" />

                {/* Vignette / barrel bulge illusion */}
                <div className="absolute inset-0 pointer-events-none z-20"
                     style={{
                       borderRadius: '18px',
                       background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.6) 100%)',
                     }} />

                {/* Flicker layer */}
                <div className="absolute inset-0 pointer-events-none z-20 animate-crt-flicker" />

                {/* Terminal content with chromatic aberration */}
                <div ref={scrollRef} className="relative z-10 p-5 h-64 md:h-72 overflow-y-auto font-mono text-sm scrollbar-hide crt-chromatic">
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
                  {currentLine < terminalLines.length && displayedLines.length <= currentLine && (
                    <span className="inline-block w-2 h-4 animate-pulse" style={{ background: '#00ff41' }} />
                  )}
                </div>

                {/* Film grain / static noise overlay */}
                <div className="absolute inset-0 pointer-events-none z-30 crt-grain" />

                {/* Phosphor backlight glow */}
                <div className="absolute inset-0 pointer-events-none z-0"
                     style={{ background: 'radial-gradient(ellipse at center, rgba(0,255,65,0.05) 0%, transparent 65%)' }} />
              </div>
            </div>
          </div>

          {/* Monitor stand */}
          <div className="w-10 h-12 mx-auto" style={{ background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)' }} />
          <div className="w-32 h-5 mx-auto rounded-full"
               style={{
                 background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)',
                 border: '1px solid rgba(60,60,60,0.4)',
                 boxShadow: '0 6px 16px rgba(0,0,0,0.6)',
               }} />
        </div>
      </div>
    </div>
  );
};

export default RetroTerminal;
