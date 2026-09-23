"use client";

import { useState } from "react";
import AddToTripButton from "@/components/trip/AddToTripButton";

type TransferBookingCardProps = {
  slug: string;
  name: string;
};

export default function TransferBookingCard({
  slug,
  name,
}: TransferBookingCardProps) {
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="border border-neutral-200 bg-white p-6">
        <h2 className="text-section-title font-semibold tracking-tight text-neutral-900">
          Add {name}
        </h2>
        <p className="mt-4 text-sm leading-7 text-neutral-600">
          Choose the transfer date and number of passengers before adding this service to your trip.
        </p>

        <label className="mt-6 block text-sm font-medium text-neutral-900">
          Transfer date
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
            className="mt-2 block w-full border border-neutral-300 px-3 py-3 text-sm font-normal outline-none focus:border-brand"
          />
        </label>

        <label className="mt-4 block text-sm font-medium text-neutral-900">
          Passengers
          <input
            type="number"
            min="1"
            max="12"
            value={passengers}
            onChange={(event) => setPassengers(Math.max(1, Number(event.target.value)))}
            className="mt-2 block w-full border border-neutral-300 px-3 py-3 text-sm font-normal outline-none focus:border-brand"
          />
        </label>

        <AddToTripButton
          type="transfer"
          slug={slug}
          details={{ date, passengers }}
          disabled={!date}
          disabledLabel="Select date and passengers"
          className="mt-6 block w-full"
        />
      </div>
    </aside>
  );
}
