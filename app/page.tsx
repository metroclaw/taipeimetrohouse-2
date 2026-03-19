import { PublicSiteShell } from '@/components/public-site-shell';
import { MetricCard } from '@/components/metric-card';
import { ModuleCard } from '@/components/module-card';
import { PageHeader } from '@/components/page-header';
import { SectionPanel } from '@/components/section-panel';
import { dashboardSummary, modules, operationsMetrics } from '@/lib/mock-data';

export default function HomePage() {
  const internalModules = modules.filter((module) =>
    ['dashboard', 'properties', 'tasks', 'leases'].includes(module.slug),
  );

  return (
    <PublicSiteShell>
      <PageHeader
        eyebrow="Taipei Metro House 2"
        title="先把物業營運流程拉直，再談自動化"
        description="這一版專案先重整房源、租約、工單與提醒邏輯，讓日常營運在同一個節奏裡看得懂、接得住。"
      />

      <SectionPanel title="目前營運快照" description="先用假資料把節奏感做出來，後續再接正式 Firebase 資料層。">
        <div className="metric-grid">
          {dashboardSummary.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>
      </SectionPanel>

      <SectionPanel
        title="核心模組入口"
        description="登入後會進到內部營運區，從儀表板延伸到房源、工單與租約提醒。"
      >
        <div className="module-grid">
          {internalModules.map((module) => (
            <ModuleCard key={module.slug} module={module} />
          ))}
        </div>
      </SectionPanel>

      <SectionPanel title="今天先處理哪些事？" description="把工單與租約節奏拉在一起看，避免漏掉逾期與到期。">
        <div className="metric-grid">
          {operationsMetrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>
      </SectionPanel>
    </PublicSiteShell>
  );
}
