import Image from "next/image";
import Link from "next/link";

import type { Accommodation } from "@/data/accommodations";

type AccommodationCardProps = Accommodation;

export default function AccommodationCard({
  slug,
  name,
  category,
  location,
  image,
  description,
  priceFrom,
}: AccommodationCardProps) {
  return (
    <article className="group h-full overflow-hidden rounded-xs bg-neutral-900">
      <Link
        href={`/accommodation/${slug}`}
        className="relative block h-130 overflow-hidden"
      >
        {/* Full-height image */}
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-black/2.5 from-black/80 via-black/20 to-black/10" />

        {/* Category */}
        <span className="absolute left-4 top-4 bg-brand px-3 py-2 text-[11px] font-medium tracking-[0.12em] text-white">
          {category}
        </span>

        {/* Content over image */}
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <h2 className="mt-2 text-section-title font-semibold tracking-tight">
            {name}
          </h2>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-white">
            {description}
          </p>

          <div className="mt-5 flex items-end justify-between border-t border-white/80 pt-4">
            {priceFrom ? (
              <div>
                <p className="text-xs text-white/60">{priceFrom.label}</p>
                <p className="text-lg font-semibold">
                  {priceFrom.currency}{" "}
                  {priceFrom.amount.toLocaleString()}
                </p>
              </div>
            ) : (
              <p className="text-sm font-medium text-white/70">
                Price on enquiry
              </p>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}