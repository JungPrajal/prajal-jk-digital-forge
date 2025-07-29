import React from 'react';

const FloatingCode = () => {
  const codeSnippets = [
    '{ }',
    '< />',
    'npm install',
    'git commit',
    'const',
    'function',
    '=>',
    'useState',
    'useEffect',
    'API',
    '404',
    'debug',
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {codeSnippets.map((snippet, index) => (
        <div
          key={index}
          className="absolute text-purple-500/20 font-mono text-lg animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        >
          {snippet}
        </div>
      ))}
      
      {/* Binary rain effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-green-500/10 font-mono text-xs animate-rain"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            {Array.from({ length: 50 }).map((_, j) => (
              <div key={j} className="mb-2">
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloatingCode;