'use client';

import LeaseAlertList from '@/components/LeaseAlertList';
import { AppShell } from '@/components/app-shell';
import { PageHeader } from '@/components/page-header';
import { ProtectedPage } from '@/components/protected-page';
import { SectionPanel } from '@/components/section-panel';
import { useAlertContext } from '@/context/AlertContext';
import type { LeaseAlert } from '@/types/domain';

export default function LeasesPage() {
  const { leaseAlerts, updateLeaseStatus } = useAlertContext();

  const handleStatusChange = (id: string, newStatus: LeaseAlert['status']) => {
    updateLeaseStatus(id, newStatus).catch((error) => {
      console.error('Failed to update lease status:', error);
    });
  };

  return (
    <ProtectedPage>
      <AppShell>
        <PageHeader
          eyebrow="Leases"
          title="租約提醒"
          description="對應 README 的 /leases 路由，呈現近期到期與續租狀態，並提供下探工單的跳板。"
        />

        <SectionPanel title="租約列表" description="先用 mock data 驗證欄位，再接正式資料層。">
          <LeaseAlertList leaseAlerts={leaseAlerts} onStatusChange={handleStatusChange} />
        </SectionPanel>
      </AppShell>
    </ProtectedPage>
  );
}
