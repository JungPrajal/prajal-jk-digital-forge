import React from 'react';

const DeskSetup3D = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Simplified 3D-look desk setup using CSS */}
      <div className="relative w-full max-w-md">
        {/* Monitor */}
        <div className="relative mx-auto mb-8">
          <div className="w-64 h-40 bg-gradient-to-br from-card to-card/50 rounded-lg border border-border shadow-2xl transform perspective-1000 rotate-x-5">
            {/* Screen content */}
            <div className="w-full h-full bg-background/90 rounded-lg p-4 relative overflow-hidden">
              {/* Code lines */}
              <div className="space-y-2">
                <div className="h-2 bg-primary/60 rounded w-3/4 animate-pulse"></div>
                <div className="h-2 bg-accent/60 rounded w-1/2 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="h-2 bg-primary/40 rounded w-2/3 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="h-2 bg-accent/40 rounded w-1/3 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
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