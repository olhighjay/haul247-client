import { NewBookingForm } from "@/components/bookings/new-booking-form";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { getAuthenticatedSession } from "@/lib/authentication";
import { redirect } from "next/navigation";

const NewBookingPage = async () => {
  const session = await getAuthenticatedSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <DashboardHeader
        title="New shipment booking"
        description="Schedule a new freight pickup and delivery"
      />

      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <NewBookingForm />
      </div>
    </div>
  );
};

export default NewBookingPage;
