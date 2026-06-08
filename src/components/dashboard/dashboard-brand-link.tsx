import Link from "next/link";

interface DashboardBrandLinkProps {
  onClick?: () => void;
  compact?: boolean;
}

export const DashboardBrandLink = ({
  onClick,
  compact = false,
}: DashboardBrandLinkProps) => {
  return (
    <Link
      href="/dashboard"
      className="flex items-center gap-2"
      onClick={onClick}
    >
      <div
        className={`flex items-center justify-center rounded-lg bg-brand-600 font-bold text-white ${
          compact ? "h-8 w-8 text-xs" : "h-9 w-9 text-sm"
        }`}
      >
        H
      </div>
      {compact ? (
        <span className="text-sm font-semibold text-slate-900">Haul247</span>
      ) : (
        <div>
          <p className="text-sm font-semibold text-slate-900">Haul247</p>
          <p className="text-xs text-slate-500">Freight Dashboard</p>
        </div>
      )}
    </Link>
  );
};
