import React from 'react';

type Milestone = {
  year: string;
  degree: string;
  institution: string;
  detail: string;
  status: 'Current' | 'Completed';
};

const milestones: Milestone[] = [
  {
    year: '2022 — Present',
    degree: 'BSc (Hons) Business Information Technology',
    institution: 'London Metropolitan University',
    detail: 'Systems, software engineering and data-driven business solutions.',
    status: 'Current',
  },
  {
    year: '2020 — 2022',
    degree: '+2 Science (NEB)',
    institution: 'Higher Secondary, Pokhara',
    detail: 'Physics, Mathematics and Computer Science foundation.',
    status: 'Completed',
  },
  {
    year: '2018',
    degree: 'SEE — Secondary Education',
    institution: 'Pokhara, Nepal',
    detail: 'First programming exposure and self-taught digital design.',
    status: 'Completed',
  },
];

const EducationCard: React.FC = () => (
  <div className="panel p-6 md:p-8">
    <h3 className="text-xl font-semibold text-foreground">Education</h3>

    <ol className="relative mt-6 border-l border-border pl-6">
      {milestones.map((m) => (
        <li key={m.year} className="relative pb-8 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background"
          />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {m.year}
            </span>
            <span
              className={`rounded-md border px-2 py-0.5 text-[11px] ${
                m.status === 'Current'
                  ? 'border-primary/40 bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground'
              }`}
            >
              {m.status}
            </span>
          </div>
          <h4 className="mt-2 text-base font-semibold leading-snug text-foreground md:text-lg">
            {m.degree}
          </h4>
          <p className="mt-1 text-sm font-medium text-primary">{m.institution}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.detail}</p>
        </li>
      ))}
    </ol>
  </div>
);

export default React.memo(EducationCard);
