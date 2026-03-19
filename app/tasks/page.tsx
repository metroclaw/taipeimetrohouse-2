'use client';

import WorkOrderAlertList from '@/components/WorkOrderAlertList';
import { AppShell } from '@/components/app-shell';
import { PageHeader } from '@/components/page-header';
import { ProtectedPage } from '@/components/protected-page';
import { SectionPanel } from '@/components/section-panel';
import { useAlertContext } from '@/context/AlertContext';
import type { WorkOrderAlert } from '@/types/domain';

export default function TasksPage() {
  const { workOrders, updateWorkOrderStatus } = useAlertContext();

  const handleStatusChange = (id: string, newStatus: WorkOrderAlert['status']) => {
    updateWorkOrderStatus(id, newStatus).catch((error) => {
      console.error('Failed to update work order status:', error);
    });
  };

  return (
    <ProtectedPage>
      <AppShell>
        <PageHeader
          eyebrow="Tasks"
          title="工單提醒"
          description="依 README 的路由配置，把一般任務、修繕與清潔工單拉到同一頁面，並可直接更新狀態。"
        />

        <SectionPanel title="工單列表" description="資料來自 AlertContext，未來再串正式 Firebase collection。">
          <WorkOrderAlertList workOrders={workOrders} onStatusChange={handleStatusChange} />
        </SectionPanel>
      </AppShell>
    </ProtectedPage>
  );
}
