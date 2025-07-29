import React from 'react';

const FlowingBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Flowing curves using CSS */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 rounded-full border-2 border-primary animate-pulse"></div>
        <div className="absolute top-1/2 -left-1/4 w-80 h-80 rounded-full border border-accent animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full border border-primary/50 animate-pulse"></div>
      </div>
      
      {/* Flowing gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
      
      {/* Animated flowing lines with CSS */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <defs>
            <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="flowGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          <path 
            d="M0,300 Q250,100 500,300 T1000,300" 
            stroke="url(#flowGradient1)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
          />
          <path 
            d="M0,700 Q250,500 500,700 T1000,700" 
            stroke="url(#flowGradient2)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
          <path 
            d="M0,500 Q250,300 500,500 T1000,500" 
            stroke="url(#flowGradient1)" 
            strokeWidth="1" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '2s' }}
          />
        </svg>
      </div>
    </div>
  );
};

export default FlowingBackground;