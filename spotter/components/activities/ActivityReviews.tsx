"use client";

import { useEffect, useState } from "react";

import ReadMoreModal from "@/components/ui/ReadMoreModal";
import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "../experiences/ExperienceSectionSubHeading";

export type ActivityReview = {
  author: string;
  content: string;
  rating?: number;
};

type ActivityReviewsProps = {
  rating: number | null;
  slug: string;
  reviews?: ActivityReview[];
  reviewCount: number;
};

export default function ActivityReviews({
  rating,
  slug,
  reviews = [],
  reviewCount,
}: ActivityReviewsProps) {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(reviews);
  const [visibleRating, setVisibleRating] = useState(rating);
  const [visibleReviewCount, setVisibleReviewCount] = useState(reviewCount);
  const [selectedRating, setSelectedRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    async function loadReviews() {
      try {
        const response = await fetch(
          `/api/reviews?activity=${encodeURIComponent(slug)}`,
        );

        if (!response.ok) {
          return;
        }

        const result = (await response.json()) as {
          reviews?: ActivityReview[];
        };
        const loadedReviews = result.reviews ?? [];

        if (!isCurrent || loadedReviews.length === 0) {
          return;
        }

        const averageRating =
          loadedReviews.reduce((sum, review) => sum + (review.rating ?? 0), 0) /
          loadedReviews.length;

        setVisibleReviews(loadedReviews);
        setVisibleReviewCount(loadedReviews.length);
        setVisibleRating(Math.round(averageRating * 10) / 10);
      } catch {
        // Keep the server-provided summary when reviews cannot be loaded.
      }
    }

    void loadReviews();

    return () => {
      isCurrent = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!isWriteModalOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsWriteModalOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isWriteModalOpen]);

  function openWriteModal() {
    setSubmitted(false);
    setSelectedRating(0);
    setError("");
    setIsWriteModalOpen(true);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (selectedRating === 0) {
      setError("Please select a rating.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activity: slug,
          name: formData.get("name"),
          rating: selectedRating,
          review: formData.get("review"),
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.message ?? "We could not save your review.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("We could not save your review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mt-12 pt-12">
       <ExperienceSectionSubHeading>What other travelers are saying</ExperienceSectionSubHeading>
            
            <ExperienceSectionHeading>Reviews </ExperienceSectionHeading>
      {visibleRating !== null && visibleReviewCount > 0 ? (
        <div className="mt-6 flex items-center gap-5">
          <div>
            <p className="text-4xl font-semibold tracking-tight text-neutral-900">
              {visibleRating}
            </p>

            <div className="mt-1 text-brand">
              {"★".repeat(Math.round(visibleRating))}
              {"☆".repeat(5 - Math.round(visibleRating))}
            </div>
          </div>

          <div className="h-12 w-px bg-neutral-200" />

          <div>
            <p className="text-sm font-medium text-neutral-900">
              {visibleReviewCount} reviews
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              Based on traveller feedback
            </p>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-neutral-500">
          No reviews yet. Be the first to share your experience.
        </p>
      )}

      {visibleReviews.length > 0 && (
        <div className="mt-8 space-y-5">
          {visibleReviews.slice(0, 3).map((review) => (
            <article
              key={`${review.author}-${review.content}`}
              className="border-t border-neutral-200 pt-5"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-neutral-900">
                  {review.author}
                </p>
                {review.rating !== undefined && (
                  <span className="text-sm text-brand">
                    {"★".repeat(review.rating)}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {review.content}
              </p>
            </article>
          ))}

          {visibleReviews.length > 3 && (
            <ReadMoreModal title={`${visibleReviewCount} reviews`}>
              <div className="space-y-6">
                {visibleReviews.map((review) => (
                  <article
                    key={`${review.author}-${review.content}`}
                    className="border-b border-neutral-200 pb-5 last:border-b-0"
                  >
                    <p className="text-sm font-medium text-neutral-900">
                      {review.author}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      {review.content}
                    </p>
                  </article>
                ))}
              </div>
            </ReadMoreModal>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={openWriteModal}
        className="mt-8 inline-flex text-sm font-medium text-brand underline decoration-brand/40 underline-offset-4 transition hover:text-brand-hover"
      >
        Write a review
      </button>

      {isWriteModalOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-neutral-950/60 px-4 py-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsWriteModalOpen(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="write-review-modal-title"
            className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden bg-white"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-6 py-5 shadow-xs sm:px-8">
              <h2
                id="write-review-modal-title"
                className="text-section-title font-semibold tracking-tight text-neutral-900"
              >
                Write a review
              </h2>

              <button
                type="button"
                onClick={() => setIsWriteModalOpen(false)}
                aria-label="Close review form"
                className="shrink-0 text-2xl leading-none text-neutral-500 transition-colors hover:text-neutral-900"
              >
                ×
              </button>
            </div>

            <div className="min-h-0 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
              {submitted ? (
                <div className="py-6 text-center">
                  <p className="text-sm font-medium text-brand">Thank you</p>
                  <h3 className="mt-2 text-section-title font-semibold tracking-tight text-neutral-900">
                    Your review has been received.
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    Our team will review your feedback before it appears on the
                    activity page.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsWriteModalOpen(false)}
                    className="mt-6 bg-brand px-5 py-3 text-sm font-medium text-white transition hover:bg-brand-hover"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input type="hidden" name="activity" value={slug} />

                  <label className="block text-sm font-medium text-neutral-900">
                    Name
                    <input
                      name="name"
                      type="text"
                      required
                      className="mt-2 block w-full border border-neutral-300 px-3 py-3 text-sm font-normal outline-none focus:border-brand"
                    />
                  </label>

                  <fieldset>
                    <legend className="text-sm font-medium text-neutral-900">
                      Rating
                    </legend>
                    <div className="mt-2 flex gap-1" aria-label="Rating">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setSelectedRating(value)}
                          aria-label={`${value} star${value === 1 ? "" : "s"}`}
                          aria-pressed={selectedRating === value}
                          className={`text-3xl leading-none transition-colors ${value <= selectedRating ? "text-brand" : "text-neutral-300 hover:text-brand/70"}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-neutral-500">
                      {selectedRating > 0
                        ? `${selectedRating} out of 5 stars`
                        : "Select a rating"}
                    </p>
                  </fieldset>

                  <label className="block text-sm font-medium text-neutral-900">
                    Review
                    <textarea
                      name="review"
                      rows={5}
                      required
                      className="mt-2 block w-full resize-none border border-neutral-300 px-3 py-3 text-sm font-normal outline-none focus:border-brand"
                    />
                  </label>

                  {error && (
                    <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand px-5 py-4 text-sm font-medium text-white transition hover:bg-brand-hover"
                  >
                    {isSubmitting ? "Saving review..." : "Submit review"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}