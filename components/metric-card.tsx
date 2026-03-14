import type { SummaryMetric } from '@/types/domain';

export function MetricCard({ metric }: { metric: SummaryMetric }) {
  return (
    <article className={`metric-card ${metric.tone ?? 'default'}`}>
      <span>{metric.label}</span>
      <strong>{metric.value}</strong>
    </article>
  );
}
