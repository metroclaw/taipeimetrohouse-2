"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { WorkOrderAlert, LeaseAlert } from '@/types/domain';
import {
  getWorkOrders,
  updateWorkOrderAlertStatus,
  getLeaseAlerts,
  updateLeaseAlertStatus,
} from '@/lib/firebase-api';

interface AlertContextType {
  workOrders: WorkOrderAlert[];
  leaseAlerts: LeaseAlert[];
  updateWorkOrderStatus: (id: string, newStatus: WorkOrderAlert['status']) => Promise<void>;
  updateLeaseStatus: (id: string, newStatus: LeaseAlert['status']) => Promise<void>;
  reloadData: () => Promise<void>;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [workOrders, setWorkOrders] = useState<WorkOrderAlert[]>([]);
  const [leaseAlerts, setLeaseAlerts] = useState<LeaseAlert[]>([]);

  const reloadData = async () => {
    const fetchedWorkOrders = await getWorkOrders();
    const fetchedLeaseAlerts = await getLeaseAlerts();
    setWorkOrders(fetchedWorkOrders);
    setLeaseAlerts(fetchedLeaseAlerts);
  };

  useEffect(() => {
    reloadData();
  }, []);

  const updateWorkOrderStatus = async (id: string, newStatus: WorkOrderAlert['status']) => {
    await updateWorkOrderAlertStatus(id, newStatus);
    await reloadData();
  };

  const updateLeaseStatus = async (id: string, newStatus: LeaseAlert['status']) => {
    await updateLeaseAlertStatus(id, newStatus);
    await reloadData();
  };

  return (
    <AlertContext.Provider
      value={{ workOrders, leaseAlerts, updateWorkOrderStatus, updateLeaseStatus, reloadData }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlertContext must be used within AlertProvider');
  return context;
};
