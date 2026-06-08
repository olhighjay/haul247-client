import axios from "axios";
import {
  getAuthenticatedSession,
  persistAuthenticationSession,
} from "@/lib/authentication";
import { apiGet, apiPost } from "@/lib/http-client";
import { ApiRequestError } from "@/types/api";
import type { AuthenticatedSession } from "@/types/auth";
import type {
  BookingListResponseData,
  CreateBookingRequest,
  HealthCheckData,
  ShipmentBooking,
} from "@/types/booking";

export { getApiBaseUrl } from "@/lib/http-client";

const refreshSession = async (
  session: AuthenticatedSession,
): Promise<AuthenticatedSession | null> => {
  if (!session.refreshToken) {
    return null;
  }

  try {
    const refreshed = await apiPost<{
      user: AuthenticatedSession["user"];
      tokens: {
        access_token: string;
        refresh_token: string;
        token_type: string;
        expires_in: number;
      };
    }>("/auth/refresh", { refresh_token: session.refreshToken });

    await persistAuthenticationSession(refreshed.user, refreshed.tokens);

    return {
      user: refreshed.user,
      accessToken: refreshed.tokens.access_token,
      refreshToken: refreshed.tokens.refresh_token,
    };
  } catch {
    return null;
  }
};

const withAuthenticatedSession = async <Data>(
  request: (accessToken: string) => Promise<Data>,
): Promise<Data> => {
  const session = await getAuthenticatedSession();

  if (!session) {
    throw new ApiRequestError("Authentication required", 401);
  }

  try {
    return await request(session.accessToken);
  } catch (error) {
    const isUnauthorized =
      axios.isAxiosError(error) && error.response?.status === 401;

    if (!isUnauthorized || !session.refreshToken) {
      throw error;
    }

    const refreshedSession = await refreshSession(session);

    if (!refreshedSession) {
      throw new ApiRequestError("Session expired", 401);
    }

    return request(refreshedSession.accessToken);
  }
};

export const fetchHealthStatus = (): Promise<HealthCheckData> => {
  return apiGet<HealthCheckData>("/health");
};

export const fetchShipmentBookings = (
  page = 1,
): Promise<BookingListResponseData> => {
  return withAuthenticatedSession((accessToken) =>
    apiGet<BookingListResponseData>(
      `/shipment-bookings?page=${page}`,
      accessToken,
    ),
  );
};

export const fetchMyShipmentBookings = (
  page = 1,
): Promise<BookingListResponseData> => {
  return withAuthenticatedSession((accessToken) =>
    apiGet<BookingListResponseData>(
      `/my-shipment-bookings?page=${page}`,
      accessToken,
    ),
  );
};

export const createShipmentBooking = (
  bookingData: CreateBookingRequest,
): Promise<ShipmentBooking> => {
  return withAuthenticatedSession((accessToken) =>
    apiPost<ShipmentBooking>("/shipment-bookings", bookingData, accessToken),
  );
};
