import { AppShell } from '@/components/app-shell';
import { ProtectedPage } from '@/components/protected-page';
import { PageHeader } from '@/components/page-header';
import { SectionPanel } from '@/components/section-panel';
import { SUPER_ADMIN_EMAIL } from '@/lib/auth-config';

export default function SettingsPage() {
  return (
    <ProtectedPage allowRoles={['superadmin']}>
      <AppShell>
        <PageHeader
          eyebrow="Settings"
          title="最高權限帳號與角色規則"
          description="這一頁先讓權限結構有個落點，之後接正式 auth 後再把角色與權限設定做成可管理。"
        />

        <SectionPanel title="目前規則" description="這一版先把最高權限帳號的需求落進設定頁。">
          <div className="mini-grid">
            <article className="mini-card">
              <strong>最高權限帳號</strong>
              <p>{SUPER_ADMIN_EMAIL}</p>
            </article>
            <article className="mini-card">
              <strong>目前可見功能</strong>
              <p>可看到所有內部頁面，包含設定頁本身。</p>
            </article>
            <article className="mini-card">
              <strong>未來延伸</strong>
              <p>後續可把這個 Email 改成資料庫設定，不再寫死在前端 config。</p>
            </article>
          </div>
        </SectionPanel>
      </AppShell>
    </ProtectedPage>
  );
}
