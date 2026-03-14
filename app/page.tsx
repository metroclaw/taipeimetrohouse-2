import { AppShell } from '@/components/app-shell';
import { MetricCard } from '@/components/metric-card';
import { ModuleCard } from '@/components/module-card';
import { PageHeader } from '@/components/page-header';
import { SectionPanel } from '@/components/section-panel';
import { dashboardSummary, leaseAlerts, modules, properties, workOrders } from '@/lib/mock-data';

export default function HomePage() {
  return (
    <AppShell>
      <section className="hero">
        <div className="hero-panel hero-copy-panel">
          <PageHeader
            eyebrow="重做，不重演舊技術債"
            title="taipeimetrohouse-2"
            description="新版先把物業營運的核心流程整理清楚，再把房源、工單、租約與帳務逐步接回。第一輪目標是做出能討論、能演示、能繼續長的 MVP。"
          />
        </div>
        <div className="hero-panel">
          <h2>第一波目標</h2>
          <div className="metric-grid">
            {dashboardSummary.map((item) => (
              <MetricCard key={item.label} metric={item} />
            ))}
          </div>
        </div>
      </section>

      <SectionPanel title="模組切分" description="先把未來會長大的地方分清楚，免得又變回巨型 HTML 墳場。">
        <div className="module-grid">
          {modules.map((module) => (
            <ModuleCard key={module.slug} module={module} />
          ))}
        </div>
      </SectionPanel>

      <div className="split-grid">
        <SectionPanel title="目前 mock 狀態" description="先用幾筆代表性資料測試資訊架構。">
          <div className="mini-grid">
            <article className="mini-card">
              <strong>{properties.length} 棟房源</strong>
              <p>已整理空房、到期與管理人資訊。</p>
            </article>
            <article className="mini-card">
              <strong>{workOrders.length} 筆工單</strong>
              <p>任務、修繕、清潔都收斂到同一個模型。</p>
            </article>
            <article className="mini-card">
              <strong>{leaseAlerts.length} 份租約提醒</strong>
              <p>先抓出近期到期，後續再補續約流程。</p>
            </article>
          </div>
        </SectionPanel>

        <SectionPanel title="接下來該做什麼" description="這一版的優先順序已經先定住。">
          <div className="check-list">
            <p>1. 補 `Property / Room / Lease / WorkOrder` 詳細型別與詳情頁。</p>
            <p>2. 把 mock data 抽成可替換的 server-side data layer。</p>
            <p>3. 先做房源與工單的 CRUD，再往租約與帳務延伸。</p>
          </div>
        </SectionPanel>
      </div>
    </AppShell>
  );
}
