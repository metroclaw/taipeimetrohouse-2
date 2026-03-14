export type ModuleStatus = 'mvp' | 'planned';

export type ModuleDefinition = {
  slug: string;
  title: string;
  description: string;
  status: ModuleStatus;
  href: string;
  bullets: string[];
};

export type SummaryMetric = {
  label: string;
  value: string;
  tone?: 'default' | 'good' | 'warn';
};

export type PropertyStatus = 'occupied' | 'vacant' | 'maintenance';

export type PropertyCard = {
  id: string;
  name: string;
  district: string;
  address: string;
  rooms: number;
  vacantRooms: number;
  manager: string;
  status: PropertyStatus;
  nextLeaseExpiry: string;
};

export type WorkOrderType = 'task' | 'repair' | 'cleaning';
export type WorkOrderStatus = 'todo' | 'in_progress' | 'done';

export type WorkOrder = {
  id: string;
  title: string;
  propertyName: string;
  roomCode: string;
  assignee: string;
  dueDate: string;
  type: WorkOrderType;
  status: WorkOrderStatus;
  fee?: number;
};

export type LeaseAlert = {
  id: string;
  tenantName: string;
  propertyName: string;
  roomCode: string;
  endDate: string;
  monthlyRent: number;
};
