import Link from "next/link";

import { activities } from "@/data/activities";
import type { Special } from "@/data/specials";

import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "@/components/experiences/ExperienceSectionSubHeading";

type DestinationItinerariesProps = {
  itineraries: Special[];
  heading?: string;
  showViewLink?: boolean;
};

function normaliseText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export default function DestinationItineraries({
  itineraries,
  heading = "Suggested itineraries",
  showViewLink = true,
}: DestinationItinerariesProps) {
  if (itineraries.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-10">
      <ExperienceSectionSubHeading>
        Plan your stay
      </ExperienceSectionSubHeading>

      <ExperienceSectionHeading>
        {heading}
      </ExperienceSectionHeading>

      <div className="mt-8 space-y-12">
        {itineraries.map((special) => (
          <article key={special.slug}>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                {special.duration.label}
              </p>

              <Link
                href={`/specials/${special.slug}`}
                className="group inline-block"
              >
                <h3 className="mt-1 text-xl font-semibold text-neutral-900 transition-colors group-hover:text-brand">
                  {special.name}
                </h3>
              </Link>
            </div>

            <div className="mt-6">
              {special.itinerary.map((day, index) => (
                <div
                  key={`${special.slug}-${day.day}`}
                  className="flex gap-5"
                >
                  <div className="relative flex w-8 shrink-0 justify-center">
                    {index !== special.itinerary.length - 1 && (
                      <div className="absolute top-8 bottom-0 w-px bg-neutral-200" />
                    )}

                    <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-medium text-brand">
                      {index + 1}
                    </div>
                  </div>

                  <div
                    className={`min-w-0 ${
                      index !== special.itinerary.length - 1 ? "pb-10" : ""
                    }`}
                  >
                    <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                      {day.day}
                    </p>

                    <h4 className="mt-1 font-medium text-neutral-900">
                      {day.title}
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-neutral-600">
                      {day.description}
                    </p>

                    {day.times && day.times.length > 0 && (
                      <div className="mt-6 space-y-5">
                        {day.times.map((time) => {
                          const activity = (day.activities ?? [])
                            .map((activitySlug) =>
                              activities.find(
                                (item) => item.slug === activitySlug,
                              ),
                            )
                            .find((item) => {
                              if (!item) {
                                return false;
                              }

                              const timeText = normaliseText(
                                `${time.title} ${time.description}`,
                              );

                              const activityText = normaliseText(item.name);

                              return timeText.includes(activityText);
                            });

                          return (
                            <div
                              key={`${special.slug}-${day.day}-${time.time}-${time.title}`}
                              className="grid grid-cols-[70px_1fr] gap-4"
                            >
                              <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                                {time.time}
                              </p>

                              <div>
                                {activity ? (
                                  <h5 className="text-sm font-medium text-neutral-900">
                                    <Link
                                      href={`/activities/${activity.slug}`}
                                      className="underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900"
                                    >
                                      {activity.name}
                                    </Link>
                                  </h5>
                                ) : (
                                  <h5 className="text-sm font-medium text-neutral-900">
                                    {time.title}
                                  </h5>
                                )}

                                <p className="mt-1 text-sm leading-6 text-neutral-600">
                                  {time.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {showViewLink && (
              <Link
                href={`/specials/${special.slug}`}
                className="mt-6 inline-flex bg-brand px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-900"
              >
                View itinerary
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}