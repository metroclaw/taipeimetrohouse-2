import Link from 'next/link';

import type { ModuleDefinition } from '@/types/domain';

export function ModuleCard({ module }: { module: ModuleDefinition }) {
  return (
    <article className="module-card">
      <div className="module-card-header">
        <div>
          <p className="module-slug">{module.slug}</p>
          <h3>{module.title}</h3>
        </div>
        <span className={`badge ${module.status === 'mvp' ? 'mvp' : 'later'}`}>
          {module.status === 'mvp' ? 'MVP' : 'Later'}
        </span>
      </div>
      <p>{module.description}</p>
      <ul>
        {module.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <Link className="text-link" href={module.href}>
        打開模組
      </Link>
    </article>
  );
}
