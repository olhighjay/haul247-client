import type { BookingStatus, ShipmentBooking } from "@/types/booking";

export const isActiveBookingStatus = (status: BookingStatus): boolean => {
  return status !== "delivered" && status !== "cancelled";
};

export const calculateBookingMetrics = (bookings: ShipmentBooking[]) => {
  return {
    totalBookings: bookings.length,
    activeBookings: bookings.filter((booking) =>
      isActiveBookingStatus(booking.status),
    ).length,
    pendingBookings: bookings.filter(
      (booking) => booking.status === "pending",
    ).length,
    inTransitBookings: bookings.filter(
      (booking) => booking.status === "in_transit",
    ).length,
  };
};

export const formatCurrencyAmount = (
  amount: string,
  currency: string,
): string => {
  const numericAmount = Number(amount);

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(numericAmount);
};

export const formatDateTime = (isoDate: string): string => {
  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(isoDate));
};

export const formatDate = (isoDate: string): string => {
  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
  }).format(new Date(isoDate));
};
