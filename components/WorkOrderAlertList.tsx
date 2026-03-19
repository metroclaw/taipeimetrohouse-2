import React from 'react';
import type { WorkOrderAlert } from '@/types/domain';

interface Props {
  workOrders: WorkOrderAlert[];
  onStatusChange: (id: string, newStatus: WorkOrderAlert['status']) => void;
}

const WorkOrderAlertList: React.FC<Props> = ({ workOrders, onStatusChange }) => {
  const statusLabels: Record<WorkOrderAlert['status'], string> = {
    pending: '待處理',
    inProgress: '進行中',
    completed: '已完成',
    cancelled: '已取消',
  };

  const formatDate = (value?: Date) => {
    if (!value) return '未設定';
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return '未設定';
    return d.toLocaleDateString();
  };

  return (
    <div>
      {workOrders.length === 0 ? (
        <p>目前沒有工單提醒。</p>
      ) : (
        <ul className="table-list">
          {workOrders.map((order) => (
            <li key={order.id} className="table-row">
              <div>
                <strong>{order.description}</strong>
                <div className="table-meta table-meta-left">
                  <span>工單：{order.id}</span>
                  <span>負責人：{order.assignedTo}</span>
                  <span>到期：{formatDate(order.dueDate)}</span>
                </div>
              </div>

              <div className="table-meta">
                <span className={`status-pill status-${order.status}`}>{statusLabels[order.status]}</span>
                <select
                  className="status-select"
                  value={order.status}
                  onChange={(e) =>
                    onStatusChange(order.id, e.target.value as WorkOrderAlert['status'])
                  }
                  aria-label={`更新工單 ${order.id} 狀態`}
                >
                  <option value="pending">待處理</option>
                  <option value="inProgress">進行中</option>
                  <option value="completed">已完成</option>
                  <option value="cancelled">已取消</option>
                </select>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkOrderAlertList;
