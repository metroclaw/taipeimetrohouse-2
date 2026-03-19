import React from 'react';
import type { LeaseAlert } from '@/types/domain';

interface Props {
  leaseAlerts: LeaseAlert[];
  onStatusChange: (id: string, newStatus: LeaseAlert['status']) => void;
}

const statusColors: Record<string, string> = {
  active: 'green',
  expiringSoon: 'orange',
  expired: 'red',
  renewed: 'blue',
};

const formatDate = (value?: string | Date) => {
  if (!value) return '未設定';
  return new Date(value).toLocaleDateString();
};

const LeaseAlertList: React.FC<Props> = ({ leaseAlerts, onStatusChange }) => {
  return (
    <div>
      <h2>租約提醒列表</h2>
      <ul>
        {leaseAlerts.map((alert) => (
          <li key={alert.id} style={{ borderLeft: `4px solid ${statusColors[alert.status]}` }}>
            <div>
              <strong>{alert.tenantName}</strong> (狀態: {alert.status})
            </div>
            <div>租期: {formatDate(alert.leaseStart)} - {formatDate(alert.leaseEnd)}</div>
            <select
              value={alert.status}
              onChange={(e) =>
                onStatusChange(alert.id, e.target.value as LeaseAlert['status'])
              }
            >
              <option value="active">正常中</option>
              <option value="expiringSoon">即將到期</option>
              <option value="expired">已過期</option>
              <option value="renewed">已續約</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaseAlertList;
