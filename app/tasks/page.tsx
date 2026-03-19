"use client";
import React from 'react';

import { AppShell } from '@/components/app-shell';
import WorkOrderAlertList from '@/components/WorkOrderAlertList';
import { PageHeader } from '@/components/page-header';
import { ProtectedPage } from '@/components/protected-page';
import { SectionPanel } from '@/components/section-panel';
import { useAlertContext } from '@/context/AlertContext';
import type { WorkOrderAlert } from '@/types/domain';

const TasksPage: React.FC = () => {
  const { workOrders, updateWorkOrderStatus } = useAlertContext();

  const handleStatusChange = (id: string, newStatus: WorkOrderAlert['status']) => {
    updateWorkOrderStatus(id, newStatus).catch((err) =>
      // 先用 console 記錄，之後可再接 toast 元件
      console.error('Failed to update work order status:', err),
    );
  };

  return (
    <ProtectedPage>
      <AppShell>
        <PageHeader
          eyebrow="Tasks"
          title="工單中心"
          description="把修繕、清潔與一般任務收斂到同一個工單模型，先讓狀態流轉順起來。"
        />

        <SectionPanel
          title="工單提醒列表"
          description="目前先用簡單列表與狀態下拉驗證流程，後續再加入篩選與詳細視窗。"
        >
          <WorkOrderAlertList workOrders={workOrders} onStatusChange={handleStatusChange} />
        </SectionPanel>
      </AppShell>
    </ProtectedPage>
  );
};

export default TasksPage;
