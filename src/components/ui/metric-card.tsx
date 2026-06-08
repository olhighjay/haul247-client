interface MetricCardProps {
  label: string;
  value: number | string;
  description?: string;
}

export const MetricCard = ({ label, value, description }: MetricCardProps) => {
  return (
    <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
        {value}
      </p>
      {description ? (
        <p className="mt-1 text-xs text-slate-400">{description}</p>
      ) : null}
    </div>
  );
};
