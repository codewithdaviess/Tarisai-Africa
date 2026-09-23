"use client";

import { FormEvent, useRef, useState } from "react";

import { trackEvent } from "@/lib/research/trackEvent";

type TravellerDetailsFormProps = {
  activity?: string;
  special?: string;
  date: string;
  adults: number;
  children: number;
  onSuccess: (reference: string) => void;
};

export default function TravellerDetailsForm({
  activity,
  special,
  date,
  adults,
  children,
  onSuccess,
}: TravellerDetailsFormProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [discoverySource, setDiscoverySource] = useState("");
  const discoverySourceTracked = useRef(false);

  const enquiryType = special ? "special" : "activity";
  const enquirySlug = special || activity;

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.phone.trim()
    ) {
      setError("Please complete all required fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activity,
          special,
          date,
          adults,
          children,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          country: form.country,
          message: form.message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Something went wrong. Please try again.");
        return;
      }

      await trackEvent({
        eventName: "enquiry_submitted",
        page: "/enquire",
        entityType: enquiryType,
        entitySlug: enquirySlug,
      });

      onSuccess(result.enquiry.reference);
    } catch {
      setError(
        "We couldn't send your enquiry. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-neutral-200 p-6 sm:p-8"
    >
      <div>
        <p className="text-eyebrow font-medium uppercase tracking-[0.12em] text-brand">
          Traveller details
        </p>

        <h2 className="mt-2 text-section-title font-semibold tracking-tight text-neutral-900">
          Tell us about yourself
        </h2>

        <p className="mt-2 text-sm leading-6 text-neutral-600">
          We'll use these details to respond to your enquiry and help arrange
          your experience.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="text-sm font-medium text-neutral-900"
          >
            First name *
          </label>

          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First name"
            required
            className="mt-2 block w-full border border-neutral-300 bg-white px-3 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-brand"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="text-sm font-medium text-neutral-900"
          >
            Last name *
          </label>

          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last name"
            required
            className="mt-2 block w-full border border-neutral-300 bg-white px-3 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-brand"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-neutral-900"
          >
            Email address *
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className="mt-2 block w-full border border-neutral-300 bg-white px-3 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-brand"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="text-sm font-medium text-neutral-900"
          >
            Phone number *
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+263..."
            required
            className="mt-2 block w-full border border-neutral-300 bg-white px-3 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-brand"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="country"
            className="text-sm font-medium text-neutral-900"
          >
            Country{" "}
            <span className="font-normal text-neutral-400">(optional)</span>
          </label>

          <input
            id="country"
            name="country"
            type="text"
            autoComplete="country-name"
            value={form.country}
            onChange={handleChange}
            placeholder="Country of residence"
            className="mt-2 block w-full border border-neutral-300 bg-white px-3 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-brand"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="discoverySource"
            className="text-sm font-medium text-neutral-900"
          >
            How did you hear about us?
          </label>

          <select
            id="discoverySource"
            name="discoverySource"
            value={discoverySource}
            onChange={(event) => {
              const value = event.target.value;
              setDiscoverySource(value);

              if (value && !discoverySourceTracked.current) {
                discoverySourceTracked.current = true;

                void trackEvent({
                  eventName: "discovery_source_answered",
                  page: "/enquire",
                  entityType: enquiryType,
                  entitySlug: enquirySlug,
                  metadata: { source: value },
                });
              }
            }}
            className="mt-2 block w-full border border-neutral-300 bg-white px-3 py-3 text-sm text-neutral-900 outline-none transition focus:border-brand"
          >
            <option value="">Select a source</option>
            <option value="google">Google</option>
            <option value="tripadvisor">Tripadvisor</option>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="friend_family">Friend / family</option>
            <option value="travel_agent">Travel agent</option>
            <option value="direct">Direct</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="text-sm font-medium text-neutral-900"
          >
            Message{" "}
            <span className="font-normal text-neutral-400">(optional)</span>
          </label>

          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder="Anything else you'd like us to know?"
            className="mt-2 block w-full resize-none border border-neutral-300 bg-white px-3 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-brand"
          />
        </div>
      </div>

      <div className="mt-8 border-t border-neutral-200 pt-6">
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-brand px-5 py-4 text-sm font-medium text-white transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:bg-neutral-300"
        >
          {submitting ? "Sending enquiry..." : "Send enquiry"}
        </button>

        <p className="mt-3 text-center text-xs leading-5 text-neutral-500">
          No payment is required to send an enquiry. Your enquiry does not
          confirm a booking.
        </p>
      </div>
    </form>
  );
}
