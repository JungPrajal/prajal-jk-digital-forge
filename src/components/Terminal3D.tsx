import React, { useState, useEffect } from 'react';

const Terminal3D = () => {
  const [currentLine, setCurrentLine] = useState(0);
  
  const terminalCommands = [
    "$ whoami",
    "> prajal_fullstack_dev",
    "$ cat skills.txt",
    "> React, Node.js, Python, Flutter",
    "> AI/ML, Web Development, Mobile Apps",
    "$ ls projects/",
    "> awesome_web_apps/",
    "> mobile_applications/", 
    "> ai_ml_projects/",
    "$ git status",
    "> On branch main",
    "> Nothing to commit, working tree clean",
    "$ npm run dev",
    "> ✨ Ready to code amazing things!"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % terminalCommands.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-md">
      {/* 3D Terminal */}
      <div className="transform perspective-1000 rotate-x-5 rotate-y-2">
        <div className="bg-black border-2 border-gray-600 rounded-lg shadow-2xl overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-gray-400 text-xs">terminal</span>
          </div>
          
          {/* Terminal Content */}
          <div className="p-4 h-48 font-mono text-sm overflow-hidden">
            {terminalCommands.slice(0, currentLine + 1).map((command, index) => (
              <div
                key={index}
                className={`mb-1 ${
                  command.startsWith('$') ? 'text-green-400' :
                  command.startsWith('>') ? 'text-cyan-300' :
                  'text-white'
                } ${index === currentLine ? 'animate-fade-in' : ''}`}
              >
                {command}
                {index === currentLine && command.startsWith('$') && (
                  <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse"></span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Keyboard */}
      <div className="mt-4 bg-gray-800 rounded-lg p-2 shadow-lg border border-gray-600">
        <div className="grid grid-cols-12 gap-1">
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              className="h-6 bg-gray-700 rounded border border-gray-600 hover:bg-gray-600 transition-colors"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Terminal3D;