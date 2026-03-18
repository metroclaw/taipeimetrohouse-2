export interface PropertyCard {
  id: string;
  name: string;
  district: string;
  address: string;
  rooms: number;
  vacantRooms: number;
  manager: string;
  status: 'occupied' | 'vacant' | 'maintenance';
  nextLeaseExpiry: string;
}

export interface WorkOrder {
  id: string;
  title: string;
  propertyName: string;
  roomCode: string;
  assignee: string;
  dueDate: string;
  type: 'repair' | 'cleaning' | 'task';
  status: 'todo' | 'in_progress' | 'done';
  fee?: number;
}

export interface WorkOrderAlert {
  id: string;
  propertyId: string;
  description: string;
  status: 'pending' | 'inProgress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
  assignedTo: string;
}

export interface LeaseAlert {
  id: string;
  tenantName: string;
  status: 'active' | 'expiringSoon' | 'expired' | 'renewed';
  leaseId?: string;
  propertyId?: string;
  propertyName?: string;
  roomCode?: string;
  leaseStart?: string | Date;
  leaseEnd?: string | Date;
  endDate?: string;
  monthlyRent?: number;
  alertSent?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SummaryMetric {
  label: string;
  value: number | string;
  tone?: string;
}

export interface ModuleDefinition {
  id?: string;
  slug: string;
  title: string;
  name?: string;
  description?: string;
  active?: boolean;
  status: 'mvp' | 'planned' | 'experimental';
  bullets?: string[];
  href?: string;
}
