"use client";

import { useState } from "react";
import Link from "next/link";
import AddToTripButton from "@/components/trip/AddToTripButton";
import { useTrip } from "@/components/trip/TripProvider";

type AccommodationBookingCardProps = {
  slug: string;
  name: string;
};

export default function AccommodationBookingCard({
  slug,
  name,
}: AccommodationBookingCardProps) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [validationAttempted, setValidationAttempted] = useState(false);
  const { hasItem } = useTrip();
  const item = {
    type: "accommodation" as const,
    slug,
    details: { checkIn, checkOut, guests },
  };
  const addedToTrip = hasItem(item);
  const datesAreValid = Boolean(checkIn && checkOut && checkOut > checkIn);

  function validateBeforeAdd() {
    setValidationAttempted(true);
    return datesAreValid;
  }

  return (
    <aside className="lg:self-start">
      <div className="border border-neutral-200 bg-white p-6">
        <h2 className="text-section-title font-semibold tracking-tight text-neutral-900">
          Enquire about {name}
        </h2>
        <p className="mt-4 text-sm leading-7 text-neutral-600">
          Choose your stay dates and number of guests before adding this accommodation to your trip.
        </p>

        <div className="mt-6 grid gap-4">
          <label className="text-sm font-medium text-neutral-900">
            Check-in
            <input
              type="date"
              value={checkIn}
              onChange={(event) => setCheckIn(event.target.value)}
              required
              aria-invalid={validationAttempted && !checkIn}
              className="mt-2 block w-full border border-neutral-300 px-3 py-3 text-sm font-normal outline-none focus:border-brand"
            />
            {validationAttempted && !checkIn && (
              <span className="mt-1 block text-xs font-normal text-red-600">
                Select a check-in date.
              </span>
            )}
          </label>
          <label className="text-sm font-medium text-neutral-900">
            Check-out
            <input
              type="date"
              min={checkIn || undefined}
              value={checkOut}
              onChange={(event) => setCheckOut(event.target.value)}
              required
              aria-invalid={validationAttempted && (!checkOut || checkOut <= checkIn)}
              className="mt-2 block w-full border border-neutral-300 px-3 py-3 text-sm font-normal outline-none focus:border-brand"
            />
            {validationAttempted && (!checkOut || checkOut <= checkIn) && (
              <span className="mt-1 block text-xs font-normal text-red-600">
                Select a check-out date after check-in.
              </span>
            )}
          </label>
        </div>

        <label className="mt-4 block text-sm font-medium text-neutral-900">
          Guests
          <input
            type="number"
            min="1"
            max="12"
            value={guests}
            onChange={(event) => setGuests(Math.max(1, Number(event.target.value)))}
            className="mt-2 block w-full border border-neutral-300 px-3 py-3 text-sm font-normal outline-none focus:border-brand"
          />
        </label>

        {addedToTrip ? (
          <Link
            href="/enquire"
            className="mt-6 block w-full bg-brand px-5 py-4 text-center text-sm font-medium text-white transition hover:bg-brand-hover"
          >
            Continue to enquiry
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="mt-6 block w-full cursor-not-allowed bg-neutral-300 px-5 py-4 text-center text-sm font-medium text-white"
          >
            Continue to enquiry
          </button>
        )}
        <AddToTripButton
          type="accommodation"
          slug={slug}
          details={{ checkIn, checkOut, guests }}
          onBeforeAdd={validateBeforeAdd}
          className="mt-3 block w-full"
        />
      </div>
    </aside>
  );
}
