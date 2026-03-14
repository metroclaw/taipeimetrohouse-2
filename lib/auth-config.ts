import type { StoredUser } from '@/types/auth';

export const SUPER_ADMIN_EMAIL = 'metroclaw168@gmail.com';
export const SUPER_ADMIN_PASSWORD = 'metrohouse168';
export const STORAGE_USERS_KEY = 'tmh2-users';
export const STORAGE_SESSION_KEY = 'tmh2-session';

export const defaultUsers: StoredUser[] = [
  {
    name: 'Metroclaw Root',
    email: SUPER_ADMIN_EMAIL,
    password: SUPER_ADMIN_PASSWORD,
    role: 'superadmin',
  },
];
