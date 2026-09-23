import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import AccommodationCard from "@/components/accommodation/AccommodationCard";
import { accommodations } from "@/data/accommodations";

export const metadata: Metadata = {
  title: "Accommodation in Victoria Falls",
  description:
    "Find hotels, lodges and places to stay in Victoria Falls for different travel styles and budgets.",
  alternates: { canonical: "/accommodation" },
};

export default function AccommodationPage() {
  return (
    <main className="bg-white">
      <PageHero
        image="/images/accommodation/shearwater-explorer-village-2.webp"
        title="Stay in Zimbabwe."
        description="Find accommodation that fits the way you want to experience each destination."
      />

      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-eyebrow font-medium uppercase tracking-[0.18em] text-brand">
                Where to stay
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                Stay somewhere worth discovering.
              </h2>
            </div>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {accommodations.map((accommodation) => (
                <AccommodationCard key={accommodation.slug} {...accommodation} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
