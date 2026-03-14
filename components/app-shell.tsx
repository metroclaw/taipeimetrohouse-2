import Link from 'next/link';
import { ReactNode } from 'react';

const navItems = [
  { href: '/', label: '首頁' },
  { href: '/dashboard', label: '儀表板' },
  { href: '/properties', label: '房源' },
  { href: '/tasks', label: '工單' },
  { href: '/leases', label: '租約' },
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand-block">
          <span className="brand-kicker">Taipei Metro House 2</span>
          <h1>物業管理重製版</h1>
          <p>先把流程重整清楚，再決定資料層與外部整合怎麼接。</p>
        </div>
        <nav className="nav-list" aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.href} className="nav-item" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}
