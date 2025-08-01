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
  
  // Calculate transforms for card shuffling effect
  let translateY = 0;
  let translateZ = 0;
  let scale = 1;
  let opacity = 1;
  
  if (isActive || cardProgress > 0) {
    // Active card - fully visible at front
    translateY = 0;
    translateZ = 0;
    scale = 1;
    opacity = 1;
  } else if (index > Math.floor(scrollProgress * 4)) {
    // Future cards - stacked behind with increasing depth
    const stackDepth = index - Math.floor(scrollProgress * 4);
    translateY = stackDepth * 8; // Small vertical offset for depth
    translateZ = -stackDepth * 20; // Push cards back
    scale = 1 - (stackDepth * 0.02); // Slight scale reduction
    opacity = 1;
  } else {
    // Previous cards - slide out behind
    const behindDepth = Math.floor(scrollProgress * 4) - index;
    translateY = -behindDepth * 8;
    translateZ = -behindDepth * 30;
    scale = 1 - (behindDepth * 0.03);
    opacity = Math.max(0.3, 1 - (behindDepth * 0.2));
  }
  
  // Exit animation when scrolling past section
  if (isExiting) {
    translateY = -100;
    translateZ = 100;
    scale = 0.8;
    opacity = 0;
  }
  
  const cardStyle = {
    transform: `translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale})`,
    opacity,
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    willChange: 'transform, opacity',
  };

  return (
    <div 
      className="absolute inset-x-0 top-1/2 transform -translate-y-1/2"
      style={{ 
        ...cardStyle,
        zIndex: index === Math.floor(scrollProgress * 4) ? 20 : 10 - index
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-4xl mx-auto px-8">
        <div className={`relative bg-card p-8 rounded-xl border transition-all duration-300 transform group cursor-pointer shadow-xl ${
          isActive 
            ? 'border-cyan-400/60 shadow-2xl shadow-cyan-400/20' 
            : 'border-purple-500/30 shadow-lg shadow-purple-500/10'
        } ${isHovered ? 'border-purple-400/80 shadow-2xl shadow-purple-500/30' : ''}`}>
          
          {/* Animated bottom border */}
          <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 transition-all duration-800 ${
            isActive || isHovered ? 'w-full' : 'w-0'
          }`} />
          
          <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
            <div className="flex-1">
              <h3 className={`text-2xl md:text-3xl font-bold mb-2 transition-all duration-300 ${
                isActive || isHovered 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400' 
                  : 'text-white'
              }`}>
                {exp.title}
              </h3>
              <p className={`text-xl mb-3 transition-all duration-300 ${
                isActive || isHovered ? 'text-cyan-300' : 'text-cyan-400'
              }`}>
                {exp.company}
              </p>
              <p className={`text-lg mb-4 leading-relaxed transition-all duration-300 ${
                isActive || isHovered ? 'text-gray-200' : 'text-gray-300'
              }`}>
                {exp.description}
              </p>
            </div>
            <div className="text-right">
              <span className={`px-6 py-3 bg-purple-600/20 rounded-xl text-base font-medium transition-all duration-300 ${
                isActive || isHovered 
                  ? 'bg-purple-500/40 text-purple-200 scale-105 shadow-lg shadow-purple-500/30' 
                  : 'text-purple-300'
              }`}>
                {exp.period}
              </span>
            </div>
          </div>
          
          {/* Arrow indicator */}
          <div className={`absolute top-1/2 right-8 transform -translate-y-1/2 transition-all duration-300 ${
            isHovered || isActive ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
          }`}>
            <ExternalLink className="w-6 h-6 text-cyan-400" />
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
      className="relative min-h-[400vh]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Section title - positioned at top with no gap to cards */}
      <div className="sticky top-20 z-30 text-center py-8">
        <h2 className="text-4xl md:text-6xl font-bold text-gradient">
          Professional Journey
        </h2>
        <p className="text-gray-400 mt-4 text-lg">
          Scroll to explore my career progression
        </p>
      </div>
      
      {/* Card Stack Container - positioned directly below title */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative w-full h-full">
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