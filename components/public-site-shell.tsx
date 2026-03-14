import Link from 'next/link';
import { ReactNode } from 'react';

const publicNavItems = [
  { href: '/', label: '首頁' },
  { href: '/about', label: '公司簡介' },
  { href: '/room-types', label: '房型介紹' },
  { href: '/login', label: '登入' },
];

export function PublicSiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="public-shell">
      <header className="public-header">
        <Link className="public-brand" href="/">
          Taipei Metro House
        </Link>
        <nav className="public-nav" aria-label="Public">
          {publicNavItems.map((item) => (
            <Link key={item.href} className="public-nav-link" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="public-main">{children}</main>
    </div>
  );
}
