import type { CreateBookingRequest } from "@/types/booking";

export type BookingFormFields = {
  origin_address: string;
  destination_address: string;
  cargo_description: string;
  cargo_weight_kg: string;
  scheduled_pickup_at: string;
  freight_amount: string;
  currency: string;
};

export const validateBookingForm = (
  formState: BookingFormFields,
): Record<string, string[]> => {
  const errors: Record<string, string[]> = {};

  const originAddress = formState.origin_address.trim();
  if (!originAddress) {
    errors.origin_address = ["Origin address is required."];
  } else if (originAddress.length > 255) {
    errors.origin_address = ["Origin address must not exceed 255 characters."];
  }

  const destinationAddress = formState.destination_address.trim();
  if (!destinationAddress) {
    errors.destination_address = ["Destination address is required."];
  } else if (destinationAddress.length > 255) {
    errors.destination_address = [
      "Destination address must not exceed 255 characters.",
    ];
  }

  const cargoDescription = formState.cargo_description.trim();
  if (!cargoDescription) {
    errors.cargo_description = ["Cargo description is required."];
  } else if (cargoDescription.length > 1000) {
    errors.cargo_description = [
      "Cargo description must not exceed 1000 characters.",
    ];
  }

  if (!formState.cargo_weight_kg.trim()) {
    errors.cargo_weight_kg = ["Cargo weight is required."];
  } else {
    const cargoWeight = Number(formState.cargo_weight_kg);
    if (!Number.isInteger(cargoWeight)) {
      errors.cargo_weight_kg = ["Cargo weight must be a whole number."];
    } else if (cargoWeight < 1) {
      errors.cargo_weight_kg = ["Cargo weight must be at least 1 kg."];
    } else if (cargoWeight > 50000) {
      errors.cargo_weight_kg = ["Cargo weight must not exceed 50,000 kg."];
    }
  }

  if (!formState.scheduled_pickup_at) {
    errors.scheduled_pickup_at = ["Scheduled pickup is required."];
  } else {
    const pickupDate = new Date(formState.scheduled_pickup_at);
    if (Number.isNaN(pickupDate.getTime())) {
      errors.scheduled_pickup_at = ["Scheduled pickup must be a valid date."];
    } else if (pickupDate.getTime() <= Date.now()) {
      errors.scheduled_pickup_at = [
        "Scheduled pickup must be a date after now.",
      ];
    }
  }

  if (!formState.freight_amount.trim()) {
    errors.freight_amount = ["Freight amount is required."];
  } else {
    const freightAmount = Number(formState.freight_amount);
    if (Number.isNaN(freightAmount)) {
      errors.freight_amount = ["Freight amount must be a number."];
    } else if (freightAmount < 0.01) {
      errors.freight_amount = ["Freight amount must be at least 0.01."];
    }
  }

  const currency = formState.currency.trim().toUpperCase();
  if (!currency) {
    errors.currency = ["Currency is required."];
  } else if (currency.length !== 3) {
    errors.currency = ["Currency must be a 3-letter code."];
  }

  return errors;
};

export const toCreateBookingRequest = (
  formState: BookingFormFields,
): CreateBookingRequest => {
  return {
    origin_address: formState.origin_address.trim(),
    destination_address: formState.destination_address.trim(),
    cargo_description: formState.cargo_description.trim(),
    cargo_weight_kg: Number(formState.cargo_weight_kg),
    scheduled_pickup_at: new Date(formState.scheduled_pickup_at).toISOString(),
    freight_amount: Number(formState.freight_amount),
    currency: formState.currency.trim().toUpperCase(),
  };
};

export const getMinimumPickupDateTime = (): string => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 1);
  const offsetMilliseconds = now.getTimezoneOffset() * 60 * 1000;
  const localDate = new Date(now.getTime() - offsetMilliseconds);
  return localDate.toISOString().slice(0, 16);
};
