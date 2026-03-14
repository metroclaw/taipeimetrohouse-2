import Link from 'next/link';

import { AppShell } from '@/components/app-shell';
import { PageHeader } from '@/components/page-header';
import { ProtectedPage } from '@/components/protected-page';
import { SectionPanel } from '@/components/section-panel';
import { leaseAlerts } from '@/lib/mock-data';

export default function LeasesPage() {
  return (
    <ProtectedPage>
      <AppShell>
        <PageHeader
          eyebrow="Leases"
          title="租約模組先停在風險盤點"
          description="這頁先做成可討論的入口，等資料模型確認後，再補租約明細、續約流程與簽約文件。"
        />

        <SectionPanel title="近期提醒" description="先把最需要被看見的資訊拉出來。">
          <div className="table-list">
            {leaseAlerts.map((lease) => (
              <article key={lease.id} className="table-row">
                <div>
                  <strong>{lease.tenantName}</strong>
                  <p>
                    {lease.propertyName} {lease.roomCode}
                  </p>
                </div>
                <div className="table-meta">
                  <span>{lease.endDate}</span>
                  <span>NT$ {lease.monthlyRent.toLocaleString('zh-TW')}</span>
                </div>
              </article>
            ))}
          </div>
        </SectionPanel>

        <section className="callout">
          <h2>下一步</h2>
          <p>接下來應該先補租客/租約型別與詳情頁，再決定是不是進日曆視圖。</p>
          <Link className="text-link" href="/dashboard">
            回儀表板看整體節奏
          </Link>
        </section>
      </AppShell>
    </ProtectedPage>
  );
}
