import React, { useState, useEffect } from 'react';

const DeskSetup3D = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedCode, setDisplayedCode] = useState<string[]>([]);

  const codeLines = [
    "// Welcome to my digital workspace",
    "import React from 'react';",
    "import { useState, useEffect } from 'react';",
    "",
    "const Developer = () => {",
    "  const [skills, setSkills] = useState([",
    "    'React', 'TypeScript', 'Node.js',",
    "    'Python', 'AWS', 'Docker'",
    "  ]);",
    "",
    "  useEffect(() => {",
    "    console.log('Building amazing things...');",
    "    setSkills(prev => [...prev, 'Innovation']);",
    "  }, []);",
    "",
    "  return (",
    "    <div className='developer-profile'>",
    "      <h1>Prajal - Full Stack Developer</h1>",
    "      <p>Turning ideas into reality ✨</p>",
    "    </div>",
    "  );",
    "};"
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
            <div className="w-full h-full bg-slate-900/95 rounded-lg p-2 relative overflow-hidden font-mono text-xs">
              {/* VS Code-like header */}
              <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-700/50">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                </div>
                <span className="text-slate-400 text-[7px] bg-slate-800 px-1 rounded">Developer.tsx</span>
              </div>
              
              {/* Matrix background effect */}
              <div className="absolute inset-0 opacity-10">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute w-px bg-gradient-to-b from-green-400 to-transparent animate-matrix"
                    style={{ 
                      left: `${10 + i * 12}%`, 
                      height: '100%',
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: '3s'
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Animated code with better syntax highlighting */}
              <div className="space-y-1 relative z-10">
                {displayedCode.map((line, index) => (
                  <div key={index} className="flex opacity-0 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <span className="text-slate-500 text-[7px] mr-2 w-3 text-right">{index + 1}</span>
                    <span className={`text-[7px] leading-tight ${
                      line.includes('//') ? 'text-green-500 italic' :
                      line.includes('import') || line.includes('from') ? 'text-pink-400' :
                      line.includes('const') || line.includes('function') || line.includes('useEffect') ? 'text-purple-400' :
                      line.includes('useState') || line.includes('React') ? 'text-blue-400' :
                      line.includes("'") || line.includes('"') ? 'text-emerald-400' :
                      line.includes('return') || line.includes('className') ? 'text-yellow-400' :
                      line.includes('<') || line.includes('>') ? 'text-cyan-400' :
                      line.includes('[') || line.includes(']') || line.includes('{') || line.includes('}') ? 'text-orange-400' :
                      'text-slate-200'
                    }`}>
                      {line}
                      {index === currentLine && (
                        <span className="inline-block w-px h-3 bg-white animate-pulse ml-px shadow-glow"></span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Particles floating effect */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-float"
                    style={{ 
                      left: `${20 + i * 15}%`, 
                      top: `${30 + i * 10}%`,
                      animationDelay: `${i * 0.8}s`,
                      animationDuration: '4s'
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Screen glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-purple-500/10 rounded-lg"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/5 to-transparent rounded-lg animate-pulse"></div>
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