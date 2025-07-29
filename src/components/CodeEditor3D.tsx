import React from 'react';

const CodeEditor3D = () => {
  const codeLines = [
    "const developer = {",
    "  name: 'Prajal',",
    "  role: 'Full Stack Developer',",
    "  skills: ['React', 'Node.js', 'Python'],",
    "  passion: 'Building amazing apps',",
    "  coffee: true,",
    "  debugging: 'Always',",
    "};",
    "",
    "function createAwesome() {",
    "  return code + creativity + coffee;",
    "}"
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* 3D Monitor Frame */}
      <div className="relative transform perspective-1000 rotate-x-5 rotate-y-12">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 shadow-2xl border border-gray-700">
          {/* Screen */}
          <div className="bg-gray-900 rounded-lg p-4 relative overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-700">
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-gray-400 text-xs ml-2">code-editor.js</span>
            </div>
            
            {/* Code Content */}
            <div className="font-mono text-sm space-y-1">
              {codeLines.map((line, index) => (
                <div 
                  key={index} 
                  className="text-gray-300 opacity-0 animate-fade-in"
                  style={{ 
                    animationDelay: `${index * 0.2}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <span className="text-gray-500 mr-3">{String(index + 1).padStart(2, '0')}</span>
                  <span 
                    className={
                      line.includes('const') || line.includes('function') ? 'text-purple-400' :
                      line.includes('name') || line.includes('role') ? 'text-green-400' :
                      line.includes('skills') || line.includes('passion') ? 'text-blue-400' :
                      line.includes("'") ? 'text-yellow-400' :
                      'text-gray-300'
                    }
                  >
                    {line}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Cursor */}
            <div className="inline-block w-2 h-4 bg-green-400 animate-pulse mt-1"></div>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-lg"></div>
          </div>
        </div>
        
        {/* Monitor Stand */}
        <div className="w-6 h-8 bg-gray-800 mx-auto mt-2"></div>
        <div className="w-16 h-3 bg-gray-700 mx-auto rounded-full mt-1"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500/30 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-2 -left-4 w-6 h-6 bg-cyan-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default CodeEditor3D;