"use client";

import { useState } from "react";

import { useTrip } from "@/components/trip/TripProvider";
import { accommodations } from "@/data/accommodations";
import { activities } from "@/data/activities";
import { specials } from "@/data/specials";
import { transfers } from "@/data/transfers";

type TripEnquiryFormProps = {
  onSuccess: (reference: string) => void;
};

export default function TripEnquiryForm({ onSuccess }: TripEnquiryFormProps) {
  const { items, clear } = useTrip();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });

  const names = items.map((item) => {
    const product =
      item.type === "activity"
        ? activities.find((entry) => entry.slug === item.slug)
        : item.type === "special"
          ? specials.find((entry) => entry.slug === item.slug)
          : item.type === "accommodation"
            ? accommodations.find((entry) => entry.slug === item.slug)
            : transfers.find((entry) => entry.slug === item.slug);
    const details = item.details;
    const bookingDetails = details
      ? [
          details.checkIn && `Check-in ${details.checkIn}`,
          details.checkOut && `Check-out ${details.checkOut}`,
          details.date && `Date ${details.date}`,
          details.guests && `${details.guests} guests`,
          details.passengers && `${details.passengers} passengers`,
          details.adults && `${details.adults} adults`,
          details.children !== undefined && `${details.children} children`,
        ].filter(Boolean).join(" · ")
      : "";
    return `${product?.name ?? item.slug}${bookingDetails ? ` (${bookingDetails})` : ""}`;
  });

  function update(name: string, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          ...form,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.message ?? "We could not send your enquiry.");
        return;
      }

      clear();
      onSuccess(result.enquiry.reference);
    } catch {
      setError("We could not send your enquiry. Please try again.");
    }
  }

  return (
    <form onSubmit={submit} className="mt-10 space-y-6">
      <div className="border-t border-neutral-200 pt-5">
        <p className="text-xs uppercase tracking-[0.15em] text-neutral-400">Your requested trip</p>
        <ul className="mt-3 space-y-2 text-sm text-neutral-700">
          {names.map((name, index) => <li key={`${name}-${index}`}>{name}</li>)}
        </ul>
      </div>

      {error && <p className="bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <div className="grid gap-5 sm:grid-cols-2">
        {[
          ["firstName", "First name", "text"],
          ["lastName", "Last name", "text"],
          ["email", "Email address", "email"],
          ["phone", "Phone number", "tel"],
          ["country", "Country", "text"],
        ].map(([name, label, type]) => (
          <label key={name} className="text-sm font-medium text-neutral-900">
            {label}
            <input
              name={name}
              type={type}
              value={form[name as keyof typeof form]}
              onChange={(event) => update(name, event.target.value)}
              required={name !== "country"}
              className="mt-2 block w-full border border-neutral-300 px-3 py-3 text-sm font-normal outline-none focus:border-brand"
            />
          </label>
        ))}
      </div>

      <label className="block text-sm font-medium text-neutral-900">
        Message
        <textarea
          name="message"
          rows={5}
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          className="mt-2 block w-full resize-none border border-neutral-300 px-3 py-3 text-sm font-normal outline-none focus:border-brand"
        />
      </label>

      <button type="submit" className="bg-brand px-6 py-4 text-sm font-medium text-white hover:bg-neutral-900">
        Send trip enquiry
      </button>
    </form>
  );
}
