"use client";
import Link from 'next/link';
import React from 'react';

import { AppShell } from '@/components/app-shell';
import { PageHeader } from '@/components/page-header';
import { ProtectedPage } from '@/components/protected-page';
import { SectionPanel } from '@/components/section-panel';
import { useAlertContext } from '@/context/AlertContext';

const DashboardPage: React.FC = () => {
  const { workOrders, leaseAlerts } = useAlertContext();

  const countByStatus = (items: { status: string }[], statuses: string[]) =>
    items.filter((item) => statuses.includes(item.status)).length;

  const pendingWorkOrders = workOrders.filter((w) => w.status === 'pending').slice(0, 5);
  const expiringLeases = leaseAlerts
    .filter((l) => l.status === 'expiringSoon')
    .slice(0, 5);

  return (
    <ProtectedPage>
      <AppShell>
        <PageHeader
          eyebrow="Dashboard"
          title="提醒總覽"
          description="把今日待辦工單與即將到期租約放在同一個視野裡，先確保不漏掉關鍵節點。"
        />

        <SectionPanel
          title="工單狀態統計"
          description="先用簡單狀態統計看今天工單的壓力，後續再補圖表與篩選器。"
        >
          <ul className="stat-list">
            <li>
              <span>待處理</span>
              <strong>{countByStatus(workOrders, ['pending'])}</strong>
            </li>
            <li>
              <span>進行中</span>
              <strong>{countByStatus(workOrders, ['inProgress'])}</strong>
            </li>
            <li>
              <span>已完成</span>
              <strong>{countByStatus(workOrders, ['completed'])}</strong>
            </li>
            <li>
              <span>已取消</span>
              <strong>{countByStatus(workOrders, ['cancelled'])}</strong>
            </li>
          </ul>
          <div className="section-footer">
            <Link href="/tasks" className="text-link">
              前往工單中心查看全部工單
            </Link>
          </div>
        </SectionPanel>

        <SectionPanel
          title="租約狀態統計"
          description="把正常、即將到期與已過期分開看，幫助安排續租與退房節奏。"
        >
          <ul className="stat-list">
            <li>
              <span>正常中</span>
              <strong>{countByStatus(leaseAlerts, ['active'])}</strong>
            </li>
            <li>
              <span>即將到期</span>
              <strong>{countByStatus(leaseAlerts, ['expiringSoon'])}</strong>
            </li>
            <li>
              <span>已過期</span>
              <strong>{countByStatus(leaseAlerts, ['expired'])}</strong>
            </li>
            <li>
              <span>已續約</span>
              <strong>{countByStatus(leaseAlerts, ['renewed'])}</strong>
            </li>
          </ul>
          <div className="section-footer">
            <Link href="/leases" className="text-link">
              前往租約提醒查看全部租約
            </Link>
          </div>
        </SectionPanel>

        <SectionPanel
          title="待辦工單一覽"
          description="先列出幾筆最急的待處理工單，詳細內容再進工單中心處理。"
        >
          {pendingWorkOrders.length === 0 ? (
            <p>目前沒有待處理工單。</p>
          ) : (
            <ul className="inline-list">
              {pendingWorkOrders.map((order) => (
                <li key={order.id}>
                  <strong>{order.description}</strong>
                  <span>{order.assignedTo}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="section-footer">
            <Link href="/tasks" className="primary-link">
              打開工單中心
            </Link>
          </div>
        </SectionPanel>

        <SectionPanel
          title="即將到期租約"
          description="抓出近期要到期的租約，先安排續約與退房流程。"
        >
          {expiringLeases.length === 0 ? (
            <p>目前沒有即將到期的租約。</p>
          ) : (
            <ul className="inline-list">
              {expiringLeases.map((lease) => (
                <li key={lease.id}>
                  <strong>{lease.tenantName}</strong>
                  <span>
                    {lease.propertyName} {lease.roomCode}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <div className="section-footer">
            <Link href="/leases" className="primary-link">
              打開租約提醒
            </Link>
          </div>
        </SectionPanel>
      </AppShell>
    </ProtectedPage>
  );
};

export default DashboardPage;
