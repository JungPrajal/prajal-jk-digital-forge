import React, { useState, useEffect } from 'react';
import { Github, Linkedin, FileText, ExternalLink, Play, Download, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import KineticName from './KineticName';

const HeroSection = () => {
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const codeSnippets = [
    {
      language: 'React/TypeScript',
      code: `import React from 'react';
import { useAI } from './hooks';

const AIComponent: React.FC = () => {
  const { predict, isLoading } = useAI();
  
  return (
    <div className="ai-container">
      <h2>AI/ML Integration</h2>
      {isLoading ? <Spinner /> : null}
    </div>
  );
};`,
      color: '#61DAFB'
    },
    {
      language: 'Python/ML',
      code: `import tensorflow as tf
import numpy as np

class AIModel:
    def __init__(self):
        self.model = tf.keras.Sequential([
            tf.keras.layers.Dense(128, activation='relu'),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.Dense(10)
        ])
    
    def train(self, X, y):
        self.model.compile(optimizer='adam',
                          loss='sparse_categorical_crossentropy')
        return self.model.fit(X, y, epochs=10)`,
      color: '#3776AB'
    },
    {
      language: 'Flutter/Dart',
      code: `class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AI Mobile App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: AIHomePage(),
    );
  }
}`,
      color: '#02569B'
    }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCodeIndex((prev) => (prev + 1) % codeSnippets.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentSnippet = codeSnippets[currentCodeIndex];

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 items-center min-h-[80vh]">
          
          {/* Left Side - Personal Introduction */}
          <div className="order-1 space-y-6 sm:space-y-8 text-center lg:text-left w-full">
            <div className="space-y-3 sm:space-y-4">
              {/* Kinetic Typography Name */}
              <div className="mb-2">
                <p className="text-sm sm:text-base tracking-[0.25em] uppercase text-muted-foreground mb-2 sm:mb-3" style={{ fontFamily: "'Unbounded', sans-serif" }}>
                  Hi, I'm
                </p>
                <KineticName scrollY={scrollY} />
              </div>
              
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-muted-foreground animate-fade-in">
                Future <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">AI/ML Developer</span>
              </h2>
              
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fade-in delay-500 px-2 sm:px-0">
                I create beautiful mobile apps and websites with cutting-edge technologies, 
                specializing in AI integration and modern development practices.
              </p>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-in delay-1000 px-2 sm:px-0">
              <Button size="lg" className="group active:scale-95 transition-all duration-300 min-h-[48px] text-sm sm:text-base w-full sm:w-auto touch-manipulation">
                <Play className="w-4 h-4 mr-2" />
                View My Projects
              </Button>
              <Button variant="outline" size="lg" className="group active:scale-95 transition-all duration-300 min-h-[48px] text-sm sm:text-base w-full sm:w-auto touch-manipulation">
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
              <Button variant="secondary" size="lg" className="group active:scale-95 transition-all duration-300 min-h-[48px] text-sm sm:text-base w-full sm:w-auto touch-manipulation">
                <MessageCircle className="w-4 h-4 mr-2" />
                Let's Connect
              </Button>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center lg:justify-start animate-fade-in delay-1500 px-2 sm:px-0">
              <a href="https://github.com/JungPrajal" target="_blank" rel="noopener noreferrer"
                className="group flex items-center justify-center sm:justify-start space-x-2 p-3 rounded-lg border border-border active:border-primary transition-all duration-300 min-h-[48px] touch-manipulation">
                <Github className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">View Code</span>
                <ExternalLink className="w-3 h-3 opacity-50 flex-shrink-0" />
              </a>
              <a href="https://www.linkedin.com/in/prajal-jung-kunwar-a2a7b2270/" target="_blank" rel="noopener noreferrer"
                className="group flex items-center justify-center sm:justify-start space-x-2 p-3 rounded-lg border border-border active:border-primary transition-all duration-300 min-h-[48px] touch-manipulation">
                <Linkedin className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">Connect</span>
                <ExternalLink className="w-3 h-3 opacity-50 flex-shrink-0" />
              </a>
              <a href="https://medium.com/@prajaljungkunwar" target="_blank" rel="noopener noreferrer"
                className="group flex items-center justify-center sm:justify-start space-x-2 p-3 rounded-lg border border-border active:border-primary transition-all duration-300 min-h-[48px] touch-manipulation">
                <FileText className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">Read Articles</span>
                <ExternalLink className="w-3 h-3 opacity-50 flex-shrink-0" />
              </a>
            </div>
          </div>

          {/* Right Side - Animated PC Setup */}
          <div className="order-2 relative w-full max-w-lg lg:max-w-none mx-auto">
            <div className="relative bg-gradient-to-br from-card/50 to-background/30 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-border/50 shadow-2xl">
              {/* Monitor */}
              <div className="relative bg-card rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-xl border-2 border-border">
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 animate-pulse"></div>
                <div className="relative bg-background rounded-lg p-2 sm:p-3 lg:p-4 min-h-[200px] sm:min-h-[250px] lg:min-h-[300px] border border-border overflow-hidden">
                  <div className="flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4 pb-2 border-b border-border">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-muted-foreground ml-1 sm:ml-2 truncate">{currentSnippet.language}</span>
                  </div>
                  <div className="font-mono text-xs sm:text-sm space-y-1 overflow-hidden">
                    {currentSnippet.code.split('\n').slice(0, 10).map((line, index) => (
                      <div key={index} className="animate-fade-in flex" style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'backwards' }}>
                        <span className="text-muted-foreground mr-2 sm:mr-4 flex-shrink-0 text-xs">{(index + 1).toString().padStart(2, '0')}</span>
                        <span className="transition-all duration-300 truncate" style={{ color: line.includes('import') || line.includes('class') || line.includes('function') ? currentSnippet.color : 'inherit' }}>
                          {line}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="inline-block w-1 h-3 sm:w-2 sm:h-4 bg-primary animate-pulse mt-2"></div>
                </div>
                <div className="absolute -inset-1 rounded-xl sm:rounded-2xl blur-lg opacity-20 sm:opacity-30 animate-pulse" style={{ backgroundColor: currentSnippet.color }}></div>
              </div>

              {/* Keyboard */}
              <div className="mt-3 sm:mt-4 lg:mt-6 bg-card rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 border border-border shadow-lg">
                <div className="grid grid-cols-10 lg:grid-cols-12 gap-1">
                  {Array.from({ length: 30 }, (_, i) => (
                    <div key={i} className="h-4 sm:h-6 lg:h-8 bg-background rounded border border-border animate-pulse" style={{ animationDelay: `${i * 0.05}s` }}></div>
                  ))}
                </div>
              </div>

              <div className="absolute -inset-2 sm:-inset-3 lg:-inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl sm:rounded-3xl blur-xl animate-pulse opacity-30 sm:opacity-50"></div>
            </div>

            <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-primary rounded-full animate-bounce delay-1000"></div>
            <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 bg-secondary rounded-full animate-bounce delay-500"></div>
            <div className="absolute top-1/2 -right-4 sm:-right-6 lg:-right-8 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-accent rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
