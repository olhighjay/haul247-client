export const DashboardContentLoader = () => {
  return (
    <div
      className="flex min-h-[320px] flex-col items-center justify-center gap-4"
      role="status"
      aria-live="polite"
      aria-label="Loading dashboard"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600" />
      <p className="text-sm text-slate-500">Loading dashboard…</p>
    </div>
  );
};
