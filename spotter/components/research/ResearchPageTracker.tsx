"use client";

import { useEffect, useRef } from "react";

import { trackEvent } from "@/lib/research/trackEvent";

type ResearchPageTrackerProps = {
  page: string;
  entityType?: "activity" | "special" | "page";
  entitySlug?: string;
};

export default function ResearchPageTracker({
  page,
  entityType,
  entitySlug,
}: ResearchPageTrackerProps) {
  const trackedPage = useRef<string | null>(null);

  useEffect(() => {
    const pageKey = `${page}:${entityType ?? ""}:${entitySlug ?? ""}`;

    if (trackedPage.current === pageKey) {
      return;
    }

    trackedPage.current = pageKey;

    trackEvent({
      eventName: "page_viewed",
      page,
      entityType,
      entitySlug,
    });
  }, [page, entityType, entitySlug]);

  return null;
}