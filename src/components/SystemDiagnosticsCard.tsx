import React, { useState } from 'react';

type Milestone = {
  year: string;
  degree: string;
  institution: string;
  detail: string;
  status: 'ACTIVE' | 'COMPLETE';
};

const milestones: Milestone[] = [
  {
    year: '2022 — Present',
    degree: 'BSc (Hons) Business Information Technology',
    institution: 'London Metropolitan University',
    detail: 'Systems, software engineering & data-driven business solutions.',
    status: 'ACTIVE',
  },
  {
    year: '2020 — 2022',
    degree: '+2 Science (NEB)',
    institution: 'Higher Secondary, Pokhara',
    detail: 'Physics, Mathematics, Computer Science foundation.',
    status: 'COMPLETE',
  },
  {
    year: '2018',
    degree: 'SEE — Secondary Education',
    institution: 'Pokhara, Nepal',
    detail: 'Initial programming exposure & digital design self-study.',
    status: 'COMPLETE',
  },
];

const SystemDiagnosticsCard: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className="diag-card relative rounded-2xl p-6 md:p-8 backdrop-blur-xl overflow-hidden"
      style={{
        background: 'rgba(10, 18, 10, 0.5)',
        border: '1px solid rgba(0, 255, 120, 0.2)',
        boxShadow:
          '0 0 0 1px rgba(0, 255, 120, 0.05) inset, 0 20px 60px -20px rgba(0, 255, 120, 0.25)',
      }}
    >
      {/* faint grid backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,255,120,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,120,0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Header */}
      <div className="relative flex items-center justify-between mb-6 pb-3 border-b border-[rgba(0,255,120,0.15)]">
        <div className="flex items-center gap-2">
          <span className="diag-led-static" />
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#7CFFB2]">
            sys.diagnostics // education.log
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#7CFFB2]/60">
          uptime: stable
        </span>
      </div>

      {/* Timeline */}
      <ol className="relative pl-8">
        {/* vertical rail */}
        <span
          className="absolute left-[10px] top-1 bottom-1 w-px"
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgba(0,255,120,0.35), transparent)',
          }}
        />
        {milestones.map((m, i) => {
          const active = hovered === i;
          return (
            <li
              key={m.year}
              className="relative pb-8 last:pb-0 group"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* branch tick */}
              <span
                aria-hidden
                className="absolute left-[10px] top-2 h-px w-4"
                style={{ background: 'rgba(0,255,120,0.35)' }}
              />
              {/* node */}
              <span
                className={`diag-node absolute left-[4px] top-[3px] w-3 h-3 rounded-full ${
                  active ? 'diag-node-active' : ''
                }`}
              />
              <div className="ml-4">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <span className="font-mono text-[10px] tracking-widest text-[#7CFFB2]/80">
                    {m.year}
                  </span>
                  <span
                    className={`font-mono text-[9px] px-2 py-0.5 rounded border ${
                      m.status === 'ACTIVE'
                        ? 'text-[#7CFFB2] border-[#7CFFB2]/40 bg-[#00ff78]/5'
                        : 'text-[#7CFFB2]/60 border-[#7CFFB2]/20'
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
                <h4 className="font-sans text-base md:text-lg font-semibold text-foreground leading-snug">
                  {m.degree}
                </h4>
                <p className="font-sans text-sm text-[#7CFFB2]/80 mb-1">
                  {m.institution}
                </p>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  {m.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Footer */}
      <div className="relative mt-6 pt-3 border-t border-[rgba(0,255,120,0.15)] flex items-center justify-between font-mono text-[10px] text-[#7CFFB2]/60">
        <span>{'>'} all systems nominal</span>
        <span>checksum: 0xA7F3</span>
      </div>
    </div>
  );
};

export default SystemDiagnosticsCard;