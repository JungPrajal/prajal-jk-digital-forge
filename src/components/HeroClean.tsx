import React from 'react';

/**
 * Minimal, high-contrast hero with a single subtle AI-inspired visual.
 * Decorative layers are aria-hidden and pointer-events-none.
 */
const HeroClean: React.FC = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
    >
      {/* Decorative: neural grid + soft glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hero-visual" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary sm:text-sm">
            AI/ML Developer &amp; Digital Product Designer
          </p>

          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Prajal Jung Kunwar
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            I build intelligent digital products, computer-vision experiences,
            mobile applications, and thoughtful user interfaces.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#projects" className="btn-primary">
              View Selected Work
            </a>
            <a href="#contact" className="btn-ghost">
              Let&rsquo;s Connect
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(HeroClean);
