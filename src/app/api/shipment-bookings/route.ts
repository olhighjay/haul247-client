import { NextResponse } from "next/server";
import { createShipmentBooking } from "@/lib/api-client";
import type { CreateBookingRequest } from "@/types/booking";
import { ApiRequestError } from "@/types/api";

export const POST = async (request: Request) => {
  try {
    const bookingData = (await request.json()) as CreateBookingRequest;
    const booking = await createShipmentBooking(bookingData);

    return NextResponse.json({
      status: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    if (error instanceof ApiRequestError) {
      return NextResponse.json(
        {
          status: false,
          message: error.message,
          errors: error.errors,
        },
        { status: error.statusCode },
      );
    }

    return NextResponse.json(
      { status: false, message: "Failed to create booking" },
      { status: 500 },
    );
  }
};
