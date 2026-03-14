'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

import { useAuth } from '@/components/auth-provider';

type NavItem = {
  href: string;
  label: string;
  superadminOnly?: boolean;
};

const navItems: NavItem[] = [
  { href: '/', label: '首頁' },
  { href: '/dashboard', label: '儀表板' },
  { href: '/properties', label: '房源' },
  { href: '/tasks', label: '工單' },
  { href: '/leases', label: '租約' },
  { href: '/settings', label: '設定', superadminOnly: true },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { currentUser, logout } = useAuth();
  const visibleNavItems = navItems.filter(
    (item) => !item.superadminOnly || currentUser?.role === 'superadmin',
  );

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand-block">
          <span className="brand-kicker">Taipei Metro House 2</span>
          <h1>物業管理重製版</h1>
          <p>先把流程重整清楚，再決定資料層與外部整合怎麼接。</p>
        </div>
        <nav className="nav-list" aria-label="Primary">
          {visibleNavItems.map((item) => (
            <Link key={item.href} className="nav-item" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="sidebar-account">
          <p className="sidebar-account-label">目前登入</p>
          <strong>{currentUser?.name ?? '未登入'}</strong>
          <span>{currentUser?.email ?? '請先登入查看內部功能'}</span>
          {currentUser ? (
            <button className="ghost-button" onClick={logout} type="button">
              登出
            </button>
          ) : (
            <Link className="ghost-button" href="/login">
              前往登入
            </Link>
          )}
        </div>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}
