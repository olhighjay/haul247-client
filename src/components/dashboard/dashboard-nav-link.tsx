"use client";

import Link from "next/link";
import { useActivePath } from "@/hooks/use-active-path";

interface DashboardNavLinkProps {
  href: string;
  label: string;
  exact?: boolean;
  onNavigate?: () => void;
}

export const DashboardNavLink = ({
  href,
  label,
  exact = false,
  onNavigate,
}: DashboardNavLinkProps) => {
  const isActive = useActivePath(href, { exact });

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
        isActive
          ? "bg-brand-50 text-brand-700"
          : "text-slate-600 hover:bg-brand-50 hover:text-brand-700"
      }`}
    >
      {label}
    </Link>
  );
};
