import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1>台北都會物業管理系統</h1>
      <nav>
        <ul>
          <li><Link href="/dashboard">提醒總覽</Link></li>
          <li><Link href="/tasks">工單提醒</Link></li>
          <li><Link href="/leases">租約提醒</Link></li>
        </ul>
      </nav>
    </div>
  );
}
