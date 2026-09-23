import Link from "next/link";
import Image from "next/image";

type DestinationCardProps = {
  slug: string;
  name: string;
  region: string;
  heroImage: string;
  location?: string;
  image?: string;
  description?: string;
};

export function DestinationCard({
  slug,
  name,
  region,
  heroImage,
  location,
  image,
  description,
}: DestinationCardProps) {
  return (
    <Link
      href={`/destinations/${slug}`}
      className="group relative block overflow-hidden rounded-xs"
    >
      {/* Image */}
      <div className="relative h-80 w-full">
        <Image
          src={heroImage || image || "/images/destinations/destinations-hero.webp"}
          alt={name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <h2 className="text-section-title font-semibold tracking-tight">
          {name}
        </h2>

        <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-white/70">
          {location ?? region}
        </p>

        <p className="mt-2 max-w-sm text-sm leading-6 text-white/80 line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  );
}