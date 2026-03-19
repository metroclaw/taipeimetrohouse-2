import React from 'react';
import type { LeaseAlert } from '@/types/domain';

interface Props {
  leaseAlerts: LeaseAlert[];
  onStatusChange: (id: string, newStatus: LeaseAlert['status']) => void;
}

const formatDate = (value?: Date) => {
  if (!value) return '未設定';
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return '未設定';
  return d.toLocaleDateString();
};

const LeaseAlertList: React.FC<Props> = ({ leaseAlerts, onStatusChange }) => {
  const statusLabels: Record<LeaseAlert['status'], string> = {
    active: '正常中',
    expiringSoon: '即將到期',
    expired: '已過期',
    renewed: '已續約',
  };

  return (
    <div>
      {leaseAlerts.length === 0 ? (
        <p>目前沒有租約提醒。</p>
      ) : (
        <ul className="table-list">
          {leaseAlerts.map((alert) => (
            <li key={alert.id} className="table-row">
              <div>
                <strong>{alert.tenantName}</strong>
                <div className="table-meta table-meta-left">
                  <span>房源：{alert.propertyName ?? alert.propertyId}</span>
                  <span>房間：{alert.roomCode ?? '—'}</span>
                  <span>
                    租期：{formatDate(alert.leaseStart)} - {formatDate(alert.leaseEnd)}
                  </span>
                </div>
              </div>

              <div className="table-meta">
                <span className={`status-pill status-${alert.status}`}>{statusLabels[alert.status]}</span>
                <select
                  className="status-select"
                  value={alert.status}
                  onChange={(e) =>
                    onStatusChange(alert.id, e.target.value as LeaseAlert['status'])
                  }
                  aria-label={`更新租約 ${alert.id} 狀態`}
                >
                  <option value="active">正常中</option>
                  <option value="expiringSoon">即將到期</option>
                  <option value="expired">已過期</option>
                  <option value="renewed">已續約</option>
                </select>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LeaseAlertList;
