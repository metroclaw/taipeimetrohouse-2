export type UserRole = 'superadmin' | 'staff';

export type StoredUser = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export type SessionUser = Omit<StoredUser, 'password'>;
