import Link from 'next/link';

import { ModuleCard } from '@/components/module-card';
import { PublicSiteShell } from '@/components/public-site-shell';
import { modules } from '@/lib/mock-data';

export default function HomePage() {
  const mvpModules = modules.filter((module) => module.status === 'mvp');
  const upcomingModules = modules.filter((module) => module.status !== 'mvp');

  return (
    <PublicSiteShell>
      <section className="marketing-hero">
        <p className="eyebrow">跨房源 / 租約 / 任務的營運主控台</p>
        <h1>把房源、租約、工單串起來的核心殼</h1>
        <p className="hero-copy">
          README 裡提到的所有路由都已經在這裡就位：公開頁先說清楚定位，登入後則回到內部模組，
          讓房源、任務與租約流程共享同一套語言。下方的模組卡片就是最快速的入口。
        </p>
        <div className="hero-actions">
          <Link className="primary-button" href="/login">
            登入內部系統
          </Link>
          <Link className="ghost-button" href="/register">
            建立帳號
          </Link>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>目前 MVP 模組</h2>
          <p>直接連到 README 中列出的 /dashboard /properties /tasks /leases /settings 等路由。</p>
        </div>
        <div className="module-grid">
          {mvpModules.map((module) => (
            <ModuleCard key={module.slug} module={module} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>接下來要上的模組</h2>
          <p>還在規劃中的頁面也先曝光路由，方便日後直接串接與測試。</p>
        </div>
        <div className="module-grid">
          {upcomingModules.map((module) => (
            <ModuleCard key={module.slug} module={module} />
          ))}
        </div>
      </section>
    </PublicSiteShell>
  );
}
