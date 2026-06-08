import { DashboardNavLink } from "@/components/dashboard/dashboard-nav-link";
import { dashboardNavigationItems } from "@/components/dashboard/dashboard-navigation-items";
import { LogoutButton } from "@/components/auth/logout-button";
import { UserAvatar } from "@/components/user/user-avatar";
import type { AuthenticatedUser } from "@/types/auth";

interface SidebarContentProps {
  user: AuthenticatedUser;
  onNavigate?: () => void;
}

export const SidebarContent = ({ user, onNavigate }: SidebarContentProps) => {
  return (
    <>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {dashboardNavigationItems.map((item) => (
          <DashboardNavLink
            key={item.href}
            href={item.href}
            label={item.label}
            exact={item.exact}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <div className="border-t border-border px-4 py-4">
        <div className="mb-3 flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2">
          <UserAvatar name={user.name} size="small" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-900">
              {user.name}
            </p>
            <p className="truncate text-xs capitalize text-slate-500">
              {user.role}
            </p>
          </div>
        </div>
        <LogoutButton />
      </div>
    </>
  );
};
