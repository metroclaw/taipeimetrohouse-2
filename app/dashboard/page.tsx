import { AppShell } from '@/components/app-shell';
import { MetricCard } from '@/components/metric-card';
import { PageHeader } from '@/components/page-header';
import { SectionPanel } from '@/components/section-panel';
import { leaseAlerts, operationsMetrics, workOrders } from '@/lib/mock-data';

export default function DashboardPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Dashboard"
        title="先把營運風險集中到一頁"
        description="第一版不追求華麗圖表，先讓管理員打開頁面就知道哪裡要處理、哪裡快到期。"
      />

      <SectionPanel title="今日概況" description="用 mock data 先驗證資訊密度與區塊切法。">
        <div className="metric-grid">
          {operationsMetrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>
      </SectionPanel>

      <div className="split-grid">
        <SectionPanel title="待追工單" description="統一任務、修繕、清潔後，後面才好接權限與通知。">
          <div className="table-list">
            {workOrders.map((workOrder) => (
              <article key={workOrder.id} className="table-row">
                <div>
                  <strong>{workOrder.title}</strong>
                  <p>
                    {workOrder.propertyName} {workOrder.roomCode} / {workOrder.assignee}
                  </p>
                </div>
                <div className="table-meta">
                  <span className={`pill ${workOrder.type}`}>{workOrder.type}</span>
                  <span className={`pill status-${workOrder.status}`}>{workOrder.status}</span>
                  <span>{workOrder.dueDate}</span>
                </div>
              </article>
            ))}
          </div>
        </SectionPanel>

        <SectionPanel title="近期到期租約" description="先做 alert list，下一階段再長成租約日曆與續約流程。">
          <div className="table-list">
            {leaseAlerts.map((lease) => (
              <article key={lease.id} className="table-row">
                <div>
                  <strong>{lease.tenantName}</strong>
                  <p>
                    {lease.propertyName} {lease.roomCode}
                  </p>
                </div>
                <div className="table-meta">
                  <span>{lease.endDate}</span>
                  <span>NT$ {lease.monthlyRent.toLocaleString('zh-TW')}</span>
                </div>
              </article>
            ))}
          </div>
        </SectionPanel>
      </div>
    </AppShell>
  );
}
