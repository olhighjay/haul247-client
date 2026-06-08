export type BookingStatus =
  | "pending"
  | "confirmed"
  | "in_transit"
  | "delivered"
  | "cancelled";

export interface BookingCreator {
  uuid: string;
  name: string;
}

export interface ShipmentBooking {
  uuid: string;
  reference_number: string;
  origin_address: string;
  destination_address: string;
  cargo_description: string;
  cargo_weight_kg: number;
  scheduled_pickup_at: string;
  status: BookingStatus;
  freight_amount: string;
  currency: string;
  truck: unknown | null;
  created_by?: BookingCreator;
  created_at: string;
  updated_at: string;
}

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface BookingListResponseData {
  bookings: ShipmentBooking[];
  pagination: PaginationMeta;
}

export interface CreateBookingRequest {
  origin_address: string;
  destination_address: string;
  cargo_description: string;
  cargo_weight_kg: number;
  scheduled_pickup_at: string;
  freight_amount: number;
  currency: string;
}

export interface HealthCheckData {
  service: string;
  environment: string;
  checks: {
    application: string;
    database: string;
  };
  timestamp: string;
}
