import Link from "next/link";

interface CreateBookingButtonProps {
  className?: string;
}

export const CreateBookingButton = ({
  className = "",
}: CreateBookingButtonProps) => {
  return (
    <Link
      href="/dashboard/bookings/new"
      className={`inline-flex items-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 ${className}`}
    >
      Create new booking
    </Link>
  );
};
