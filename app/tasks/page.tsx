'use client';

import { useMemo } from 'react';
import WorkOrderAlertList from '@/components/WorkOrderAlertList';
import { AppShell } from '@/components/app-shell';
import { ProtectedPage } from '@/components/protected-page';
import { useAlertContext } from '@/context/AlertContext';
import type { WorkOrderAlert } from '@/types/domain';
import styles from './tasks.module.css';

export default function TasksPage() {
  const { workOrders, updateWorkOrderStatus } = useAlertContext();

  const handleStatusChange = (id: string, newStatus: WorkOrderAlert['status']) => {
    updateWorkOrderStatus(id, newStatus).catch((error) => {
      console.error('Failed to update work order status:', error);
    });
  };

  const metrics = useMemo(() => {
    return {
      upcoming: 0, // Mock count mapping Since the domain model doesn't explicitly track pure "upcoming" right now
      pending: workOrders.filter((w) => w.status === 'pending').length,
      inProgress: workOrders.filter((w) => w.status === 'inProgress').length,
      completed: workOrders.filter((w) => w.status === 'completed').length,
      cancelled: workOrders.filter((w) => w.status === 'cancelled').length,
    };
  }, [workOrders]);

  const cards = [
    { label: '即將到來', count: metrics.upcoming, borderCol: styles.borderLeftPrimary, textCol: styles.textPrimary },
    { label: '待定', count: metrics.pending, borderCol: styles.borderLeftWarning, textCol: styles.textWarning },
    { label: '進行中', count: metrics.inProgress, borderCol: styles.borderLeftInfo, textCol: styles.textInfo },
    { label: '已完成', count: metrics.completed, borderCol: styles.borderLeftSuccess, textCol: styles.textSuccess },
    { label: '取消', count: metrics.cancelled, borderCol: styles.borderLeftDanger, textCol: styles.textDanger },
  ];

  return (
    <ProtectedPage>
      <AppShell>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>工單管理</h1>
        </div>

        <div className={styles.row}>
          {cards.map((card, idx) => (
            <div key={idx} className={styles.colXl3}>
              <div className={`${styles.card} ${card.borderCol} ${styles.py2}`}>
                <div className={styles.cardBody}>
                  <div className={styles.rowNoGutters}>
                    <div className={styles.col}>
                      <div className={`${styles.textXs} ${styles.fontWeightBold} ${card.textCol} ${styles.textUppercase} ${styles.mb1}`}>
                        {card.label}
                      </div>
                      <div className={`${styles.h5} ${styles.fontWeightBold} ${styles.textGray800}`}>
                        {card.count}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.tableCard}>
          <div className={styles.tableCardHeader}>
            <h6 className={styles.tableCardTitle}>所有工單資料表</h6>
          </div>
          <div className={styles.tableCardBody}>
            <WorkOrderAlertList workOrders={workOrders} onStatusChange={handleStatusChange} />
          </div>
        </div>
      </AppShell>
    </ProtectedPage>
  );
}
