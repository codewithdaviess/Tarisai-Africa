"use client";

import { useState } from "react";

type ContactEnquiryFormProps = {
  context?: string;
};

export default function ContactEnquiryForm({
  context,
}: ContactEnquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: true,
          context,
          fullName: formData.get("fullName"),
          email: formData.get("email"),
          whatsapp: formData.get("whatsapp"),
          phone: formData.get("phone"),
          arrival: formData.get("arrival"),
          duration: formData.get("duration"),
          travellers: Number(formData.get("travellers")),
          message: formData.get("message"),
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.message ?? "We could not send your enquiry.");
        return;
      }

      setReference(result.enquiry.reference);
      form.reset();
    } catch {
      setError("We could not send your enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (reference) {
    return (
      <div className="border border-neutral-200 bg-neutral-50 p-8 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-brand">
          Enquiry received
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900">
          Thanks for getting in touch.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-neutral-600">
          We have sent your enquiry to our team. We will review your details and
          get back to you soon.
        </p>
        <p className="mt-6 text-sm text-neutral-500">
          Reference: <span className="font-medium text-neutral-900">{reference}</span>
        </p>
        <button
          type="button"
          onClick={() => setReference("")}
          className="mt-8 text-sm font-medium text-brand hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12 space-y-6">
      {error && (
        <p role="alert" className="bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="fullName" className="mb-2 block text-sm font-medium">
          Full Name
        </label>
        <input id="fullName" name="fullName" type="text" required autoComplete="name" placeholder="Your full name" className="w-full border border-black/10 bg-black/2.5 px-4 py-3 text-sm outline-none transition-colors placeholder:text-black/35 focus:border-black/40" />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Email Address
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="w-full border border-black/10 bg-black/2.5 px-4 py-3 text-sm outline-none transition-colors placeholder:text-black/35 focus:border-black/40" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="whatsapp" className="mb-2 block text-sm font-medium">WhatsApp Number</label>
          <input id="whatsapp" name="whatsapp" type="tel" required autoComplete="tel" placeholder="+263..." className="w-full border border-black/10 bg-black/2.5 px-4 py-3 text-sm outline-none transition-colors placeholder:text-black/35 focus:border-black/40" />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">Phone Number <span className="text-xs font-normal text-black/40">Optional</span></label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+263..." className="w-full border border-black/10 bg-black/2.5 px-4 py-3 text-sm outline-none transition-colors placeholder:text-black/35 focus:border-black/40" />
        </div>
      </div>

      <div>
        <label htmlFor="arrival" className="mb-2 block text-sm font-medium">Preferred Travel Date</label>
        <input id="arrival" name="arrival" type="date" required className="block w-full min-w-0 appearance-none border border-black/10 bg-black/2.5 px-4 py-3 text-sm outline-none transition-colors focus:border-black/40" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="duration" className="mb-2 block text-sm font-medium">Trip Duration</label>
          <select id="duration" name="duration" required defaultValue="" className="w-full appearance-none border border-black/10 bg-black/2.5 px-4 py-3 text-sm outline-none transition-colors focus:border-black/40">
            <option value="" disabled>Select duration</option>
            <option value="1-2">1–2 days</option>
            <option value="3-4">3–4 days</option>
            <option value="5-7">5–7 days</option>
            <option value="8-14">8–14 days</option>
            <option value="14+">14+ days</option>
            <option value="unsure">Not sure yet</option>
          </select>
        </div>
        <div>
          <label htmlFor="travellers" className="mb-2 block text-sm font-medium">Number of Travellers</label>
          <input id="travellers" name="travellers" type="number" min="1" max="12" required placeholder="e.g. 2" className="w-full border border-black/10 bg-black/2.5 px-4 py-3 text-sm outline-none transition-colors placeholder:text-black/35 focus:border-black/40" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">Special Requests, Occasion or Anything Else We Should Know? <span className="ml-2 text-xs font-normal text-black/40">Optional</span></label>
        <textarea id="message" name="message" rows={5} placeholder="Tell us anything that may help us understand your plans..." className="w-full resize-none border border-black/10 bg-black/2.5 px-4 py-3 text-sm outline-none transition-colors placeholder:text-black/35 focus:border-black/40" />
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full bg-black px-6 py-4 text-sm font-medium text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50">
        {isSubmitting ? "Sending enquiry..." : "Start My Enquiry"}
      </button>
    </form>
  );
}