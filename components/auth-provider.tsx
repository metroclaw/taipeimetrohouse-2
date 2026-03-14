'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  defaultUsers,
  STORAGE_SESSION_KEY,
  STORAGE_USERS_KEY,
  SUPER_ADMIN_EMAIL,
} from '@/lib/auth-config';
import type { SessionUser, StoredUser } from '@/types/auth';

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type AuthContextValue = {
  currentUser: SessionUser | null;
  isReady: boolean;
  login: (email: string, password: string) => { ok: boolean; message?: string };
  logout: () => void;
  register: (input: RegisterInput) => { ok: boolean; message?: string };
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readUsers(): StoredUser[] {
  if (typeof window === 'undefined') {
    return defaultUsers;
  }

  const raw = window.localStorage.getItem(STORAGE_USERS_KEY);
  if (!raw) {
    window.localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }

  try {
    const parsed = JSON.parse(raw) as StoredUser[];
    const hasSuperAdmin = parsed.some((user) => user.email === SUPER_ADMIN_EMAIL);

    if (hasSuperAdmin) {
      return parsed;
    }

    const merged = [...defaultUsers, ...parsed];
    window.localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    window.localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }
}

function sanitizeUser(user: StoredUser): SessionUser {
  return {
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<SessionUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const users = readUsers();
    const sessionEmail = window.localStorage.getItem(STORAGE_SESSION_KEY);
    const matchedUser = users.find((user) => user.email === sessionEmail) ?? null;

    setCurrentUser(matchedUser ? sanitizeUser(matchedUser) : null);
    setIsReady(true);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      currentUser,
      isReady,
      login(email, password) {
        const users = readUsers();
        const matchedUser = users.find(
          (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password,
        );

        if (!matchedUser) {
          return { ok: false, message: '帳號或密碼不正確。' };
        }

        const sessionUser = sanitizeUser(matchedUser);
        window.localStorage.setItem(STORAGE_SESSION_KEY, matchedUser.email);
        setCurrentUser(sessionUser);
        return { ok: true };
      },
      logout() {
        window.localStorage.removeItem(STORAGE_SESSION_KEY);
        setCurrentUser(null);
      },
      register(input) {
        const users = readUsers();
        const normalizedEmail = input.email.toLowerCase();

        if (users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
          return { ok: false, message: '這個 Email 已經建立過帳號。' };
        }

        const newUser: StoredUser = {
          email: normalizedEmail,
          name: input.name,
          password: input.password,
          role: normalizedEmail === SUPER_ADMIN_EMAIL ? 'superadmin' : 'staff',
        };

        const nextUsers = [...users, newUser];
        window.localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(nextUsers));
        window.localStorage.setItem(STORAGE_SESSION_KEY, newUser.email);
        setCurrentUser(sanitizeUser(newUser));
        return { ok: true };
      },
    }),
    [currentUser, isReady],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
