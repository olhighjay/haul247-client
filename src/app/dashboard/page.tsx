import Link from "next/link";
import { BookingMetricsOverview } from "@/components/bookings/booking-metrics-overview";
import { BookingsTable } from "@/components/bookings/bookings-table";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { EmptyState } from "@/components/ui/empty-state";
import { loadBookingsForUser } from "@/lib/booking-data";
import { isActiveBookingStatus } from "@/utils/booking-utils";
import { getAuthenticatedSession } from "@/lib/authentication";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await getAuthenticatedSession();

  if (!session) {
    redirect("/login");
  }

  const isAdmin = session.user.role === "admin";
  const { bookings, errorMessage } = await loadBookingsForUser(session.user);

  const activeBookings = bookings.filter((booking) =>
    isActiveBookingStatus(booking.status),
  );

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Dashboard"
        description="Overview of your freight operations"
      />

      <BookingMetricsOverview bookings={bookings} />

      {isAdmin ? (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Active bookings
            </h2>
            <Link
              href="/dashboard/bookings"
              className="text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              View all
            </Link>
          </div>

          {errorMessage ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : activeBookings.length > 0 ? (
            <BookingsTable bookings={bookings} />
          ) : (
            <EmptyState
              title="No active bookings"
              description="Create your first shipment booking to get started with Haul247."
              actionLabel="Create new booking"
              actionHref="/dashboard/bookings/new"
            />
          )}
        </section>
      ) : (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Your bookings
            </h2>
            <Link
              href="/dashboard/bookings"
              className="text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              View all
            </Link>
          </div>

          {errorMessage ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : activeBookings.length > 0 ? (
            <BookingsTable bookings={bookings} />
          ) : (
            <EmptyState
              title="No bookings yet"
              description="Create a shipment booking to see it listed here."
              actionLabel="Create new booking"
              actionHref="/dashboard/bookings/new"
            />
          )}
        </section>
      )}
    </div>
  );
};

export default DashboardPage;
