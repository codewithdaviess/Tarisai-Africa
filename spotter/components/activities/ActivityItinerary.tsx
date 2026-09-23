"use client";

import { useState } from "react";

import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "../experiences/ExperienceSectionSubHeading";
import { trackEvent } from "@/lib/research/trackEvent";

type ItineraryItem = {
  time: string;
  title: string;
  description: string;
};

type ActivityItineraryProps = {
  items: ItineraryItem[];
  slug: string;
};

export default function ActivityItinerary({
  items,
  slug,
}: ActivityItineraryProps) {
  const [expandedItems, setExpandedItems] = useState(
    () => new Set(items.map((_, index) => index)),
  );

  if (!items?.length) {
    return null;
  }

  function toggleItem(index: number) {
    const isOpening = !expandedItems.has(index);

    if (isOpening) {
      void trackEvent({
        eventName: "itinerary_expanded",
        page: window.location.pathname,
        entityType: "activity",
        entitySlug: slug,
        metadata: {
          item: index + 1,
        },
      });
    }

    setExpandedItems((current) => {
      const next = new Set(current);

      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }

      return next;
    });
  }

  return (
    <section className="mt-12 pt-10">
      <ExperienceSectionSubHeading>Itinerary</ExperienceSectionSubHeading>
     

      <ExperienceSectionHeading>
        Your experience
      </ExperienceSectionHeading>

      <div className="mt-6">
        {items.map((item, index) => {
          const isExpanded = expandedItems.has(index);
          const isLast = index === items.length - 1;

          return (
            <div
              key={`${item.time}-${item.title}`}
              className="flex gap-5"
            >
              {/* Timeline */}
              <div className="relative flex w-8 shrink-0 justify-center">
                {!isLast && (
                  <div className="absolute top-8 bottom-0 w-px bg-neutral-200" />
                )}

                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-medium text-brand">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <div className={`min-w-0 flex-1 ${!isLast ? "pb-10" : ""}`}>
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() => toggleItem(index)}
                  className="w-full text-left"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-400">
                    {item.time}
                  </p>

                  <h3 className="mt-1 font-medium text-neutral-900">
                    {item.title}
                  </h3>
                </button>

                {isExpanded && (
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}