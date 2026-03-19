'use client';

import Image from 'next/image';

import { PublicSiteShell } from '@/components/public-site-shell';

export default function AboutPage() {
  return (
    <PublicSiteShell>
      <section className="marketing-hero">
        <p className="eyebrow">關於我們</p>
        <h1>把物業營運當成一個長期產品在經營</h1>
        <p className="hero-copy">
          我們不是只做一個後台，而是把房源、租約、任務與提醒當成一套可演進的營運系統，先讓日常工作走順，再談自動化與 AI 協作。
        </p>
      </section>

      <section className="section-block about-grid">
        <div className="about-main">
          <Image
            src="/legacy/logo.jpg"
            alt="公司標誌"
            width={160}
            height={160}
            className="about-logo"
          />
          <p>
            本專案是台北都會物業管理系統的重製版，從舊系統實際營運痛點出發，重新整理房源、租約與任務流程，
            用較乾淨的前端架構與資料模型重新落地。
          </p>
          <p>
            目前階段重心放在「畫面與流程對不對」，
            因此先用 mock 資料與前端權限模型驗證介面，再逐步接上 Firebase 與正式權限。
          </p>
        </div>

        <div className="about-pillars">
          <article className="mini-card">
            <Image src="/legacy/icon-speed.svg" alt="高效" width={48} height={48} />
            <h3>高效</h3>
            <p>先把日常任務與提醒拉在同一個節奏裡，減少來回補資料與追進度。</p>
          </article>
          <article className="mini-card">
            <Image src="/legacy/icon-security.svg" alt="安全" width={48} height={48} />
            <h3>安全</h3>
            <p>正式版會導入 Firebase Auth 與權限分層，讓不同角色只看到該看的資訊。</p>
          </article>
          <article className="mini-card">
            <Image src="/legacy/icon-support.svg" alt="支援" width={48} height={48} />
            <h3>支援</h3>
            <p>以營運現場可維護為優先，讓交接與人員變動時不會完全打掉重練。</p>
          </article>
        </div>
      </section>
    </PublicSiteShell>
  );
}
