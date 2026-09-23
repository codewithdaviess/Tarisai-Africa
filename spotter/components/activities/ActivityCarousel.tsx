"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { activities as allActivities } from "@/data/activities";
import { ActivityCard } from "@/components/activities/ActivityCard";

type Activity = (typeof allActivities)[number];

type ActivityCarouselProps = {
  activities: Activity[];
};

export default function ActivityCarousel({
  activities,
}: ActivityCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;

    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    updateButtons();

    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);

    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  if (activities.length === 0) {
    return null;
  }

  return (
    <div className="mt-10">
      {/* Carousel viewport */}
      <div
        ref={emblaRef}
        className="overflow-hidden"
        role="region"
        aria-label="Destination experiences"
      >
        {/* Carousel track */}
        <div className="-ml-6 flex">
          {activities.map((activity) => (
            <div
              key={activity.slug}
              className="
                min-w-0
                shrink-0
                pl-6
                basis-[88%]
                sm:basis-[62%]
                md:basis-[48%]
                lg:basis-[32%]
              "
            >
              <ActivityCard {...activity} />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous experiences"
            className="
              flex h-11 w-11 items-center justify-center
              border border-neutral-300
              text-neutral-900
              transition
              hover:border-neutral-900
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            <span aria-hidden="true">←</span>
          </button>

          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next experiences"
            className="
              flex h-11 w-11 items-center justify-center
              border border-neutral-300
              text-neutral-900
              transition
              hover:border-neutral-900
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <a
          href="/activities"
          className="
            hidden
            text-sm
            font-medium
            text-neutral-900
            underline
            underline-offset-4
            transition
            hover:text-brand
            sm:block
          "
        >
          View all experiences
        </a>
      </div>

      {/* Mobile link */}
      <a
        href="/activities"
        className="
          mt-6
          inline-flex
          text-sm
          font-medium
          text-neutral-900
          underline
          underline-offset-4
          transition
          hover:text-brand
          sm:hidden
        "
      >
        View all experiences
      </a>
    </div>
  );
}