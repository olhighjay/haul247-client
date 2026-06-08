import { BookingStatusBadge } from "@/components/bookings/booking-status-badge";
import {
  formatCurrencyAmount,
  formatDate,
  formatDateTime,
  isActiveBookingStatus,
} from "@/utils/booking-utils";
import type { ShipmentBooking } from "@/types/booking";

interface BookingsTableProps {
  bookings: ShipmentBooking[];
  showAllBookings?: boolean;
}

export const BookingsTable = ({
  bookings,
  showAllBookings = false,
}: BookingsTableProps) => {
  const displayedBookings = showAllBookings
    ? bookings
    : bookings.filter((booking) => isActiveBookingStatus(booking.status));

  if (displayedBookings.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Reference
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Route
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Freight
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Pickup
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Created
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {displayedBookings.map((booking) => (
              <tr key={booking.uuid} className="hover:bg-slate-50/80">
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-900">
                  {booking.reference_number}
                </td>
                <td className="px-4 py-3">
                  <div className="max-w-xs">
                    <p className="truncate text-sm text-slate-900">
                      {booking.origin_address}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      → {booking.destination_address}
                    </p>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <BookingStatusBadge status={booking.status} />
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">
                  {formatCurrencyAmount(
                    booking.freight_amount,
                    booking.currency,
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                  {formatDateTime(booking.scheduled_pickup_at)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                  {formatDate(booking.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
