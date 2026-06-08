"use client";

import { useEffect, useState } from "react";
import { DashboardBrandLink } from "@/components/dashboard/dashboard-brand-link";
import { SidebarContent } from "@/components/dashboard/sidebar-content";
import { CloseIcon } from "@/components/icons/close-icon";
import { MenuIcon } from "@/components/icons/menu-icon";
import { UserAvatar } from "@/components/user/user-avatar";
import type { AuthenticatedUser } from "@/types/auth";

interface DashboardShellProps {
  user: AuthenticatedUser;
  children: React.ReactNode;
}

export const DashboardShell = ({ user, children }: DashboardShellProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen lg:flex">
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-border lg:bg-white">
        <div className="px-6 py-4">
          <DashboardBrandLink />
        </div>
        <SidebarContent user={user} />
      </aside>

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-slate-900/50"
            onClick={closeMobileMenu}
          />
          <aside className="relative flex h-full w-72 max-w-[85vw] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="px-2 py-2">
                <DashboardBrandLink onClick={closeMobileMenu} />
              </div>
              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close navigation menu"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <CloseIcon />
              </button>
            </div>
            <SidebarContent user={user} onNavigate={closeMobileMenu} />
          </aside>
        </div>
      ) : null}

      <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-white px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
          >
            <MenuIcon />
          </button>
          <div className="lg:hidden">
            <DashboardBrandLink compact />
          </div>
          <div className="ml-auto">
            <UserAvatar name={user.name} size="medium" />
          </div>
        </header>

        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
