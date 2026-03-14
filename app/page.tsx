import Link from 'next/link';

import { MetricCard } from '@/components/metric-card';
import { ModuleCard } from '@/components/module-card';
import { PublicSiteShell } from '@/components/public-site-shell';
import { dashboardSummary, modules } from '@/lib/mock-data';

export default function HomePage() {
  return (
    <PublicSiteShell>
      <section className="marketing-hero">
        <p className="eyebrow">公開首頁</p>
        <h1>對外展示與內部管理，從這版開始切開</h1>
        <p className="hero-copy">
          公司簡介、房型介紹這些內容不需要登入就能看；房源、工單、租約與設定等管理功能，
          則改成登入後才進入內部系統。
        </p>
        <div className="hero-actions">
          <Link className="primary-button" href="/about">
            看公司簡介
          </Link>
          <Link className="ghost-button" href="/login">
            進入登入畫面
          </Link>
        </div>
      </section>

      <section className="hero">
        <div className="hero-panel">
          <h2>目前第一波目標</h2>
          <div className="metric-grid">
            {dashboardSummary.map((item) => (
              <MetricCard key={item.label} metric={item} />
            ))}
          </div>
        </div>
        <div className="hero-panel">
          <h2>公開站先放什麼</h2>
          <div className="check-list">
            <p>1. 公司簡介</p>
            <p>2. 房型介紹</p>
            <p>3. 登入與建立帳號入口</p>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>登入後的內部模組</h2>
          <p>下面這些頁面改成登入後才開放。</p>
        </div>
        <div className="module-grid">
          {modules.map((module) => (
            <ModuleCard key={module.slug} module={module} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>這版新增的角色規則</h2>
          <p>先把你要求的權限結構實作進去。</p>
        </div>
        <div className="mini-grid">
          <article className="mini-card">
            <strong>公開頁免登入</strong>
            <p>公司簡介、房型介紹等對外展示內容直接開放瀏覽。</p>
          </article>
          <article className="mini-card">
            <strong>最高權限帳號</strong>
            <p>`metroclaw168@gmail.com` 為目前最高權限，未來可改設定來源。</p>
          </article>
          <article className="mini-card">
            <strong>登入 / 註冊入口</strong>
            <p>已加入建立帳號與登入畫面，先用前端 mock 流程驗證體驗。</p>
          </article>
        </div>
      </section>
    </PublicSiteShell>
  );
}
