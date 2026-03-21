'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { useAuth } from '@/components/auth-provider';
import styles from './app-shell.module.css';

type NavItem = {
  href: string;
  label: string;
  superadminOnly?: boolean;
};

const navItems: NavItem[] = [
  { href: '/', label: '首頁' },
  { href: '/dashboard', label: '儀表板' },
  { href: '/properties', label: '房源狀態總表' },
  { href: '/tasks', label: '工單管理' },
  { href: '/leases', label: '租約狀態' },
  { href: '/settings', label: '帳號管理', superadminOnly: true },
];

const LaughIcon = () => (
  <svg width="24" height="24" viewBox="0 0 512 512" fill="currentColor">
    <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm101.442 334.8c-23.704 36.315-62.83 59.2-101.442 59.2-38.614 0-77.74-22.885-101.442-59.2-5.462-8.368-3.111-19.576 5.257-25.038 8.358-5.452 19.566-3.102 25.028 5.267 16.711 25.59 43.197 41.229 71.157 41.229 27.95 0 54.436-15.629 71.147-41.219 5.462-8.369 16.68-10.72 25.038-5.268 8.368 5.461 10.73 16.67 5.257 25.029zm-152.022-83.332c-15.438 0-27.95-12.512-27.95-27.95s12.512-27.95 27.95-27.95 27.95 12.512 27.95 27.95-12.512 27.95-27.95 27.95zm101.16 0c-15.438 0-27.95-12.512-27.95-27.95s12.512-27.95 27.95-27.95 27.95 12.512 27.95 27.95-12.512 27.95-27.95 27.95z"/>
  </svg>
);

export function AppShell({ children }: { children: ReactNode }) {
  const { currentUser, logout } = useAuth();
  const visibleNavItems = navItems.filter(
    (item) => !item.superadminOnly || currentUser?.role === 'superadmin',
  );

  return (
    <div className={styles.wrapper}>
      {/* Sidebar */}
      <nav className={styles.sidebar}>
        <Link href="/" className={styles.sidebarBrand}>
          <div className={styles.sidebarBrandIcon}>
            <LaughIcon />
          </div>
          <div className={styles.sidebarBrandText}>大都會物業房務管理系統</div>
        </Link>
        <div className={styles.sidebarDivider} />
        
        {visibleNavItems.map((item) => (
          <Link key={item.href} href={item.href} className={styles.navItem}>
            <span className={styles.navLabel}>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Content Wrapper */}
      <div className={styles.contentWrapper}>
        <div id="content">
          {/* Topbar */}
          <nav className={styles.topbar}>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{currentUser?.name ?? 'Admin'}</span>
              <button className={styles.logoutBtn} onClick={logout}>
                登出
              </button>
            </div>
          </nav>

          {/* Main Content */}
          <div className={styles.containerFluid}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
