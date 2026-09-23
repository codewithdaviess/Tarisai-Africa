"use client";

import { useEffect, useRef } from "react";

import { trackEvent } from "@/lib/research/trackEvent";

type AccommodationResearchTrackerProps = {
  slug: string;
};

export default function AccommodationResearchTracker({
  slug,
}: AccommodationResearchTrackerProps) {
  const trackedSlug = useRef<string | null>(null);

  useEffect(() => {
    if (trackedSlug.current === slug) {
      return;
    }

    trackedSlug.current = slug;

    void trackEvent({
      eventName: "accommodation_viewed",
      page: window.location.pathname,
      entityType: "accommodation",
      entitySlug: slug,
    });
  }, [slug]);

  return null;
}