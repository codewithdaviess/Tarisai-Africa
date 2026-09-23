import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import { SpecialCard } from "@/components/specials/SpecialCard";
import { specials } from "@/data/specials";

export const metadata: Metadata = {
  title: "Victoria Falls Travel Specials",
  description:
    "Explore curated Victoria Falls journeys combining activities, wildlife, accommodation and transfers.",
  alternates: { canonical: "/specials" },
};

export default function SpecialsPage() {
  return (
    <>
      <PageHero
        image="/images/specials/specials-hero.webp"
        title="Go beyond the Falls."
        description="Curated journeys combining Victoria Falls, wildlife, adventure and unforgettable Southern African experiences."
      />

      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-eyebrow font-medium uppercase tracking-[0.18em] text-brand">
                Featured Itineraries
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                Journeys planned around you.
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {specials.map((special) => (
                <SpecialCard
                  key={special.slug}
                  slug={special.slug}
                  name={special.name}
                  image={special.image}
                  description={special.description}
                  duration={special.duration.label}
                  destinations={special.destinations}
                  highlights={special.highlights}
                  badge={special.badge}
                  pricing={special.pricing}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
