"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { accommodations } from "@/data/accommodations";
import { activities } from "@/data/activities";
import { specials } from "@/data/specials";
import { transfers } from "@/data/transfers";
import { useTrip } from "./TripProvider";

export default function TripFloatingButton() {
  const { items, count, removeItem, clear } = useTrip();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (count === 0) {
    return null;
  }

  const products = items.map((item) => {
    const product =
      item.type === "activity"
        ? activities.find((entry) => entry.slug === item.slug)
        : item.type === "special"
          ? specials.find((entry) => entry.slug === item.slug)
          : item.type === "accommodation"
            ? accommodations.find((entry) => entry.slug === item.slug)
            : transfers.find((entry) => entry.slug === item.slug);

    return { item, name: product?.name ?? item.slug };
  });

  return (
    <>
      <div className="fixed inset-x-0 bottom-5 z-40 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl justify-end">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label={`Open My Trip with ${count} ${count === 1 ? "item" : "items"}`}
            className="inline-flex items-center gap-2 rounded-full bg-earth px-4 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-brand"
          >
            <ShoppingCart size={18} />
            <span>My Trip</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-semibold text-earth">
              {count}
            </span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-neutral-950/60 px-4 py-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="trip-modal-title"
            className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden bg-white"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-6 py-5 shadow-xs sm:px-8">
              <h2
                id="trip-modal-title"
                className="text-section-title font-semibold tracking-tight text-neutral-900"
              >
                My Trip ({count})
              </h2>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close dialog"
                className="shrink-0 text-2xl leading-none text-neutral-500 transition-colors hover:text-neutral-900"
              >
                ×
              </button>
            </div>

            <div className="min-h-0 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
              <div className="space-y-5">
                {products.map(({ item, name }) => (
                  <div
                    key={`${item.type}-${item.slug}`}
                    className="flex items-center justify-between gap-4 border-t border-neutral-200 pt-5 first:border-t-0 first:pt-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs uppercase tracking-[0.15em] text-neutral-400">
                        {item.type}
                      </p>
                      <p className="truncate font-medium text-neutral-900">{name}</p>
                      {item.details && (
                        <p className="mt-1 text-xs text-neutral-500">
                          {item.details.checkIn && `Check-in: ${item.details.checkIn}`}
                          {item.details.checkOut && ` · Check-out: ${item.details.checkOut}`}
                          {item.details.date && `Date: ${item.details.date}`}
                          {item.details.guests && ` · ${item.details.guests} guests`}
                          {item.details.passengers && ` · ${item.details.passengers} passengers`}
                          {item.details.adults && ` · ${item.details.adults} adults`}
                          {item.details.children !== undefined && ` · ${item.details.children} children`}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item)}
                      aria-label={`Remove ${name}`}
                      className="shrink-0 text-sm text-neutral-500 underline underline-offset-4 transition hover:text-neutral-900"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={clear}
                className="mt-8 text-sm text-neutral-500 underline underline-offset-4 transition hover:text-neutral-900"
              >
                Clear cart
              </button>

              <div className="sticky bottom-0 mt-8 border-t border-neutral-200 bg-white pt-5">
              <Link
                href="/enquire"
                onClick={() => setIsOpen(false)}
                className="block bg-brand px-5 py-4 text-center text-sm font-medium text-white transition hover:bg-brand-hover"
              >
                Continue to enquiry
              </Link>
              <p className="mt-3 text-center text-xs leading-5 text-neutral-500">
                Add your travel dates and traveller details on the enquiry page.
              </p>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}