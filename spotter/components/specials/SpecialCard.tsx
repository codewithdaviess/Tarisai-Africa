import Link from "next/link";

import { getSpecialFromPrice, type Special } from "@/data/specials";

type SpecialCardProps = {
  slug: string;
  name: string;
  image: string;
  description: string;
  duration: string;
  destinations: string[];
  highlights: string[];
  badge?: string;
  pricing: Special["pricing"];
};

export function SpecialCard({
  slug,
  name,
  image,
  description,
  duration,
  destinations,
  highlights,
  badge,
  pricing,
}: SpecialCardProps) {
  const fromPrice = getSpecialFromPrice(pricing);

  return (
    <article className="h-full overflow-hidden rounded-xs border border-neutral-200 bg-white">
      <Link
        href={`/specials/${slug}`}
        prefetch={false}
        className="group flex h-full flex-col hover:shadow-lg"
      >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {badge && (
          <span className="absolute left-4 top-4 rounded-xs bg-brand px-3 py-2 text-[11px] font-medium tracking-[0.12em] text-white">
            {badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-4 py-5">
        <div className="mb-2 flex items-center text-sm text-neutral-500">
          <span>{duration}</span>
        </div>

        <h2 className="text-section-title font-semibold tracking-tight text-neutral-900">
          {name}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-700">
          {description}
        </p>

        <div className="mt-4 text-sm text-brand">
          {destinations.join(" · ")}
        </div>

        <div className="mt-3 line-clamp-2 text-xs text-neutral-500">
          {highlights.map((highlight, index) => (
            <span key={highlight}>
              {highlight}
              {index < highlights.length - 1 && " | "}
            </span>
          ))}
        </div>

        <div className="mt-5 border-t border-neutral-200 pt-4">
          <p className="text-xs text-neutral-500">From per person</p>
          <p className="mt-1 text-lg font-semibold text-neutral-900">
            {pricing.currency} {fromPrice.toLocaleString()}
          </p>
        </div>
      </div>
      </Link>
    </article>
  );
}