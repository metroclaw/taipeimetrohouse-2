import type {
  LeaseAlert,
  ModuleDefinition,
  PropertyCard,
  SummaryMetric,
  WorkOrder,
} from '@/types/domain';

export const modules: ModuleDefinition[] = [
  {
    slug: 'dashboard',
    title: '營運總覽',
    description: '先把待辦、逾期、空房與租約風險集中到一個入口。',
    status: 'mvp',
    href: '/dashboard',
    bullets: ['今日待辦與逾期工單', '空房數與近期到期租約', '營運節奏一眼看清'],
  },
  {
    slug: 'properties',
    title: '房源管理',
    description: '房屋、房間、租客狀態先拉直，避免資料散成碎片。',
    status: 'mvp',
    href: '/properties',
    bullets: ['房源基本資料', '空房與房間數量', '管理負責人與到期提醒'],
  },
  {
    slug: 'tasks',
    title: '工單中心',
    description: '把一般任務、修繕、清潔都收斂到同一個工單模型。',
    status: 'mvp',
    href: '/tasks',
    bullets: ['統一指派與狀態流轉', '依類型與負責人篩選', '保留費用欄位供後續帳務串接'],
  },
  {
    slug: 'leases',
    title: '租約',
    description: '先掌握近期到期與續租風險，再往行事曆與簽約延伸。',
    status: 'planned',
    href: '/leases',
    bullets: ['近期到期提醒', '租客與房間關聯', '後續可接電子簽約'],
  },
  {
    slug: 'finance',
    title: '帳務',
    description: '第二階段再導入租金、水電與雜費紀錄，先不提早綁死資料層。',
    status: 'planned',
    href: '/finance',
    bullets: ['費用分類模型', '月度對帳流程', '後續報表與提醒'],
  },
  {
    slug: 'settings',
    title: '設定',
    description: '帳號權限、通知與整合能力會在流程穩定後補上。',
    status: 'planned',
    href: '/settings',
    bullets: ['角色權限', 'Email / 檔案整合', '系統級常數管理'],
  },
];

export const dashboardSummary: SummaryMetric[] = [
  { label: '管理房源', value: '12 棟' },
  { label: '待處理工單', value: '9 件', tone: 'warn' },
  { label: '近期到期租約', value: '4 份' },
  { label: '本月空房', value: '3 間', tone: 'good' },
];

export const operationsMetrics: SummaryMetric[] = [
  { label: '今日新增工單', value: '3' },
  { label: '逾期工單', value: '2', tone: 'warn' },
  { label: '本週簽約提醒', value: '4' },
  { label: '待招租房間', value: '3', tone: 'good' },
];

export const properties: PropertyCard[] = [
  {
    id: 'P-001',
    name: '中山北路館',
    district: '中山區',
    address: '台北市中山區中山北路二段 88 號',
    rooms: 18,
    vacantRooms: 1,
    manager: '林小姐',
    status: 'occupied',
    nextLeaseExpiry: '2026-04-08',
  },
  {
    id: 'P-002',
    name: '南京復興館',
    district: '松山區',
    address: '台北市松山區復興北路 231 號',
    rooms: 12,
    vacantRooms: 2,
    manager: '陳先生',
    status: 'vacant',
    nextLeaseExpiry: '2026-03-29',
  },
  {
    id: 'P-003',
    name: '古亭捷運館',
    district: '大安區',
    address: '台北市大安區羅斯福路三段 155 號',
    rooms: 10,
    vacantRooms: 0,
    manager: '吳小姐',
    status: 'maintenance',
    nextLeaseExpiry: '2026-05-12',
  },
];

export const workOrders: WorkOrder[] = [
  {
    id: 'WO-2401',
    title: 'A2 冷氣漏水檢修',
    propertyName: '中山北路館',
    roomCode: 'A2',
    assignee: '王師傅',
    dueDate: '2026-03-16',
    type: 'repair',
    status: 'in_progress',
    fee: 1800,
  },
  {
    id: 'WO-2402',
    title: '退租後深度清潔',
    propertyName: '南京復興館',
    roomCode: 'B5',
    assignee: '清潔阿姨',
    dueDate: '2026-03-15',
    type: 'cleaning',
    status: 'todo',
  },
  {
    id: 'WO-2403',
    title: '補登租客身分資料',
    propertyName: '古亭捷運館',
    roomCode: 'C1',
    assignee: '營運助理',
    dueDate: '2026-03-18',
    type: 'task',
    status: 'done',
  },
];

export const leaseAlerts: LeaseAlert[] = [
  {
    id: 'L-1001',
    tenantName: '周小姐',
    propertyName: '南京復興館',
    roomCode: 'B3',
    endDate: '2026-03-29',
    monthlyRent: 21500,
    status: 'expiringSoon',
  },
  {
    id: 'L-1002',
    tenantName: '黃先生',
    propertyName: '中山北路館',
    roomCode: 'A8',
    endDate: '2026-04-08',
    monthlyRent: 19800,
    status: 'active',
  },
  {
    id: 'L-1003',
    tenantName: '郭小姐',
    propertyName: '古亭捷運館',
    roomCode: 'C4',
    endDate: '2026-04-15',
    monthlyRent: 22800,
    status: 'active',
  },
];
