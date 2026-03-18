"use client";
import React from 'react';
import WorkOrderAlertList from '@/components/WorkOrderAlertList';
import { useAlertContext } from '@/context/AlertContext';
import type { WorkOrderAlert } from '@/types/domain';

const TasksPage: React.FC = () => {
  const { workOrders, updateWorkOrderStatus } = useAlertContext();

  const handleStatusChange = (id: string, newStatus: WorkOrderAlert['status']) => {
    updateWorkOrderStatus(id, newStatus)
      .catch(err => console.error('Failed to update work order status:', err));
  };

  return (
    <div>
      <h1>工單提醒頁面</h1>
      <WorkOrderAlertList workOrders={workOrders} onStatusChange={handleStatusChange} />
    </div>
  );
};

export default TasksPage;
