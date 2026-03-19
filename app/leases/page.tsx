"use client";
import React from 'react';

import { AppShell } from '@/components/app-shell';
import LeaseAlertList from '@/components/LeaseAlertList';
import { PageHeader } from '@/components/page-header';
import { ProtectedPage } from '@/components/protected-page';
import { SectionPanel } from '@/components/section-panel';
import { useAlertContext } from '@/context/AlertContext';
import type { LeaseAlert } from '@/types/domain';

const LeasesPage: React.FC = () => {
  const { leaseAlerts, updateLeaseStatus } = useAlertContext();

  const handleStatusChange = (id: string, newStatus: LeaseAlert['status']) => {
    updateLeaseStatus(id, newStatus).catch((err) =>
      // 先用 console 記錄，之後可再接 toast 元件
      console.error('Failed to update lease status:', err),
    );
  };

  return (
    <ProtectedPage>
      <AppShell>
        <PageHeader
          eyebrow="Leases"
          title="租約提醒"
          description="從即將到期開始，把續約與退房節奏排順，避免臨時抱佛腳。"
        />

        <SectionPanel
          title="租約提醒列表"
          description="先用列表檢視與狀態更新確認流程順不順，後續再補行事曆與通知。"
        >
          <LeaseAlertList leaseAlerts={leaseAlerts} onStatusChange={handleStatusChange} />
        </SectionPanel>
      </AppShell>
    </ProtectedPage>
  );
};

export default LeasesPage;
