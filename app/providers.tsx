'use client';

import { ReactNode } from 'react';
import { AlertProvider } from '@/context/AlertContext';
import { AuthProvider } from '@/components/auth-provider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AlertProvider>
      <AuthProvider>{children}</AuthProvider>
    </AlertProvider>
  );
}
