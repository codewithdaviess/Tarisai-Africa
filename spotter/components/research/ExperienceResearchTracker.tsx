"use client";

import { useEffect, useRef } from "react";

import { trackEvent } from "@/lib/research/trackEvent";

type ExperienceResearchTrackerProps = {
  type: "activity" | "special";
  slug: string;
};

export default function ExperienceResearchTracker({
  type,
  slug,
}: ExperienceResearchTrackerProps) {
  const trackedExperience = useRef<string | null>(null);

  useEffect(() => {
    const experienceKey = `${type}:${slug}`;

    if (trackedExperience.current === experienceKey) {
      return;
    }

    trackedExperience.current = experienceKey;

    trackEvent({
      eventName:
        type === "activity"
          ? "activity_viewed"
          : "special_viewed",
      page: window.location.pathname,
      entityType: type,
      entitySlug: slug,
    });
  }, [type, slug]);

  return null;
}