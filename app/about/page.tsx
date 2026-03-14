import { PublicSiteShell } from '@/components/public-site-shell';

const serviceItems = [
  '台北市、新北市物業管理',
  '住宿清潔管理服務',
  '代尋物件與投資顧問',
  '設計規劃施工',
  '建築法規諮詢',
  '房地產諮詢、稅務規劃、銀行融資',
];

const advantages = [
  '積極打造智慧家居，結合數位電表、語音聲控與雲端管理。',
  '以人為本、體貼用心，讓設計與管理同時服務居住體驗。',
  '從出租、維護到營運管理，盡量把瑣碎流程整合成一致服務。',
];

export default function AboutPage() {
  return (
    <PublicSiteShell>
      <section className="legacy-hero">
        <video
          autoPlay
          className="legacy-hero-video"
          loop
          muted
          playsInline
          src="/legacy/taipei101.mp4"
        />
        <div className="legacy-hero-copy">
          <img alt="Metro House logo" className="legacy-logo" src="/legacy/logo.jpg" />
          <p className="eyebrow">公司簡介</p>
          <h1>美好的寓所，美好的遇見</h1>
          <p className="hero-copy">
            流轉於新城市的車水馬龍，感受黑夜與白天；商旅途中，也能享受家的舒適。
            大都會美寓希望把活力、溫暖、情感與記憶都收進居住體驗裡，讓人在台北找到可安頓的生活節奏。
          </p>
          <p className="hero-copy">
            大都會物業管理顧問公司延續舊版首頁的核心理念，秉持以人為本、體貼用心的精神，
            將設計的靈魂注入居家環境，為租客與屋主量身整理出更穩定的居住與營運方式。
          </p>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>服務項目</h2>
          <p>這裡直接沿用舊版對外網站的核心內容，先把對外定位延續下來。</p>
        </div>
        <div className="mini-grid">
          {serviceItems.map((item) => (
            <article key={item} className="mini-card">
              <strong>{item}</strong>
              <p>作為公開頁內容，不需要登入就可以先了解服務範圍。</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>競爭優勢</h2>
          <p>把舊版首頁的「智慧家居 + 全方位服務」主軸整理成新版可延伸的區塊。</p>
        </div>
        <div className="split-grid">
          <div className="callout">
            <h2>核心理念</h2>
            <p>
              我們希望讓居住不只是交屋與收租，而是把入住、清潔、維護、續租與日常服務整合成一段完整體驗。
            </p>
            <p>
              對外網站先把品牌、服務與房型說清楚；內部系統則把房源、租約、任務、帳務收回到可管理的流程。
            </p>
          </div>
          <div className="table-list">
            {advantages.map((item) => (
              <article key={item} className="table-row">
                <div>
                  <strong>{item}</strong>
                  <p>延續舊版首頁的品牌語氣與服務定位。</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>團隊與聯絡</h2>
          <p>保留舊版「團隊成員 / 聯絡方式」的公開資訊感覺。</p>
        </div>
        <div className="split-grid">
          <div className="legacy-team-card">
            <img alt="Team portrait" src="/legacy/pic03.jpg" />
            <div>
              <p className="module-slug">Team</p>
              <h3>以人為本，體貼用心</h3>
              <p className="hero-copy">
                團隊會持續把房屋管理、清潔調度、租務服務與現場維護做得更細，讓住戶與合作對象都能感受到穩定與信任。
              </p>
            </div>
          </div>

          <div className="legacy-contact-card">
            <img alt="Metro House space" src="/legacy/pic01.jpg" />
            <div className="check-list">
              <p>聯絡信箱：metrohousetaipei@gmail.com</p>
              <p>Facebook：Metrohousetaipei</p>
              <p>Line：大都會物業客服</p>
              <p>這些資訊先留在公開區，讓訪客能先找到你們。</p>
            </div>
          </div>
        </div>
      </section>
    </PublicSiteShell>
  );
}
