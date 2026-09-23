import crypto from "crypto";
import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

const ALLOWED_EVENTS = new Set([
  "page_viewed",
  "destination_viewed",
  "accommodation_viewed",

  "activity_viewed",
  "special_viewed",

  "search_used",
  "filter_used",

  "pricing_viewed",
  "itinerary_expanded",
  "included_viewed",
  "faq_opened",
  "cancellation_viewed",
  "gallery_interacted",
  "review_viewed",

  "enquiry_started",
  "participant_changed",
  "date_selected",
  "enquiry_submitted",
  "enquiry_abandoned",

  "whatsapp_clicked",
  "phone_clicked",
  "email_clicked",

  "feedback_submitted",
  "confidence_question_answered",
  "discovery_source_answered",
]);

type ResearchEventRequest = {
  eventName?: unknown;
  page?: unknown;
  entityType?: unknown;
  entitySlug?: unknown;
  metadata?: unknown;
};

function cleanString(
  value: unknown,
  maxLength: number,
): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const valueTrimmed = value.trim();

  if (!valueTrimmed) {
    return null;
  }

  return valueTrimmed.slice(0, maxLength);
}

function isPlainObject(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function getSessionId(request: Request) {
  const cookieHeader = request.headers.get("cookie");

  const match = cookieHeader?.match(
    /(?:^|;\s*)ta_session=([^;]+)/,
  );

  const existingSessionId = match?.[1];

  if (
    existingSessionId &&
    /^[0-9a-f-]{36}$/i.test(existingSessionId)
  ) {
    return {
      sessionId: existingSessionId,
      isNew: false,
    };
  }

  return {
    sessionId: crypto.randomUUID(),
    isNew: true,
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ResearchEventRequest;

    const eventName = cleanString(body.eventName, 100);

    if (!eventName || !ALLOWED_EVENTS.has(eventName)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid research event.",
        },
        { status: 400 },
      );
    }

    const page = cleanString(body.page, 500);
    const entityType = cleanString(body.entityType, 50);
    const entitySlug = cleanString(body.entitySlug, 200);

    let metadata: Record<string, unknown> = {};

    if (body.metadata !== undefined) {
      if (!isPlainObject(body.metadata)) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid event metadata.",
          },
          { status: 400 },
        );
      }

      metadata = body.metadata;
    }

    const metadataSize = JSON.stringify(metadata).length;

    if (metadataSize > 3000) {
      return NextResponse.json(
        {
          success: false,
          message: "Event metadata is too large.",
        },
        { status: 400 },
      );
    }

    const { sessionId, isNew } = getSessionId(request);

    const supabase = createSupabaseServerClient();

    const { error } = await supabase
      .from("research_events")
      .insert({
        session_id: sessionId,
        event_name: eventName,
        page,
        entity_type: entityType,
        entity_slug: entitySlug,
        metadata,
      });

    if (error) {
      console.error("Research event error:", error);

      return NextResponse.json(
        {
          success: false,
        },
        { status: 500 },
      );
    }

    const response = NextResponse.json({
      success: true,
    });

    if (isNew) {
      response.cookies.set({
        name: "ta_session",
        value: sessionId,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
    }

    return response;
  } catch (error) {
    console.error("Research API error:", error);

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 },
    );
  }
}