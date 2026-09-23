import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { destinations } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Destinations in Zimbabwe",
  description:
    "Explore Victoria Falls and Zimbabwe destinations with practical travel information, activities, accommodation and transfers.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        image="/images/destinations/destinations-hero.webp"
        title="Discover Zimbabwe."
        description="Explore the breathtaking landscapes and rich culture of Zimbabwe with our curated selection of destinations."
      />

      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-eyebrow font-medium uppercase tracking-[0.18em] text-brand">
                Explore Africa
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                Places that stay with you.
              </h2>
            </div>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {destinations.map((destination) => (
                <DestinationCard key={destination.slug} {...destination} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
