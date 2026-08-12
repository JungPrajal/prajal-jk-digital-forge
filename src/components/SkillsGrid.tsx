import React from 'react';

const GROUPS: { title: string; items: string[] }[] = [
  { title: 'AI & Machine Learning', items: ['Python', 'TensorFlow', 'Computer Vision', 'OpenCV', 'NLP'] },
  { title: 'Mobile', items: ['Flutter', 'Dart', 'Mobile Architecture'] },
  { title: 'Web & Backend', items: ['React', 'PHP / Laravel', 'Django', 'Node.js', 'REST APIs'] },
  { title: 'Design', items: ['UI/UX Design', 'Figma', 'Adobe Suite', 'Product Design'] },
  { title: 'Tools & Practices', items: ['Git / GitHub', 'SEO', 'Responsive Design', 'Performance'] },
];

const SkillsGrid: React.FC = () => (
  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {GROUPS.map((group) => (
      <div key={group.title} className="panel p-6">
        <h3 className="text-base font-semibold text-foreground">{group.title}</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {group.items.map((item) => (
            <li
              key={item}
              className="rounded-md border border-border bg-secondary/50 px-2.5 py-1 text-xs text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default React.memo(SkillsGrid);
