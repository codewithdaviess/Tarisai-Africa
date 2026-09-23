"use client";
import { useState } from "react";
import ParticipantSelector from "./ParticipantSelector";
import DateSelector from "./DateSelector";
import PriceSummary from "./PriceSummary";
import { trackEvent } from "@/lib/research/trackEvent";
import AddToTripButton from "@/components/trip/AddToTripButton";

type ActivityBookingCardProps = {
  slug: string;
  pricing: {
    adult: {
      amount: number;
      currency: string;
      label: string;
    };
    child: {
      amount: number;
      currency: string;
      label: string;
    };
  };
  duration: string;
};

export default function ActivityBookingCard({
  slug,
  pricing,
  duration,
}: ActivityBookingCardProps) {
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [hasChangedParticipants, setHasChangedParticipants] = useState(false);
  const total = adults * pricing.adult.amount + children * pricing.child.amount;
  return (
    <aside>
      <div className="sticky top-8 border border-neutral-200 bg-white p-6">
        {/* Price */}
        <div className="flex items-end justify-between border-b border-neutral-200 pb-5">
          <div>
            <p className="text-xs text-neutral-500">{pricing.adult.label}</p>

            <p className="text-2xl font-semibold text-neutral-900">
              {pricing.adult.currency} {pricing.adult.amount}
            </p>
          </div>

          <p className="text-sm text-neutral-500">{duration}</p>
        </div>

        {/* Booking */}
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
                  entityType: "activity",
                  entitySlug: slug,
                });
              }
            }}
          />

          {/* Participants */}
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

          <PriceSummary
            adults={adults}
            children={children}
            adultPrice={pricing.adult.amount}
            childPrice={pricing.child.amount}
            currency={pricing.adult.currency}
          />

          <button
            type="button"
            disabled={!date}
            onClick={() => {
              if (hasChangedParticipants) {
                void trackEvent({
                  eventName: "participant_changed",
                  page: window.location.pathname,
                  entityType: "activity",
                  entitySlug: slug,
                  metadata: {
                    adults,
                    children,
                  },
                });
              }

              const params = new URLSearchParams({
                activity: slug,
                date,
                adults: String(adults),
                children: String(children),
                total: String(total),
              });

              window.location.href = `/enquire?${params.toString()}`;
            }}
            className="mt-6 block w-full bg-brand px-5 py-4 text-center text-sm font-medium text-white transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:bg-neutral-300"
          >
            Continue to enquiry
          </button>
          <AddToTripButton
            type="activity"
            slug={slug}
            details={{ date, adults, children }}
            disabled={!date}
            disabledLabel="Select date and participants"
            className="mt-3 block w-full"
          />
          <p className="mt-3 text-center text-xs leading-5 text-neutral-500">
            No payment is required to send an enquiry.
          </p>
        </div>
      </div>
    </aside>
  );
}
