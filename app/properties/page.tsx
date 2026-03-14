import { AppShell } from '@/components/app-shell';
import { PageHeader } from '@/components/page-header';
import { SectionPanel } from '@/components/section-panel';
import { properties } from '@/lib/mock-data';

export default function PropertiesPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Properties"
        title="房源與空房狀態先拉直"
        description="先把房源基本資料、空房數與到期提醒固定下來，後面再細化房間、租客與設備。"
      />

      <SectionPanel title="房源總覽" description="MVP 先驗證卡片資訊量與搜尋欄位，不急著做複雜編輯器。">
        <div className="property-grid">
          {properties.map((property) => (
            <article key={property.id} className="property-card">
              <div className="property-card-top">
                <div>
                  <p className="module-slug">{property.id}</p>
                  <h3>{property.name}</h3>
                </div>
                <span className={`pill property-${property.status}`}>{property.status}</span>
              </div>
              <p className="property-address">{property.address}</p>
              <dl className="property-meta">
                <div>
                  <dt>行政區</dt>
                  <dd>{property.district}</dd>
                </div>
                <div>
                  <dt>房間數</dt>
                  <dd>{property.rooms}</dd>
                </div>
                <div>
                  <dt>空房</dt>
                  <dd>{property.vacantRooms}</dd>
                </div>
                <div>
                  <dt>負責人</dt>
                  <dd>{property.manager}</dd>
                </div>
                <div>
                  <dt>下個到期</dt>
                  <dd>{property.nextLeaseExpiry}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </SectionPanel>
    </AppShell>
  );
}
