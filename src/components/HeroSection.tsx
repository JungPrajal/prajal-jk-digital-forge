import React, { useState, useEffect } from 'react';
import { Github, Linkedin, FileText, ExternalLink, Play, Download, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

const HeroSection = () => {
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

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

  const name = "Hi, I'm Prajal JK";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < name.length) {
        setTypingText(name.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCodeIndex((prev) => (prev + 1) % codeSnippets.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const currentSnippet = codeSnippets[currentCodeIndex];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Side - Personal Introduction */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {typingText}
                {isTyping && <span className="animate-pulse">|</span>}
              </h1>
              
              <h2 className="text-2xl lg:text-3xl font-semibold text-muted-foreground animate-fade-in">
                Future <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">AI/ML Developer</span>
              </h2>
              
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fade-in delay-500">
                I create beautiful mobile apps and websites with cutting-edge technologies, 
                specializing in AI integration and modern development practices.
              </p>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in delay-1000">
              <Button size="lg" className="group hover:scale-105 transition-all duration-300">
                <Play className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                View My Projects
              </Button>
              
              <Button variant="outline" size="lg" className="group hover:scale-105 transition-all duration-300">
                <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                Download Resume
              </Button>
              
              <Button variant="secondary" size="lg" className="group hover:scale-105 transition-all duration-300">
                <MessageCircle className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                Let's Connect
              </Button>
            </div>

            {/* Social Media Links */}
            <div className="flex gap-6 justify-center lg:justify-start animate-fade-in delay-1500">
              <a 
                href="https://github.com/JungPrajal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">View Code</span>
                <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
              </a>
              
              <a 
                href="https://www.linkedin.com/in/prajal-jung-kunwar-a2a7b2270/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Connect</span>
                <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
              </a>
              
              <a 
                href="https://medium.com/@prajaljungkunwar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Read Articles</span>
                <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          {/* Right Side - Animated PC Setup */}
          <div className="relative">
            {/* PC Setup Container */}
            <div className="relative bg-gradient-to-br from-card/50 to-background/30 backdrop-blur-lg rounded-3xl p-8 border border-border/50 shadow-2xl">
              
              {/* Monitor */}
              <div className="relative bg-card rounded-2xl p-6 shadow-xl border-2 border-border">
                {/* Monitor Bezel */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 animate-pulse"></div>
                
                {/* Screen */}
                <div className="relative bg-background rounded-lg p-4 min-h-[300px] border border-border overflow-hidden">
                  {/* Terminal Header */}
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-muted-foreground ml-2">{currentSnippet.language}</span>
                  </div>
                  
                  {/* Code Display */}
                  <div className="font-mono text-sm space-y-1">
                    {currentSnippet.code.split('\n').map((line, index) => (
                      <div 
                        key={index} 
                        className="animate-fade-in"
                        style={{ 
                          animationDelay: `${index * 0.1}s`,
                          animationFillMode: 'backwards'
                        }}
                      >
                        <span className="text-muted-foreground mr-4">{(index + 1).toString().padStart(2, '0')}</span>
                        <span 
                          className="transition-all duration-300"
                          style={{ 
                            color: line.includes('import') || line.includes('class') || line.includes('function') ? currentSnippet.color : 'inherit'
                          }}
                        >
                          {line}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Typing Cursor */}
                  <div className="inline-block w-2 h-4 bg-primary animate-pulse mt-2"></div>
                </div>
                
                {/* RGB Monitor Glow */}
                <div 
                  className="absolute -inset-1 rounded-2xl blur-lg opacity-30 animate-pulse"
                  style={{ backgroundColor: currentSnippet.color }}
                ></div>
              </div>

              {/* Keyboard */}
              <div className="mt-6 bg-card rounded-xl p-4 border border-border shadow-lg">
                <div className="grid grid-cols-12 gap-1">
                  {Array.from({ length: 36 }, (_, i) => (
                    <div 
                      key={i}
                      className="h-8 bg-background rounded border border-border animate-pulse"
                      style={{ 
                        animationDelay: `${i * 0.05}s`,
                        backgroundColor: Math.random() > 0.8 ? currentSnippet.color + '20' : undefined
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* RGB Lighting Effects */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-xl animate-pulse opacity-50"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-bounce delay-1000"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary rounded-full animate-bounce delay-500"></div>
            <div className="absolute top-1/2 -right-8 w-4 h-4 bg-accent rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;