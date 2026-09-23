"use client";

import { FormEvent, useState } from "react";

type ActivityEnquiryFormProps = {
  activity: string;
};

export function ActivityEnquiryForm({ activity }: ActivityEnquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      activity,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      date: formData.get("date"),
      adults: Number(formData.get("adults")),
      children: Number(formData.get("children")),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setError(
        "We couldn't send your enquiry. Please try again or contact us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="border border-neutral-200 bg-white p-8 md:p-10">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-xl text-brand">
          ✓
        </div>

        <h2 className="text-section-title font-semibold tracking-tight text-neutral-900">
          Enquiry received.
        </h2>

        <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-600">
          Thanks for getting in touch. Our team will review your enquiry and get
          back to you with availability and the next steps.
        </p>

        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-medium text-brand hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-neutral-200 bg-white p-4 md:p-8"
    >
      <div className="mb-8">
        <h2 className="mt-2 text-section-title font-semibold tracking-tight text-neutral-900">
          Activity enquiry
        </h2>

        <p className="mt-3 text-sm leading-6 text-neutral-600">
          Tell us about your plans. Give us a few details and our team will help
          you plan this experience.
        </p>
      </div>

      {/* Activity */}
      <div className="mb-6 border-b border-neutral-200 pb-6">
        <p className="text-xs text-neutral-500">You are enquiring about</p>

        <p className="mt-1 font-medium text-neutral-900">{activity}</p>
      </div>

      {/* Contact */}
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="text-sm font-medium text-neutral-900"
          >
            First name
          </label>

          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            placeholder="First name"
            className="mt-2 w-full border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="text-sm font-medium text-neutral-900"
          >
            Last name
          </label>

          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            placeholder="Last name"
            className="mt-2 w-full border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-neutral-900"
          >
            Email address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="mt-2 w-full border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="mt-5">
        <label htmlFor="phone" className="text-sm font-medium text-neutral-900">
          WhatsApp / phone number
        </label>

        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="+263 77 123 4567"
          className="mt-2 w-full border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand"
        />

        <p className="mt-2 text-xs text-neutral-500">
          Include your country code so our team can reach you.
        </p>
      </div>

      {/* Date */}
      <div className="mt-8 min-w-0">
        <label htmlFor="date" className="text-sm font-medium text-neutral-900">
          Preferred date
        </label>

        <input
          id="date"
          name="date"
          type="date"
          required
          className="mt-2 block w-full max-w-full min-w-0 appearance-none border border-neutral-300 bg-white px-4 py-3 text-sm outline-none box-border transition focus:border-brand"
        />

        <label className="mt-3 flex items-center gap-2 text-sm text-neutral-600">
          <input
            type="checkbox"
            name="flexibleDate"
            className="h-4 w-4 shrink-0 accent-brand"
          />
          My dates are flexible
        </label>
      </div>

      {/* Travellers */}
      <div className="mt-8">
        <p className="text-sm font-medium text-neutral-900">Travellers</p>

        <div className="mt-3 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="adults" className="text-xs text-neutral-500">
              Adults
            </label>

            <input
              id="adults"
              name="adults"
              type="number"
              min="1"
              defaultValue="1"
              required
              className="mt-2 w-full border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand"
            />
          </div>

          <div>
            <label htmlFor="children" className="text-xs text-neutral-500">
              Children
            </label>

            <input
              id="children"
              name="children"
              type="number"
              min="0"
              defaultValue="0"
              className="mt-2 w-full border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand"
            />
          </div>
        </div>
      </div>

      {/* Budget */}
      <div className="mt-8">
        <label
          htmlFor="budget"
          className="text-sm font-medium text-neutral-900"
        >
          Approximate budget
          <span className="ml-2 text-xs font-normal text-neutral-400">
            Optional
          </span>
        </label>

        <select
          id="budget"
          name="budget"
          defaultValue=""
          className="mt-2 w-full border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand"
        >
          <option value="">Prefer not to say</option>
          <option value="under-100">Under USD 100</option>
          <option value="100-250">USD 100 – 250</option>
          <option value="250-500">USD 250 – 500</option>
          <option value="500-plus">USD 500+</option>
        </select>
      </div>

      {/* Message */}
      <div className="mt-8">
        <label
          htmlFor="message"
          className="text-sm font-medium text-neutral-900"
        >
          Anything else we should know?
          <span className="ml-2 text-xs font-normal text-neutral-400">
            Optional
          </span>
        </label>

        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us anything that would help us understand your plans..."
          className="mt-2 w-full resize-none border border-neutral-300 px-4 py-3 text-sm leading-6 outline-none transition focus:border-brand"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-8 w-full bg-brand px-5 py-4 text-sm font-medium text-white transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending enquiry..." : "Send Enquiry"}
      </button>

      <p className="mt-4 text-center text-xs leading-5 text-neutral-500">
        This is an enquiry, not a confirmed booking. Our team will contact you
        to confirm availability and details.
      </p>
    </form>
  );
}
