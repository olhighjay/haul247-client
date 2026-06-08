import {
  fetchMyShipmentBookings,
  fetchShipmentBookings,
} from "@/lib/api-client";
import { ApiRequestError } from "@/types/api";
import type { AuthenticatedUser } from "@/types/auth";
import type { ShipmentBooking } from "@/types/booking";

interface BookingDataResult {
  bookings: ShipmentBooking[];
  errorMessage: string | null;
}

export const loadBookingsForUser = async (
  user: AuthenticatedUser,
): Promise<BookingDataResult> => {
  try {
    const bookingList =
      user.role === "admin"
        ? await fetchShipmentBookings()
        : await fetchMyShipmentBookings();

    return {
      bookings: bookingList.bookings,
      errorMessage: null,
    };
  } catch (error) {
    if (error instanceof ApiRequestError) {
      return {
        bookings: [],
        errorMessage: error.message,
      };
    }

    return {
      bookings: [],
      errorMessage: "Failed to load bookings.",
    };
  }
};
