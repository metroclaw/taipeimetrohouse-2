'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { useAuth } from '@/components/auth-provider';

export function ProtectedPage({
  children,
  allowRoles,
}: {
  children: ReactNode;
  allowRoles?: Array<'superadmin' | 'staff'>;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, isReady } = useAuth();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!currentUser) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [currentUser, isReady, pathname, router]);

  if (!isReady) {
    return <div className="auth-card">載入帳號狀態中...</div>;
  }

  if (!currentUser) {
    return (
      <div className="auth-card">
        <h2>需要先登入</h2>
        <p>這一區是內部管理功能，登入後才會開放。</p>
        <Link className="primary-button" href={`/login?next=${encodeURIComponent(pathname)}`}>
          前往登入
        </Link>
      </div>
    );
  }

  if (allowRoles && !allowRoles.includes(currentUser.role)) {
    return (
      <div className="auth-card">
        <h2>權限不足</h2>
        <p>這個功能目前只開給最高權限帳號。</p>
      </div>
    );
  }

  return <>{children}</>;
}
