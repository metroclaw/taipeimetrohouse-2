import { AppShell } from '@/components/app-shell';
import { PageHeader } from '@/components/page-header';
import { SectionPanel } from '@/components/section-panel';
import { workOrders } from '@/lib/mock-data';

export default function TasksPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Tasks"
        title="任務、修繕、清潔統一成工單"
        description="重製版的關鍵不是把舊畫面照抄，而是先把工單模型收斂，後面才能穩定擴充。"
      />

      <SectionPanel title="工單列表" description="先確認欄位是否合理，再做新增、編輯和權限流。">
        <div className="table-list">
          {workOrders.map((workOrder) => (
            <article key={workOrder.id} className="table-row">
              <div>
                <p className="module-slug">{workOrder.id}</p>
                <strong>{workOrder.title}</strong>
                <p>
                  {workOrder.propertyName} {workOrder.roomCode} / 指派給 {workOrder.assignee}
                </p>
              </div>
              <div className="table-meta">
                <span className={`pill ${workOrder.type}`}>{workOrder.type}</span>
                <span className={`pill status-${workOrder.status}`}>{workOrder.status}</span>
                <span>到期 {workOrder.dueDate}</span>
                <span>{workOrder.fee ? `NT$ ${workOrder.fee.toLocaleString('zh-TW')}` : '待估價'}</span>
              </div>
            </article>
          ))}
        </div>
      </SectionPanel>
    </AppShell>
  );
}
