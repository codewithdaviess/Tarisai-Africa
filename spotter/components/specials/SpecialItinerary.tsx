"use client";

import { useState } from "react";

import { trackEvent } from "@/lib/research/trackEvent";

import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "@/components/experiences/ExperienceSectionSubHeading";

type ItineraryTime = {
  time: string;
  title: string;
  description: string;
};

type ItineraryItem = {
  day: string;
  title: string;
  description: string;
  activities?: string[];
  times?: ItineraryTime[];
};

type Activity = {
  slug: string;
  name: string;
};

type SpecialItineraryProps = {
  items: ItineraryItem[];
  activities: (Activity | undefined)[];
  slug: string;
};

export default function SpecialItinerary({
  items,
  activities,
  slug,
}: SpecialItineraryProps) {
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
        entityType: "special",
        entitySlug: slug,
        metadata: { day: index + 1 },
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
      <ExperienceSectionSubHeading>
        Itinerary
      </ExperienceSectionSubHeading>

      <ExperienceSectionHeading>
        Your experience
      </ExperienceSectionHeading>

      <div className="mt-8">
        {items.map((item, index) => (
          <div
            key={`${item.day}-${item.title}`}
            className="flex gap-5"
          >
            {/* Timeline column */}
            <div className="relative flex w-8 shrink-0 justify-center">
              {index !== items.length - 1 && (
                <div className="absolute top-8 bottom-0 w-px bg-neutral-200" />
              )}

              <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-medium text-brand">
                {index + 1}
              </div>
            </div>

            {/* Day content */}
            <div
              className={`min-w-0 ${
                index !== items.length - 1 ? "pb-10" : ""
              }`}
            >
              <button
                type="button"
                aria-expanded={expandedItems.has(index)}
                onClick={() => toggleItem(index)}
                className="w-full text-left"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-900">
                  {item.day}
                </p>

                <h3 className="mt-1 text-xl font-semibold text-neutral-900">
                  {item.title}
                </h3>
              </button>

              {expandedItems.has(index) && (
                <>
                  <p className="mt-1 text-sm leading-6 text-neutral-600">
                    {item.description}
                  </p>

                  {/* Timed activities */}
                  {item.times && item.times.length > 0 && (
                    <div className="mt-6 space-y-5">
                      {item.times.map((time) => (
                        <div
                          key={`${time.time}-${time.title}`}
                          className="grid grid-cols-[70px_1fr] gap-4"
                        >
                          <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                            {time.time}
                          </p>

                          <div>
                            <h4 className="text-sm font-medium text-neutral-900">
                              {time.title}
                            </h4>

                            <p className="mt-1 text-sm leading-6 text-neutral-600">
                              {time.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Linked activities */}
                  {item.activities && item.activities.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.activities.map((activitySlug) => {
                        const activity = activities.find(
                          (item) => item?.slug === activitySlug,
                        );

                        if (!activity) {
                          return null;
                        }

                        return (
                          <span
                            key={activitySlug}
                            className="rounded-full bg-neutral-100 px-3 py-1.5 text-xs text-neutral-600"
                          >
                            {activity.name}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}