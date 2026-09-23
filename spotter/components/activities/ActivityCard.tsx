"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ActivityCardProps = {
  slug: string;
  name: string;
  location: string;
  image: string;
  description: string;
  category: string;
  duration: string;
  pricing: {
    adult: {
      amount: number;
      currency: string;
      label: string;
    };
    child: {
      amount: number;
      currency: string;
      label: string;
    };
  };
  rating: number | null;
  reviewCount: number;
  highlights: string[];
  badge?: string;
};

export function ActivityCard({
  slug,
  name,
  location,
  image,
  description,
  category,
  duration,
  pricing,
  rating,
  reviewCount,
  highlights,
  badge,
}: ActivityCardProps) {
  const [liveRating, setLiveRating] = useState(rating);
  const [liveReviewCount, setLiveReviewCount] = useState(reviewCount);

  useEffect(() => {
    let isCurrent = true;

    async function loadReviewSummary() {
      try {
        const response = await fetch(
          `/api/reviews?activity=${encodeURIComponent(slug)}`,
        );

        if (!response.ok) {
          return;
        }

        const result = (await response.json()) as {
          reviews?: { rating?: number }[];
        };
        const approvedReviews = result.reviews ?? [];

        if (!isCurrent || approvedReviews.length === 0) {
          if (isCurrent) {
            setLiveRating(null);
            setLiveReviewCount(0);
          }
          return;
        }

        const averageRating =
          approvedReviews.reduce(
            (sum, review) => sum + (review.rating ?? 0),
            0,
          ) / approvedReviews.length;

        setLiveRating(Math.round(averageRating * 10) / 10);
        setLiveReviewCount(approvedReviews.length);
      } catch {
        // Keep the catalog summary when reviews cannot be loaded.
      }
    }

    void loadReviewSummary();

    return () => {
      isCurrent = false;
    };
  }, [slug, rating, reviewCount]);

  return (
    <article className="h-full overflow-hidden rounded-xs border border-neutral-200">
      <Link
        href={`/activities/${slug}`}
        className="group flex h-full flex-col hover:shadow-lg"
      >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge */}
        {badge && (
          <span className="absolute left-4 top-4 rounded-xs bg-brand px-3 py-2 text-[11px] font-medium tracking-[0.12em] text-white">
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-4 py-5">
        {/* Duration */}
        <div className="mb-2 flex items-center gap-2 text-sm text-neutral-500">
          <span>{duration}</span>
        </div>

        {/* Name */}
        <h2 className="text-section-title font-semibold tracking-tight text-neutral-900">
          {name}
        </h2>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-700">
          {description}
        </p>

        {/* Location and Rating */}
        <div className="mt-4 flex items-center gap-4 text-sm text-brand text-shadow-xs">
          <span>{location}</span>
          {liveRating !== null && liveReviewCount > 0 && (
            <span>
              ★ {liveRating} ({liveReviewCount})
            </span>
          )}
        </div>

        {/* Highlights */}
        <div className="mt-3 text-xs text-neutral-500 line-clamp-2">
          {highlights.map((highlight, index) => (
            <span key={highlight}>
              {highlight}
              {index < highlights.length - 1 && " | "}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="mt-5 flex items-end justify-between border-t border-neutral-200 pt-4">
          <div>
            <p className="text-xs text-neutral-500">{pricing.adult.label}</p>

            <p className="text-lg font-semibold text-neutral-900">
              {pricing.adult.currency} {pricing.adult.amount}
            </p>
          </div>
        </div>
      </div>
      </Link>
    </article>
  );
}
