import { NextResponse } from "next/server";

import { activities } from "@/data/activities";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function GET(request: Request) {
  const activitySlug = clean(
    new URL(request.url).searchParams.get("activity"),
    120,
  );

  if (!activitySlug || !activities.some((activity) => activity.slug === activitySlug)) {
    return NextResponse.json(
      { message: "The selected activity could not be found." },
      { status: 404 },
    );
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("reviews")
      .select("author, rating, content")
      .eq("activity_slug", activitySlug)
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase review lookup error:", error);
      return NextResponse.json(
        { message: "We could not load reviews." },
        { status: 500 },
      );
    }

    return NextResponse.json({ reviews: data ?? [] });
  } catch (error) {
    console.error("Review lookup API error:", error);
    return NextResponse.json(
      { message: "We could not load reviews." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      activity?: unknown;
      name?: unknown;
      rating?: unknown;
      review?: unknown;
    };

    const activitySlug = clean(body.activity, 120);
    const author = clean(body.name, 100);
    const content = clean(body.review, 2000);
    const rating = Number(body.rating);

    if (!activities.some((activity) => activity.slug === activitySlug)) {
      return NextResponse.json(
        { message: "The selected activity could not be found." },
        { status: 404 },
      );
    }

    if (
      !author ||
      !content ||
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      return NextResponse.json(
        { message: "Please provide your name, rating, and review." },
        { status: 400 },
      );
    }

    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from("reviews").insert({
      activity_slug: activitySlug,
      author,
      rating,
      content,
      status: "pending",
    });

    if (error) {
      console.error("Supabase review error:", error);

      if (error.code === "42P01") {
        return NextResponse.json(
          {
            message:
              "Review storage is not configured yet. Run supabase/reviews.sql in Supabase and try again.",
          },
          { status: 503 },
        );
      }

      return NextResponse.json(
        { message: "We could not save your review. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your review has been submitted for approval.",
    });
  } catch (error) {
    console.error("Review API error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}