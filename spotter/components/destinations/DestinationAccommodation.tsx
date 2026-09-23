import Link from "next/link";
import type { DestinationAccommodation as Accommodation } from "@/data/destinations";

type DestinationAccommodationProps = {
  overview: string;
  accommodations: Accommodation[];
};

const categories: Accommodation["category"][] = [
  "Luxury",
  "Mid-range",
  "Comfort & Value",
];

export default function DestinationAccommodation({
  overview,
  accommodations,
}: DestinationAccommodationProps) {
  return (
    <section className="mt-12 pt-10">
     <h2 className="text-section-title font-semibold tracking-tight text-neutral-900">
        Where to Stay
      </h2>
      <p className="mt-5 max-w-3xl text-sm leading-7 text-neutral-600">
        {overview}
      </p>
      <div className="mt-10 space-y-10">
        {categories.map((category) => {
          const properties = accommodations.filter(
            (accommodation) => accommodation.category === category,
          );

          if (properties.length === 0) {
            return null;
          }

          return (
            <div key={category}>
              <h3 className="pt-3 text-lg font-semibold tracking-tight text-neutral-900">
                {category}
              </h3>

              <div className="mt-5 space-y-5">
                {properties.map((property) => (
                  <div key={property.slug}>
                    <Link
                      href={`/accommodation/${property.slug}`}
                      className="group block border border-neutral-200 p-5 transition-colors hover:border-neutral-900"
                    >
                      <h4 className="text-base font-semibold text-neutral-900 group-hover:underline group-hover:underline-offset-4">
                        {property.name}
                      </h4>
                      {property.propertyType && (
                        <p className="mt-1 text-sm font-medium text-earth">
                          {property.propertyType}
                        </p>
                      )}
                      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-neutral-400">
                        {category}
                      </p>
                      <p className="mt-2 max-w-3xl text-sm leading-7 text-neutral-600">
                        {property.description}
                      </p>
                      {property.highlights && (
                        <p className="mt-3 text-xs leading-5 text-neutral-500">
                          {property.highlights.join(" | ")}
                        </p>
                      )}
                      {property.priceFrom && (
                        <p className="mt-3 text-sm font-semibold text-neutral-900">
                          {property.priceFrom}
                        </p>
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}