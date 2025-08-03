
import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Github, ExternalLink, Code, Palette, Database, Smartphone, Globe, Brain, Server, Terminal, Menu, X } from 'lucide-react';
import FlowingBackground from '../components/FlowingBackground';
import HeroSection from '../components/HeroSection';


const Navigation = ({ activeSection, setActiveSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'education', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Work' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Better mobile scroll handling
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-purple-500/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src="/lovable-uploads/9ff0586a-8ee7-454c-9fe3-00ce1b180ee8.png" 
                alt="JK Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="text-xl font-semibold text-white hidden sm:block">Prajal</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-4 py-2 text-lg font-medium transition-all duration-300 relative group ${
                  activeSection === section.id
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {section.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 transition-transform duration-300 ${
                  activeSection === section.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 text-white hover:text-cyan-400 transition-colors bg-gray-800/80 rounded-lg border border-purple-500/30"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-purple-500/30 animate-fade-in shadow-xl">
            <div className="px-6 py-4 space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`block w-full text-left px-4 py-3 text-lg font-medium transition-all duration-300 rounded-lg ${
                    activeSection === section.id
                      ? 'text-cyan-400 bg-purple-500/30'
                      : 'text-gray-200 hover:text-white hover:bg-purple-500/20'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const HomeSection = () => {
  return (
    <section id="home" className="relative">
      <HeroSection />
    </section>
  );
};

const useScrollAnimation = (): [React.RefObject<HTMLDivElement>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return [ref, isVisible];
};

const EducationSection = () => {
  const [cardRef, isCardVisible] = useScrollAnimation();

  return (
    <section id="education" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">
          Education
        </h2>
        <div className="max-w-4xl mx-auto">
          <div 
            ref={cardRef}
            className={`glass p-8 rounded-2xl border-2 transition-all duration-1000 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/30 hover:border-cyan-400/80 group cursor-pointer relative overflow-hidden ${
              isCardVisible 
                ? 'opacity-100 scale-100 translate-y-0 border-cyan-400/50' 
                : 'opacity-0 scale-95 translate-y-10 border-purple-500/30'
            }`}
          >
            {/* Floating particles effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/60 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-cyan-300/60 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
            </div>
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-start gap-6">
              <div className={`w-16 h-16 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl flex items-center justify-center transition-all duration-700 transform ${
                isCardVisible ? 'rotate-0 scale-100' : 'rotate-12 scale-90'
              }`}>
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className={`text-2xl font-bold text-purple-300 mb-2 transition-all duration-700 transform ${
                  isCardVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                }`} style={{ transitionDelay: '0.2s' }}>
                  BSc (Hons) in Business Information Technology
                </h3>
                <p className={`text-xl text-cyan-400 mb-2 transition-all duration-700 transform ${
                  isCardVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                }`} style={{ transitionDelay: '0.3s' }}>
                  London Metropolitan University
                </p>
                <p className={`text-gray-300 mb-4 transition-all duration-700 transform ${
                  isCardVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                }`} style={{ transitionDelay: '0.4s' }}>
                  Percentage: 54.22%
                </p>
                <p className={`text-gray-400 transition-all duration-700 transform ${
                  isCardVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                }`} style={{ transitionDelay: '0.5s' }}>
                  Comprehensive study of business processes, information systems, 
                  and technology integration in modern enterprises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceCard = ({ exp, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`relative glass p-6 rounded-xl border transition-all duration-700 transform group cursor-pointer overflow-hidden ${
        isVisible 
          ? 'opacity-100 scale-100 translate-y-0 border-cyan-400/50 shadow-lg shadow-cyan-400/20' 
          : 'opacity-0 scale-90 translate-y-10 border-purple-500/30'
      } ${isHovered ? 'translate-y-[-8px] shadow-2xl shadow-purple-500/30 border-purple-400/80' : ''}`}
      style={{ transitionDelay: `${index * 0.2}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br from-purple-600/10 to-cyan-600/10 transition-opacity duration-500 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
      
      {/* Sliding bottom border */}
      <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-500 ${
        isHovered ? 'w-full' : 'w-0'
      }`} />
      
      <div className="flex flex-col md:flex-row md:items-center gap-4 relative z-10">
        <div className="flex-1">
          <h3 className={`text-xl font-bold mb-1 transition-all duration-700 transform ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
          } ${isHovered ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400' : 'text-purple-300'}`} 
          style={{ transitionDelay: `${index * 0.2 + 0.1}s` }}>
            {exp.title}
          </h3>
          <p className={`text-lg mb-2 transition-all duration-700 transform ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
          } ${isHovered ? 'text-cyan-300' : 'text-cyan-400'}`} 
          style={{ transitionDelay: `${index * 0.2 + 0.2}s` }}>
            {exp.company}
          </p>
          <p className={`mb-3 transition-all duration-700 transform ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
          } ${isHovered ? 'text-gray-200' : 'text-gray-300'}`} 
          style={{ transitionDelay: `${index * 0.2 + 0.3}s` }}>
            {exp.description}
          </p>
        </div>
        <div className="text-right">
          <span className={`px-4 py-2 bg-purple-600/20 rounded-lg text-sm transition-all duration-700 transform ${
            isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-4 opacity-0 scale-90'
          } ${isHovered ? 'bg-purple-500/30 text-purple-200 scale-105' : 'text-purple-300'}`} 
          style={{ transitionDelay: `${index * 0.2 + 0.4}s` }}>
            {exp.period}
          </span>
        </div>
      </div>
      
      {/* Arrow reveal on hover */}
      <div className={`absolute top-1/2 right-6 transform -translate-y-1/2 transition-all duration-300 ${
        isHovered ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
      }`}>
        <ExternalLink className="w-5 h-5 text-cyan-400" />
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  const [sectionRef, isSectionVisible] = useScrollAnimation();
  
  const experiences = [
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

  return (
    <section id="experience" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">
          Experience
        </h2>
        <div className="max-w-6xl mx-auto" ref={sectionRef}>
          <div className="grid gap-8">
            {experiences.map((exp, index) => (
              <ExperienceCard 
                key={index} 
                exp={exp} 
                index={index} 
                isVisible={isSectionVisible} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Backend Development", 
      icon: <Server className="w-6 h-6" />,
      skills: ["PHP/Laravel", "Python/Django"],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "AI & Machine Learning",
      icon: <Brain className="w-6 h-6" />,
      skills: ["Python ML/AI", "TensorFlow", "Computer Vision", "NLP", "Data Science"],
      color: "from-orange-500 to-red-500"
    },
    {
      title: "DevOps & Tools",
      icon: <Terminal className="w-6 h-6" />,
      skills: ["Git/GitHub", "VS Code"],
      color: "from-teal-500 to-blue-500"
    },
    {
      title: "Design & Creative",
      icon: <Palette className="w-6 h-6" />,
      skills: ["UI/UX Design", "Figma", "Adobe Creative Suite", "Responsive Design", "Prototyping"],
      color: "from-pink-500 to-purple-500"
    }
  ];

  return (
    <section id="skills" className="min-h-screen flex items-center py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Skills Overview */}
          <div className="relative">
            <div className="glass p-8 rounded-2xl border border-cyan-400/30">
              <h3 className="text-2xl font-bold text-gradient mb-6">Development Philosophy</h3>
              <p className="text-gray-300 leading-relaxed">
                I believe in creating solutions that not only function flawlessly but also provide 
                exceptional user experiences. My approach combines cutting-edge technology with 
                practical problem-solving to deliver applications that make a real difference.
              </p>
            </div>
          </div>
          
          {/* Right side - Skills */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gradient">
              Tech Stack
            </h2>
            <p className="text-gray-300 mb-8">
              Experienced in modern technologies and frameworks for building scalable applications.
            </p>
            
            <div className="grid gap-4">
              {skillCategories.map((category, index) => (
                <div 
                  key={index} 
                  className="group glass p-4 rounded-lg border border-gray-700 hover:border-cyan-400/50 transition-all duration-500 animate-fade-in-up hover:translate-y-[-4px] hover:shadow-xl hover:shadow-cyan-400/20 relative overflow-hidden" 
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {/* Ripple effect background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color} transition-all duration-300 group-hover:rotate-3 group-hover:scale-110`}>
                      <div className="text-white">{category.icon}</div>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-all duration-300 group-hover:translate-x-2">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {category.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex} 
                        className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-600 hover:border-cyan-400/50 hover:bg-cyan-900/20 hover:text-cyan-300 hover:scale-105 transition-all duration-300 cursor-pointer"
                        style={{ transitionDelay: `${skillIndex * 50}ms` }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectsSection = () => {
  const projects = [
    {
      title: "E-commerce Mobile App",
      description: "College project developed using Flutter/Dart with modern UI/UX design and full shopping functionality.",
      tech: ["Flutter", "Dart", "Mobile Development"],
      type: "Mobile App"
    },
    {
      title: "E-learning Mobile App",
      description: "Internship project with comprehensive learning management system, built with Flutter frontend and Node.js backend.",
      tech: ["Flutter", "Dart", "Node.js", "Backend API"],
      type: "Full Stack"
    },
    {
      title: "E-commerce Clothing App",
      description: "Java-based clothing store application with inventory management and user authentication.",
      tech: ["Java", "Object-Oriented Programming"],
      type: "Desktop App"
    },
    {
      title: "AI Image & Face Recognition",
      description: "Python-based computer vision project implementing image detection and facial recognition algorithms.",
      tech: ["Python", "OpenCV", "Machine Learning", "AI"],
      type: "AI/ML"
    },
    {
      title: "Fast Track Repair Service Website",
      description: "Business website with SEO optimization, responsive design, and integrated booking system.",
      tech: ["Wix", "SEO", "Web Design", "Digital Marketing"],
      type: "Web Development"
    }
  ];

  return (
    <section id="projects" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">
          Featured Projects
        </h2>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="relative glass p-6 rounded-xl border border-purple-500/30 hover:border-cyan-400/50 transition-all duration-500 group animate-fade-in-up hover:translate-y-[-6px] hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer overflow-hidden" 
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Click ripple effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Border glow effect */}
                <div className="absolute inset-0 rounded-xl border border-transparent bg-gradient-to-r from-purple-500/50 to-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-purple-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
                      {project.title}
                    </h3>
                    <span className="px-3 py-1 bg-cyan-600/20 text-cyan-300 rounded-full text-sm group-hover:bg-cyan-500/30 group-hover:scale-105 transition-all duration-300">
                      {project.type}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm hover:bg-purple-500/30 hover:text-purple-200 hover:scale-105 transition-all duration-300 cursor-pointer"
                        style={{ transitionDelay: `${techIndex * 100}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Arrow reveal on hover */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ExternalLink className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a 
              href="https://github.com/JungPrajal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 glass px-8 py-4 rounded-xl border border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300 text-lg font-semibold text-purple-300 hover:text-cyan-300"
            >
              <Github className="w-6 h-6" />
              View All Projects on GitHub
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">
          Get In Touch
        </h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Ready to collaborate on your next project? Whether you need mobile app development, 
            web design, or AI/ML solutions, I'm here to bring your ideas to life with cutting-edge technology.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="glass p-6 rounded-xl border border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300">
              <Phone className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-purple-300 mb-2">Phone</h3>
              <p className="text-gray-300">+977 9825102356</p>
            </div>
            <div className="glass p-6 rounded-xl border border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300">
              <Mail className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-purple-300 mb-2">Email</h3>
              <p className="text-gray-300">prajal@gmail.com</p>
            </div>
            <div className="glass p-6 rounded-xl border border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300">
              <MapPin className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-purple-300 mb-2">Location</h3>
              <p className="text-gray-300">Pokhara, Nepal</p>
            </div>
          </div>
          <div className="flex justify-center gap-6">
            <a 
              href="https://github.com/JungPrajal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass p-4 rounded-xl border border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300 text-purple-300 hover:text-cyan-300"
            >
              <Github className="w-8 h-8" />
            </a>
            <a 
              href="mailto:prajal@gmail.com"
              className="glass p-4 rounded-xl border border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300 text-purple-300 hover:text-cyan-300"
            >
              <Mail className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'education', 'experience', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="relative min-h-screen">
      <FlowingBackground />
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="relative z-10">
        <HomeSection />
        <EducationSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      
      <footer className="relative z-10 glass border-t border-purple-500/30 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 Prajal Jung Kunwar. Crafted with passion and future tech.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
