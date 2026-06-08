"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FormField } from "@/components/bookings/form-field";
import { postAppRoute } from "@/lib/http-client";
import {
  getMinimumPickupDateTime,
  toCreateBookingRequest,
  validateBookingForm,
  type BookingFormFields,
} from "@/utils/booking-form-validation";
import type { ShipmentBooking } from "@/types/booking";

type BookingFormState = BookingFormFields;

const initialFormState: BookingFormState = {
  origin_address: "",
  destination_address: "",
  cargo_description: "",
  cargo_weight_kg: "",
  scheduled_pickup_at: "",
  freight_amount: "",
  currency: "NGN",
};

export const NewBookingForm = () => {
  const router = useRouter();
  const [formState, setFormState] = useState<BookingFormState>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const minimumPickupDateTime = useMemo(() => getMinimumPickupDateTime(), []);

  const updateField = (field: keyof BookingFormState, value: string) => {
    setFormState((previous) => ({ ...previous, [field]: value }));
    setFieldErrors((previous) => {
      const updated = { ...previous };
      delete updated[field];
      return updated;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const validationErrors = validateBookingForm(formState);

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    setFieldErrors({});
    setIsLoading(true);

    try {
      const payload = await postAppRoute<ShipmentBooking>(
        "/api/shipment-bookings",
        toCreateBookingRequest(formState),
      );

      if (!payload.status) {
        if (payload.errors) {
          setFieldErrors(payload.errors);
        }
        setErrorMessage(payload.message ?? "Failed to create booking.");
        setIsLoading(false);
        return;
      }

      toast.success("Booking created successfully");
      router.push("/dashboard/bookings");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to create booking. Please try again.";
      setErrorMessage(message);
      setIsLoading(false);
    }
  };

  const getFieldError = (field: string): string | undefined => {
    return fieldErrors[field]?.[0];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMessage ? (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errorMessage}
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          id="origin_address"
          label="Origin address"
          value={formState.origin_address}
          onChange={(value) => updateField("origin_address", value)}
          error={getFieldError("origin_address")}
          placeholder="Lagos, Nigeria"
        />
        <FormField
          id="destination_address"
          label="Destination address"
          value={formState.destination_address}
          onChange={(value) => updateField("destination_address", value)}
          error={getFieldError("destination_address")}
          placeholder="Abuja, Nigeria"
        />
      </div>

      <FormField
        id="cargo_description"
        label="Cargo description"
        value={formState.cargo_description}
        onChange={(value) => updateField("cargo_description", value)}
        error={getFieldError("cargo_description")}
        placeholder="Building materials"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          id="cargo_weight_kg"
          label="Cargo weight (kg)"
          type="number"
          min={1}
          max={50000}
          value={formState.cargo_weight_kg}
          onChange={(value) => updateField("cargo_weight_kg", value)}
          error={getFieldError("cargo_weight_kg")}
          placeholder="1500"
        />
        <FormField
          id="scheduled_pickup_at"
          label="Scheduled pickup"
          type="datetime-local"
          value={formState.scheduled_pickup_at}
          onChange={(value) => updateField("scheduled_pickup_at", value)}
          error={getFieldError("scheduled_pickup_at")}
          min={minimumPickupDateTime}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          id="freight_amount"
          label="Freight amount"
          type="number"
          min={0.01}
          step="0.01"
          value={formState.freight_amount}
          onChange={(value) => updateField("freight_amount", value)}
          error={getFieldError("freight_amount")}
          placeholder="320000"
        />
        <FormField
          id="currency"
          label="Currency"
          value={formState.currency}
          onChange={(value) => updateField("currency", value)}
          error={getFieldError("currency")}
          maxLength={3}
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Creating…" : "Create booking"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
