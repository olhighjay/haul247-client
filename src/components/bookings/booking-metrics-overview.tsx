import { MetricCard } from "@/components/ui/metric-card";
import { calculateBookingMetrics } from "@/utils/booking-utils";
import type { ShipmentBooking } from "@/types/booking";

interface BookingMetricsOverviewProps {
  bookings: ShipmentBooking[];
}

export const BookingMetricsOverview = ({
  bookings,
}: BookingMetricsOverviewProps) => {
  const metrics = calculateBookingMetrics(bookings);

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard label="Total bookings" value={metrics.totalBookings} />
      <MetricCard label="Active bookings" value={metrics.activeBookings} />
      <MetricCard label="Pending" value={metrics.pendingBookings} />
      <MetricCard label="In transit" value={metrics.inTransitBookings} />
    </div>
  );
};
