import { PublicSiteShell } from '@/components/public-site-shell';

const companyHighlights = [
  '捷運生活圈套房與分租住宅營運',
  '租客媒合、簽約、入住與續租流程整合',
  '清潔、修繕、巡檢與帳務協同管理',
];

export default function AboutPage() {
  return (
    <PublicSiteShell>
      <section className="marketing-hero">
        <p className="eyebrow">公司簡介</p>
        <h1>把租屋營運流程做成一套真正能長的系統</h1>
        <p className="hero-copy">
          Taipei Metro House 聚焦在捷運周邊住宅的營運管理，從房源包裝、租客服務到維修派工，
          目標是把日常營運拉回可預測、可追蹤、可持續擴充的節奏。
        </p>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>我們在做什麼</h2>
          <p>這裡先開放給任何人瀏覽，不需要登入就能看公司定位與服務方向。</p>
        </div>
        <div className="mini-grid">
          {companyHighlights.map((item) => (
            <article key={item} className="mini-card">
              <strong>{item}</strong>
              <p>第一版先把對外介紹與內部管理區分清楚，避免訪客被後台資訊干擾。</p>
            </article>
          ))}
        </div>
      </section>
    </PublicSiteShell>
  );
}
