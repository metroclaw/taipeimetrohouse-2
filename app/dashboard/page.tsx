"use client";
import React from 'react';
import { useAlertContext } from '@/context/AlertContext';

const DashboardPage: React.FC = () => {
  const { workOrders, leaseAlerts } = useAlertContext();

  const countByStatus = (items: { status: string }[], statuses: string[]) => {
    return items.filter(item => statuses.includes(item.status)).length;
  };

  return (
    <div>
      <h1>提醒總覽</h1>
      <section>
        <h2>工單狀態統計</h2>
        <ul>
          <li>待處理: {countByStatus(workOrders, ['pending'])}</li>
          <li>進行中: {countByStatus(workOrders, ['inProgress'])}</li>
          <li>已完成: {countByStatus(workOrders, ['completed'])}</li>
          <li>已取消: {countByStatus(workOrders, ['cancelled'])}</li>
        </ul>
      </section>
      <section>
        <h2>租約狀態統計</h2>
        <ul>
          <li>正常中: {countByStatus(leaseAlerts, ['active'])}</li>
          <li>即將到期: {countByStatus(leaseAlerts, ['expiringSoon'])}</li>
          <li>已過期: {countByStatus(leaseAlerts, ['expired'])}</li>
          <li>已續約: {countByStatus(leaseAlerts, ['renewed'])}</li>
        </ul>
      </section>
    </div>
  );
};

export default DashboardPage;
