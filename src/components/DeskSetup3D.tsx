import React, { useState, useEffect } from 'react';

const DeskSetup3D = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedCode, setDisplayedCode] = useState<string[]>([]);

  const codeLines = [
    "const portfolio = {",
    "  developer: 'Prajal',",
    "  skills: ['React', 'Node.js'],",
    "  experience: 'Full Stack',",
    "  passion: 'Innovation',",
    "  status: 'Available'",
    "};",
    "",
    "function buildAmazing() {",
    "  return creativity + code;",
    "}"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentLine < codeLines.length) {
        const line = codeLines[currentLine];
        if (currentChar < line.length) {
          setDisplayedCode(prev => {
            const newCode = [...prev];
            if (!newCode[currentLine]) {
              newCode[currentLine] = '';
            }
            newCode[currentLine] = line.substring(0, currentChar + 1);
            return newCode;
          });
          setCurrentChar(prev => prev + 1);
        } else {
          setCurrentLine(prev => prev + 1);
          setCurrentChar(0);
        }
      } else {
        // Reset animation
        setTimeout(() => {
          setCurrentLine(0);
          setCurrentChar(0);
          setDisplayedCode([]);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [currentLine, currentChar]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Simplified 3D-look desk setup using CSS */}
      <div className="relative w-full max-w-md">
        {/* Monitor */}
        <div className="relative mx-auto mb-8">
          <div className="w-64 h-40 bg-gradient-to-br from-card to-card/50 rounded-lg border border-border shadow-2xl transform perspective-1000 rotate-x-5">
            {/* Screen content */}
            <div className="w-full h-full bg-background/90 rounded-lg p-2 relative overflow-hidden font-mono text-xs">
              {/* Terminal header */}
              <div className="flex items-center gap-1 mb-2 pb-1 border-b border-border/30">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-muted-foreground text-[8px] ml-1">code.js</span>
              </div>
              
              {/* Animated code */}
              <div className="space-y-1">
                {displayedCode.map((line, index) => (
                  <div key={index} className="flex">
                    <span className="text-muted-foreground text-[8px] mr-2 w-4">{index + 1}</span>
                    <span className={`text-[8px] ${
                      line.includes('const') || line.includes('function') ? 'text-purple-400' :
                      line.includes("'") ? 'text-green-400' :
                      line.includes(':') ? 'text-blue-400' :
                      'text-foreground'
                    }`}>
                      {line}
                      {index === currentLine && (
                        <span className="inline-block w-1 h-3 bg-primary animate-pulse ml-px"></span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Glowing effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg"></div>
            </div>
          </div>
          
          {/* Monitor stand */}
          <div className="w-8 h-16 bg-muted mx-auto"></div>
          <div className="w-24 h-4 bg-muted mx-auto rounded-full"></div>
        </div>

        {/* PC Case */}
        <div className="absolute top-0 -right-16 w-20 h-32 bg-gradient-to-br from-card to-card/50 rounded-lg border border-border shadow-xl">
          {/* RGB fans */}
          <div className="absolute top-4 right-1 w-6 h-6 rounded-full bg-primary/60 animate-pulse"></div>
          <div className="absolute top-16 right-1 w-6 h-6 rounded-full bg-accent/60 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Keyboard */}
        <div className="w-72 h-12 bg-card rounded-lg border border-border mx-auto relative">
          <div className="absolute inset-x-0 -bottom-1 h-2 bg-primary/30 rounded-full blur-sm"></div>
        </div>

        {/* Mouse pad */}
        <div className="absolute bottom-0 right-8 w-24 h-20 bg-accent/20 rounded-lg border border-accent/30"></div>
      </div>
    </div>
  );
};

export default DeskSetup3D;