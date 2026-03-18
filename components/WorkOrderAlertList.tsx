import React from 'react';
import type { WorkOrderAlert } from '@/types/domain';

interface Props {
  workOrders: WorkOrderAlert[];
  onStatusChange: (id: string, newStatus: WorkOrderAlert['status']) => void;
}

const statusColors: Record<string, string> = {
  pending: 'gray',
  inProgress: 'blue',
  completed: 'green',
  cancelled: 'red',
};

const WorkOrderAlertList: React.FC<Props> = ({ workOrders, onStatusChange }) => {
  return (
    <div>
      <h2>工單提醒列表</h2>
      <ul>
        {workOrders.map((order) => (
          <li key={order.id} style={{ borderLeft: `4px solid ${statusColors[order.status]}` }}>
            <div>
              <strong>{order.description}</strong> (狀態: {order.status})
            </div>
            <div>負責人: {order.assignedTo}</div>
            <select
              value={order.status}
              onChange={(e) =>
                onStatusChange(order.id, e.target.value as WorkOrderAlert['status'])
              }
            >
              <option value="pending">待處理</option>
              <option value="inProgress">進行中</option>
              <option value="completed">已完成</option>
              <option value="cancelled">已取消</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkOrderAlertList;
