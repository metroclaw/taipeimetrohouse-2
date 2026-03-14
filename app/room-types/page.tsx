import { PublicSiteShell } from '@/components/public-site-shell';

const roomTypes = [
  {
    title: '經典單人套房',
    summary: '適合單人長租，生活機能與通勤效率優先。',
    features: ['獨立衛浴', '標配冷氣與書桌', '月租帶看效率最高'],
  },
  {
    title: '雙人共享房',
    summary: '給室友或情侶共住的空間配置，兼顧隱私與公共區域。',
    features: ['雙床或一大床彈性配置', '公共收納較完整', '適合高移動族群'],
  },
  {
    title: '精裝商務房',
    summary: '面向短中期商務租客，強調入住即用與乾淨感。',
    features: ['全配家具', '高頻清潔巡檢', '可搭配代管與延租'],
  },
];

export default function RoomTypesPage() {
  return (
    <PublicSiteShell>
      <section className="marketing-hero">
        <p className="eyebrow">房型介紹</p>
        <h1>先把房型說清楚，再把後台資料管清楚</h1>
        <p className="hero-copy">
          這一區是公開內容，任何人都能先了解房型方向；真正的房源、租客與任務資料還是留在登入後的內部區。
        </p>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>房型範例</h2>
          <p>目前先放展示型內容，之後可再接正式房源資料。</p>
        </div>
        <div className="module-grid">
          {roomTypes.map((roomType) => (
            <article key={roomType.title} className="module-card">
              <div>
                <p className="module-slug">Room Type</p>
                <h3>{roomType.title}</h3>
              </div>
              <p>{roomType.summary}</p>
              <ul>
                {roomType.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </PublicSiteShell>
  );
}
