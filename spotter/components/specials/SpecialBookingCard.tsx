"use client";

import { useState } from "react";

import DateSelector from "@/components/activities/booking/DateSelector";
import ParticipantSelector from "@/components/activities/booking/ParticipantSelector";
import {
  getSpecialFromPrice,
  getSpecialPricePerPerson,
  type Special,
} from "@/data/specials";
import { trackEvent } from "@/lib/research/trackEvent";
import AddToTripButton from "@/components/trip/AddToTripButton";

type SpecialBookingCardProps = {
  slug: string;
  duration: string;
  pricing: Special["pricing"];
};

export default function SpecialBookingCard({
  slug,
  duration,
  pricing,
}: SpecialBookingCardProps) {
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [hasChangedParticipants, setHasChangedParticipants] = useState(false);
  const people = adults + children;
  const pricePerPerson = getSpecialPricePerPerson(pricing, people);
  const fromPrice = getSpecialFromPrice(pricing);
  const total = pricePerPerson ? people * pricePerPerson : null;

  return (
    <aside>
      <div className="sticky top-8 border border-neutral-200 bg-white p-6">
        <div className="flex items-end justify-between border-b border-neutral-200 pb-5">
          <div>
            <p className="text-xs text-neutral-500">From per person</p>

            <p className="text-2xl font-semibold text-neutral-900">
              {pricing.currency} {fromPrice.toLocaleString()}
            </p>
          </div>

          <p className="text-sm text-neutral-500">{duration}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-neutral-900">
            Plan your experience
          </h2>

          <p className="mt-2 text-sm leading-6 text-neutral-600">
            Select your preferred date and number of participants to continue
            with your enquiry.
          </p>

          <DateSelector
            value={date}
            onChange={(value) => {
              setDate(value);

              if (value) {
                void trackEvent({
                  eventName: "date_selected",
                  page: window.location.pathname,
                  entityType: "special",
                  entitySlug: slug,
                });
              }
            }}
          />

          <ParticipantSelector
            adults={adults}
            children={children}
            onAdultsChange={(value) => {
              setAdults(value);
              setHasChangedParticipants(true);
            }}
            onChildrenChange={(value) => {
              setChildren(value);
              setHasChangedParticipants(true);
            }}
          />

          {pricePerPerson && total !== null ? (
            <div className="mt-6 border-neutral-200 pt-5">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">
                    Travellers × {people}
                  </span>

                  <span className="text-neutral-900">
                    {pricing.currency} {pricePerPerson.toLocaleString()} per person
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-neutral-200 pt-5">
                <span className="text-sm font-medium text-neutral-900">
                  Estimated total
                </span>

                <span className="text-xl font-semibold text-neutral-900">
                  {pricing.currency} {total.toLocaleString()}
                </span>
              </div>
            </div>
          ) : (
            <p className="mt-6 text-sm text-red-700">
              Please contact us for groups larger than 12 travellers.
            </p>
          )}

          <button
            type="button"
            disabled={!date || !pricePerPerson}
            onClick={() => {
              if (hasChangedParticipants) {
                void trackEvent({
                  eventName: "participant_changed",
                  page: window.location.pathname,
                  entityType: "special",
                  entitySlug: slug,
                  metadata: {
                    adults,
                    children,
                  },
                });
              }

              const params = new URLSearchParams({
                special: slug,
                date,
                adults: String(adults),
                children: String(children),
              });

              window.location.href = `/enquire?${params.toString()}`;
            }}
            className="mt-6 block w-full bg-brand px-5 py-4 text-center text-sm font-medium text-white transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:bg-neutral-300"
          >
            Continue to enquiry
          </button>
          <AddToTripButton
            type="special"
            slug={slug}
            details={{ date, adults, children }}
            disabled={!date || !pricePerPerson}
            disabledLabel="Select date and participants"
            className="mt-3 block w-full"
          />

          <p className="mt-3 text-center text-xs leading-5 text-neutral-500">
            No payment is required to send an enquiry. Final package price will
            be confirmed based on availability and your selected travel dates.
          </p>
        </div>
      </div>
    </aside>
  );
}