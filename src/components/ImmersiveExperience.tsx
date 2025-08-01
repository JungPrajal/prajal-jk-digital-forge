import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface ImmersiveExperienceCardProps {
  exp: Experience;
  index: number;
  scrollProgress: number;
  isExiting: boolean;
}

const ImmersiveExperienceCard: React.FC<ImmersiveExperienceCardProps> = ({ 
  exp, 
  index, 
  scrollProgress, 
  isExiting 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate which card should be active based on scroll progress
  const cardProgress = Math.max(0, Math.min(1, (scrollProgress - index * 0.25) / 0.25));
  const isActive = scrollProgress >= index * 0.25 && scrollProgress < (index + 1) * 0.25;
  const isPrevious = scrollProgress > (index + 1) * 0.25;
  
  // Calculate transforms based on card state
  let rotateX = 60;
  let translateZ = -300;
  let scale = 0.85;
  let opacity = 1;
  let translateY = 50;
  
  if (isActive || cardProgress > 0) {
    // Active card animation
    rotateX = 60 - (cardProgress * 60);
    translateZ = -300 + (cardProgress * 300);
    scale = 0.85 + (cardProgress * 0.15);
    opacity = 1;
    translateY = 50 - (cardProgress * 50);
  }
  
  if (isPrevious) {
    // Previous cards in background stack
    const stackDepth = Math.min(3, scrollProgress * 4 - index - 1);
    rotateX = 25 + (stackDepth * 10);
    translateZ = -100 - (stackDepth * 50);
    scale = 0.9 - (stackDepth * 0.05);
    opacity = 1;
    translateY = -20 - (stackDepth * 10);
  }
  
  // Exit animation when scrolling past section
  if (isExiting) {
    rotateX = -45;
    translateZ = 200;
    scale = 1.2;
    opacity = 0;
    translateY = -100;
  }
  
  const cardStyle = {
    transform: `
      perspective(1200px) 
      rotateX(${rotateX}deg) 
      translateZ(${translateZ}px) 
      translateY(${translateY}px) 
      scale(${scale})
    `,
    opacity,
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    transformStyle: 'preserve-3d' as const,
    backfaceVisibility: 'hidden' as const,
    willChange: 'transform, opacity',
  };

  return (
    <div 
      className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 z-10"
      style={{ 
        ...cardStyle,
        filter: `drop-shadow(0 ${Math.max(10, translateZ * -0.1)}px ${Math.max(20, translateZ * -0.2)}px rgba(139, 92, 246, 0.3))`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className={`relative bg-card p-8 rounded-2xl border transition-all duration-300 transform group cursor-pointer overflow-hidden ${
          isActive 
            ? 'border-cyan-400/60 shadow-2xl shadow-cyan-400/40' 
            : 'border-purple-500/30 shadow-lg shadow-purple-500/20'
        } ${isHovered ? 'border-purple-400/80 shadow-3xl shadow-purple-500/50' : ''}`}>
          
          {/* Enhanced gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 transition-opacity duration-500 ${
            isHovered || isActive ? 'opacity-100' : 'opacity-0'
          }`} />
          
          {/* 3D depth shadows */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
          
          {/* Animated bottom border */}
          <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 transition-all duration-800 ${
            isActive || isHovered ? 'w-full' : 'w-0'
          }`} />
          
          <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
            <div className="flex-1">
              <h3 className={`text-2xl md:text-3xl font-bold mb-2 transition-all duration-700 ${
                isActive || isHovered 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400' 
                  : 'text-purple-300'
              }`}>
                {exp.title}
              </h3>
              <p className={`text-xl mb-3 transition-all duration-700 ${
                isActive || isHovered ? 'text-cyan-300' : 'text-cyan-400'
              }`}>
                {exp.company}
              </p>
              <p className={`text-lg mb-4 leading-relaxed transition-all duration-700 ${
                isActive || isHovered ? 'text-gray-200' : 'text-gray-300'
              }`}>
                {exp.description}
              </p>
            </div>
            <div className="text-right">
              <span className={`px-6 py-3 bg-purple-600/20 rounded-xl text-base font-medium transition-all duration-700 ${
                isActive || isHovered 
                  ? 'bg-purple-500/40 text-purple-200 scale-105 shadow-lg shadow-purple-500/30' 
                  : 'text-purple-300'
              }`}>
                {exp.period}
              </span>
            </div>
          </div>
          
          {/* Enhanced arrow reveal */}
          <div className={`absolute top-1/2 right-8 transform -translate-y-1/2 transition-all duration-500 ${
            isHovered || isActive ? 'translate-x-0 opacity-100 scale-110' : 'translate-x-6 opacity-0'
          }`}>
            <div className="p-2 rounded-full bg-cyan-500/20 backdrop-blur-sm">
              <ExternalLink className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImmersiveExperience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  
  const experiences: Experience[] = [
    {
      title: "Product/Graphics Design and Video Editor",
      company: "Jude Fashion Industry Nepal",
      period: "March 2025 - Present",
      description: "Creating engaging product designs and social media content including reels and promotional videos."
    },
    {
      title: "UI/UX Web Development, SEO Expert, Graphics Design",
      company: "Fast Track Repair Service",
      period: "January 2025",
      description: "Developed business website using Wix, implemented SEO strategies, and created social media designs."
    },
    {
      title: "Product/Graphics Design",
      company: "Aikyam Nepal",
      period: "December 2024 - February 2025",
      description: "Designed product graphics and visual content for various marketing campaigns."
    },
    {
      title: "UI/UX Design Intern",
      company: "Xdezo Academy",
      period: "Internship",
      description: "Developed an e-learning mobile app using Flutter/Dart with Node.js backend integration."
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate progress through the section
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      
      // Determine if we're in the section
      if (sectionTop <= viewportHeight && sectionBottom >= 0) {
        // Calculate progress (0 to 1) through the visible section
        const visibleTop = Math.max(0, -sectionTop);
        const visibleHeight = Math.min(sectionHeight, viewportHeight - Math.max(0, sectionTop));
        const progress = Math.min(1, visibleTop / (sectionHeight - viewportHeight));
        
        setScrollProgress(Math.max(0, Math.min(1, progress)));
        setIsExiting(false);
      } else if (sectionBottom < 0) {
        // Section has been scrolled past - trigger exit animation
        setIsExiting(true);
        setScrollProgress(1);
      } else {
        // Section hasn't been reached yet
        setScrollProgress(0);
        setIsExiting(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="experience" 
      className="relative min-h-[400vh] py-20"
      style={{ 
        perspective: '1200px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Section title */}
      <div className="sticky top-20 z-20 text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold text-gradient">
          Professional Journey
        </h2>
        <p className="text-gray-400 mt-4 text-lg">
          Scroll to explore my career progression
        </p>
      </div>
      
      {/* 3D Card Stack Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative w-full h-full" style={{ perspective: '1200px' }}>
          {experiences.map((exp, index) => (
            <ImmersiveExperienceCard
              key={index}
              exp={exp}
              index={index}
              scrollProgress={scrollProgress}
              isExiting={isExiting}
            />
          ))}
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-2">
          {experiences.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                scrollProgress >= index * 0.25 && scrollProgress < (index + 1) * 0.25
                  ? 'bg-cyan-400 scale-125 shadow-lg shadow-cyan-400/50'
                  : scrollProgress > (index + 1) * 0.25
                  ? 'bg-purple-500 scale-110'
                  : 'bg-gray-600 scale-100'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImmersiveExperience;