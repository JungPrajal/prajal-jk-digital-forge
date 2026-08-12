import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface Project {
  title: string;
  description: string;
  tech: string[];
  type: string;
  href?: string;
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
            {project.type}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-foreground">{project.title}</h3>
        </div>
        {project.href && (
          <ArrowUpRight aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-primary" />
        )}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <li
            key={t}
            className="rounded-md border border-border bg-secondary/50 px-2.5 py-1 text-xs text-muted-foreground"
          >
            {t}
          </li>
        ))}
      </ul>
    </>
  );

  if (project.href) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="panel panel-interactive block p-6"
      >
        {content}
      </a>
    );
  }

  return <article className="panel panel-interactive p-6">{content}</article>;
};

export default React.memo(ProjectCard);
