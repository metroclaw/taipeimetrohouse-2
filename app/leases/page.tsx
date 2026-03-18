"use client";
import React from 'react';
import LeaseAlertList from '@/components/LeaseAlertList';
import { useAlertContext } from '@/context/AlertContext';
import type { LeaseAlert } from '@/types/domain';

const LeasesPage: React.FC = () => {
  const { leaseAlerts, updateLeaseStatus } = useAlertContext();

  const handleStatusChange = (id: string, newStatus: LeaseAlert['status']) => {
    updateLeaseStatus(id, newStatus)
      .catch(err => console.error('Failed to update lease status:', err));
  };

  return (
    <div>
      <h1>租約提醒頁面</h1>
      <LeaseAlertList leaseAlerts={leaseAlerts} onStatusChange={handleStatusChange} />
    </div>
  );
};

export default LeasesPage;
