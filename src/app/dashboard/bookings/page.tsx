import Link from "next/link";
import { BookingsTable } from "@/components/bookings/bookings-table";
import { CreateBookingButton } from "@/components/bookings/create-booking-button";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { EmptyState } from "@/components/ui/empty-state";
import { loadBookingsForUser } from "@/lib/booking-data";
import { getAuthenticatedSession } from "@/lib/authentication";
import { redirect } from "next/navigation";

const BookingsPage = async () => {
  const session = await getAuthenticatedSession();

  if (!session) {
    redirect("/login");
  }

  const isAdmin = session.user.role === "admin";
  const { bookings, errorMessage } = await loadBookingsForUser(session.user);

  return (
    <div className="space-y-8">
      <DashboardHeader
        title={isAdmin ? "All bookings" : "My bookings"}
        description={
          isAdmin
            ? "View and manage all shipment bookings"
            : "Your shipment booking history"
        }
        action={<CreateBookingButton />}
      />

      {errorMessage ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : bookings.length > 0 ? (
        <BookingsTable bookings={bookings} showAllBookings />
      ) : (
        <EmptyState
          title="No bookings yet"
          description="Create your first shipment booking to get started."
          actionLabel="Create new booking"
          actionHref="/dashboard/bookings/new"
        />
      )}

      {bookings.length > 0 ? (
        <p className="text-sm text-slate-500">
          Showing {bookings.length} booking{bookings.length === 1 ? "" : "s"}.
          <Link
            href="/dashboard/bookings/new"
            className="ml-2 font-medium text-brand-600 hover:text-brand-700"
          >
            Create another
          </Link>
        </p>
      ) : null}
    </div>
  );
};

export default BookingsPage;
