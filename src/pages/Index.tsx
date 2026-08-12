import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import HeroClean from '../components/HeroClean';
import AboutPanel from '../components/AboutPanel';
import SkillsGrid from '../components/SkillsGrid';
import ProjectCard, { type Project } from '../components/ProjectCard';
import SystemDiagnosticsCard from '../components/SystemDiagnosticsCard';

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

const Navigation = ({ activeSection }: { activeSection: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-xl">
      <nav aria-label="Main navigation" className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between md:h-20">
          <a
            href="#home"
            className="rounded-md text-base font-semibold tracking-tight text-foreground"
          >
            Prajal Jung Kunwar
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={activeSection === s.id ? 'true' : undefined}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    activeSection === s.id
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsOpen((v) => !v)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border text-foreground md:hidden"
          >
            <span aria-hidden="true" className="text-sm font-medium">
              {isOpen ? 'Close' : 'Menu'}
            </span>
          </button>
        </div>

        {isOpen && (
          <ul id="mobile-nav" className="border-t border-border py-3 md:hidden">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`block min-h-11 rounded-md px-3 py-3 text-base font-medium ${
                    activeSection === s.id
                      ? 'bg-secondary text-primary'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
};

const experiences = [
  {
    title: 'Product/Graphics Design and Video Editor',
    company: 'Jude Fashion Industry Nepal',
    period: 'March 2025 — Present',
    description:
      'Creating engaging product designs and social media content including reels and promotional videos.',
  },
  {
    title: 'UI/UX Web Development, SEO, Graphics Design',
    company: 'Fast Track Repair Service',
    period: 'January 2025',
    description:
      'Developed the business website, implemented SEO strategies, and created social media designs.',
  },
  {
    title: 'Product/Graphics Design',
    company: 'Aikyam Nepal',
    period: 'December 2024 — February 2025',
    description: 'Designed product graphics and visual content for marketing campaigns.',
  },
  {
    title: 'UI/UX Design Intern',
    company: 'Xdezo Academy',
    period: 'Internship',
    description:
      'Developed an e-learning mobile app using Flutter/Dart with Node.js backend integration.',
  },
  {
    title: 'Website Development',
    company: 'Lakecity Coffee',
    period: 'Project',
    description:
      'Designed and developed the official Lakecity Coffee website with responsive UI, performance and SEO optimisations.',
  },
];

const projects: Project[] = [
  {
    title: 'AI Image & Face Recognition',
    description:
      'Python computer-vision project implementing image detection and facial recognition algorithms.',
    tech: ['Python', 'OpenCV', 'Machine Learning'],
    type: 'AI / ML',
  },
  {
    title: 'E-learning Mobile App',
    description:
      'Internship project with a full learning management system, built with a Flutter frontend and Node.js backend.',
    tech: ['Flutter', 'Dart', 'Node.js', 'REST API'],
    type: 'Full Stack',
  },
  {
    title: 'E-commerce Mobile App',
    description:
      'College project built with Flutter/Dart, covering product browsing, cart and checkout flows.',
    tech: ['Flutter', 'Dart', 'UI/UX'],
    type: 'Mobile App',
  },
  {
    title: 'E-commerce Clothing App',
    description:
      'Java clothing-store application with inventory management and user authentication.',
    tech: ['Java', 'OOP'],
    type: 'Desktop App',
  },
  {
    title: 'Fast Track Repair Service Website',
    description:
      'Business website with SEO optimisation, responsive design and an integrated booking flow.',
    tech: ['Web Design', 'SEO'],
    type: 'Web Development',
  },
];

const SectionHeading = ({ children, eyebrow }: { children: React.ReactNode; eyebrow: string }) => (
  <div className="mb-10 max-w-2xl md:mb-14">
    <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
    <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
      {children}
    </h2>
  </div>
);

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5] }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navigation activeSection={activeSection} />

      <main id="main">
        <HeroClean />

        <section id="about" className="scroll-mt-24 border-t border-border/60 py-20 md:py-28">
          <div className="container mx-auto px-6">
            <SectionHeading eyebrow="About">Who I am</SectionHeading>
            <div className="grid gap-6 lg:grid-cols-2">
              <AboutPanel />
              <SystemDiagnosticsCard />
            </div>
          </div>
        </section>

        <section id="experience" className="scroll-mt-24 border-t border-border/60 py-20 md:py-28">
          <div className="container mx-auto px-6">
            <SectionHeading eyebrow="Experience">Where I&rsquo;ve worked</SectionHeading>
            <ol className="space-y-4">
              {experiences.map((exp) => (
                <li key={exp.title} className="panel panel-interactive p-6">
                  <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                      <p className="mt-1 text-sm font-medium text-primary">{exp.company}</p>
                    </div>
                    <p className="text-sm text-muted-foreground md:text-right">{exp.period}</p>
                  </div>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    {exp.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="skills" className="scroll-mt-24 border-t border-border/60 py-20 md:py-28">
          <div className="container mx-auto px-6">
            <SectionHeading eyebrow="Skills">What I work with</SectionHeading>
            <SkillsGrid />
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 border-t border-border/60 py-20 md:py-28">
          <div className="container mx-auto px-6">
            <SectionHeading eyebrow="Selected Work">Projects</SectionHeading>
            <div className="grid gap-5 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
            <div className="mt-10">
              <a
                href="https://github.com/JungPrajal"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Github aria-hidden="true" className="h-5 w-5" />
                View all on GitHub
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 border-t border-border/60 py-20 md:py-28">
          <div className="container mx-auto px-6">
            <SectionHeading eyebrow="Contact">Let&rsquo;s connect</SectionHeading>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
              Open to work on AI/ML solutions, mobile applications and product design.
              The fastest way to reach me is email.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              <a href="tel:+9779825102356" className="panel panel-interactive flex items-center gap-3 p-6">
                <Phone aria-hidden="true" className="h-5 w-5 text-primary" />
                <span>
                  <span className="block text-xs text-muted-foreground">Phone</span>
                  <span className="text-sm font-medium text-foreground">+977 9825102356</span>
                </span>
              </a>
              <a href="mailto:prajal@gmail.com" className="panel panel-interactive flex items-center gap-3 p-6">
                <Mail aria-hidden="true" className="h-5 w-5 text-primary" />
                <span>
                  <span className="block text-xs text-muted-foreground">Email</span>
                  <span className="text-sm font-medium text-foreground">prajal@gmail.com</span>
                </span>
              </a>
              <div className="panel flex items-center gap-3 p-6">
                <MapPin aria-hidden="true" className="h-5 w-5 text-primary" />
                <span>
                  <span className="block text-xs text-muted-foreground">Location</span>
                  <span className="text-sm font-medium text-foreground">Pokhara, Nepal</span>
                </span>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <a
                href="https://github.com/JungPrajal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="icon-link"
              >
                <Github aria-hidden="true" className="h-5 w-5" />
              </a>
              <a
                href="mailto:prajal@gmail.com"
                aria-label="Send an email"
                className="icon-link"
              >
                <Mail aria-hidden="true" className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-10">
        <div className="container mx-auto px-6">
          <p className="text-sm text-muted-foreground">
            © 2026 Prajal Jung Kunwar. AI/ML Developer &amp; Digital Product Designer.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
