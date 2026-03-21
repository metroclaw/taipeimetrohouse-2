export type UserRole = 'superadmin' | 'maintenance' | 'cleaner' | 'staff' | 'tenant';

export type StoredUser = {
  name: string;
  email: string;
  password: string;
  phone1?: string;
  phone2?: string;
  role: UserRole;
};

export type SessionUser = Omit<StoredUser, 'password'>;
