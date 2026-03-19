'use client';

import Link from 'next/link';

import { AppShell } from '@/components/app-shell';
import { MetricCard } from '@/components/metric-card';
import { PageHeader } from '@/components/page-header';
import { ProtectedPage } from '@/components/protected-page';
import { SectionPanel } from '@/components/section-panel';
import { useAlertContext } from '@/context/AlertContext';
import { dashboardSummary, operationsMetrics } from '@/lib/mock-data';

export default function DashboardPage() {
  const { workOrders, leaseAlerts } = useAlertContext();

  const pendingWorkOrders = workOrders.filter((order) => order.status === 'pending').length;
  const inProgressWorkOrders = workOrders.filter((order) => order.status === 'inProgress').length;
  const expiringLeases = leaseAlerts.filter((alert) => alert.status === 'expiringSoon').length;
  const expiredLeases = leaseAlerts.filter((alert) => alert.status === 'expired').length;

  return (
    <ProtectedPage>
      <AppShell>
        <PageHeader
          eyebrow="Dashboard"
          title="提醒總覽"
          description="把 README 列出的核心模組串在一起：登入後第一個落點就是這個儀表板，後續再延伸到任務、房源與租約。"
        />

        <SectionPanel title="營運指標" description="靜態 mock 數字，主打資訊設計與資料欄位布局。">
          <div className="metric-grid">
            {dashboardSummary.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </div>
        </SectionPanel>

        <SectionPanel title="每日節奏" description="第二組指標示意，利於在 README 指定的維度上擴充。">
          <div className="metric-grid">
            {operationsMetrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </div>
        </SectionPanel>

        <SectionPanel title="即時提醒" description="即時數字來自 AlertContext，方便直接跳轉到 Task 與 Lease 頁面。">
          <div className="mini-grid">
            <article className="mini-card">
              <strong>待處理工單</strong>
              <p>{pendingWorkOrders} 件</p>
              <Link className="text-link" href="/tasks">
                打開工單中心
              </Link>
            </article>
            <article className="mini-card">
              <strong>進行中工單</strong>
              <p>{inProgressWorkOrders} 件</p>
              <Link className="text-link" href="/tasks">
                查看進度
              </Link>
            </article>
            <article className="mini-card">
              <strong>即將到期租約</strong>
              <p>{expiringLeases} 份</p>
              <Link className="text-link" href="/leases">
                安排續租
              </Link>
            </article>
            <article className="mini-card">
              <strong>已過期租約</strong>
              <p>{expiredLeases} 份</p>
              <Link className="text-link" href="/leases">
                追蹤逾期
              </Link>
            </article>
          </div>
        </SectionPanel>
      </AppShell>
    </ProtectedPage>
  );
}
