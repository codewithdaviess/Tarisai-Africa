"use client";

import { useEffect, useRef } from "react";

import { trackEvent } from "@/lib/research/trackEvent";

type DestinationResearchTrackerProps = {
  slug: string;
};

export default function DestinationResearchTracker({
  slug,
}: DestinationResearchTrackerProps) {
  const trackedSlug = useRef<string | null>(null);

  useEffect(() => {
    if (trackedSlug.current === slug) {
      return;
    }

    trackedSlug.current = slug;

    void trackEvent({
      eventName: "destination_viewed",
      page: window.location.pathname,
      entityType: "destination",
      entitySlug: slug,
    });
  }, [slug]);

  return null;
}