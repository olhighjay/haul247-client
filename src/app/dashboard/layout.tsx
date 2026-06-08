import { DashboardShellLayout } from "@/components/dashboard/dashboard-shell-layout";

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <DashboardShellLayout>{children}</DashboardShellLayout>;
};

export default DashboardLayout;
