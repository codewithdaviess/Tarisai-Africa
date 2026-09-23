import { notFound } from "next/navigation";

import { specials } from "@/data/specials";

import Container from "@/components/ui/Container";

import SpecialHero from "@/components/specials/SpecialHero";
import DestinationItineraries from "@/components/destinations/DestinationItineraries";
import SpecialSummary from "@/components/specials/SpecialSummary";
import SpecialAbout from "@/components/specials/SpecialAbout";
import SpecialHighlights from "@/components/specials/SpecialHighlights";
import SpecialDestinations from "@/components/specials/SpecialDestinations";
import SpecialIncluded from "@/components/specials/SpecialIncluded";
import SpecialNotIncluded from "@/components/specials/SpecialNotIncluded";
import SpecialInformation from "@/components/specials/SpecialInformation";
import SpecialAccommodation from "@/components/specials/SpecialAccommodation";
import SpecialCancellation from "@/components/specials/SpecialCancellation";
import SpecialBookingCard from "@/components/specials/SpecialBookingCard";
import ExperienceResearchTracker from "@/components/research/ExperienceResearchTracker";
import ExperienceFAQ from "@/components/research/ExperienceFAQ";
import ResearchPageTracker from "@/components/research/ResearchPageTracker";
import Recommendations from "@/components/research/Recommendations";
import { getRecommendations } from "@/lib/research/recommendations";

type SpecialPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function SpecialPage({ params }: SpecialPageProps) {
  const { slug } = await params;

  const special = specials.find((special) => special.slug === slug);

  if (!special) {
    notFound();
  }

  const recommendations = await getRecommendations({
    type: "special",
    slug: special.slug,
  });

  return (
    <main className="bg-white">
      <ResearchPageTracker
        page={`/specials/${special.slug}`}
        entityType="special"
        entitySlug={special.slug}
      />
      <ExperienceResearchTracker
        type="special"
        slug={special.slug}
      />

      <SpecialHero
        name={special.name}
        image={special.image}
        category={special.category}
        duration={special.duration.label}
        badge={special.badge}
      />

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
            <div>
              <SpecialSummary
                duration={special.duration.label}
                category={special.category}
                groupSize="2–12 people"
                pickup="Available"
              />

              <SpecialAbout description={special.description} />

              <SpecialHighlights highlights={special.highlights} />

              <SpecialDestinations destinations={special.destinations} />

              <DestinationItineraries
                itineraries={[special]}
                heading="Itinerary"
                showViewLink={false}
              />

              <SpecialIncluded items={special.included} />

              <SpecialNotIncluded items={special.notIncluded} />

              <SpecialInformation items={special.information} />

              {special.accommodation && (
                <SpecialAccommodation accommodation={special.accommodation} />
              )}

              {special.cancellation && (
                <SpecialCancellation
                  cancellation={special.cancellation.policy}
                />
              )}

              <ExperienceFAQ
                type="special"
                slug={special.slug}
                faqs={special.faqs ?? []}
              />
            </div>

            <aside>
              <SpecialBookingCard
                slug={special.slug}
                duration={special.duration.label}
                pricing={special.pricing}
              />
            </aside>
          </div>
        </Container>
      </section>

      <Recommendations items={recommendations} />
    </main>
  );
}
