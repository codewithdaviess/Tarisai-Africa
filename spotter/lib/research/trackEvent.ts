export type ResearchEventName =
  | "page_viewed"
  | "destination_viewed"
  | "accommodation_viewed"
  | "activity_viewed"
  | "special_viewed"
  | "search_used"
  | "filter_used"
  | "pricing_viewed"
  | "itinerary_expanded"
  | "included_viewed"
  | "faq_opened"
  | "cancellation_viewed"
  | "gallery_interacted"
  | "review_viewed"
  | "enquiry_started"
  | "participant_changed"
  | "date_selected"
  | "enquiry_submitted"
  | "enquiry_abandoned"
  | "whatsapp_clicked"
  | "phone_clicked"
  | "email_clicked"
  | "feedback_submitted"
  | "confidence_question_answered"
  | "discovery_source_answered";

export type ResearchEntityType =
  | "activity"
  | "special"
  | "destination"
  | "accommodation"
  | "page";

type TrackEventOptions = {
  eventName: ResearchEventName;
  page?: string;
  entityType?: ResearchEntityType;
  entitySlug?: string;
  metadata?: Record<string, unknown>;
};

export async function trackEvent({
  eventName,
  page,
  entityType,
  entitySlug,
  metadata,
}: TrackEventOptions): Promise<void> {
  try {
    await fetch("/api/research/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      keepalive: true,
      body: JSON.stringify({
        eventName,
        page,
        entityType,
        entitySlug,
        metadata,
      }),
    });
  } catch {
    // Tracking must never break the user experience.
  }
}