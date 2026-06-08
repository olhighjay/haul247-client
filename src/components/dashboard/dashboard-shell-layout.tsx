"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardContentLoader } from "@/components/dashboard/dashboard-content-loader";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { useAuthenticatedUser } from "@/hooks/use-authenticated-user";
import { hasClientAuthenticationCookies } from "@/utils/client-user-storage";

interface DashboardShellLayoutProps {
  children: React.ReactNode;
}

export const DashboardShellLayout = ({
  children,
}: DashboardShellLayoutProps) => {
  const router = useRouter();
  const user = useAuthenticatedUser();

  useEffect(() => {
    if (!user && !hasClientAuthenticationCookies()) {
      router.replace("/login");
    }
  }, [user, router]);

    return (
      <>
      {!user ? (
        <div className="flex min-h-screen items-center justify-center bg-surface">
          <DashboardContentLoader />
        </div>
      ) : (
        <DashboardShell user={user}>{children}</DashboardShell>
      )}
      </>
    );
};
