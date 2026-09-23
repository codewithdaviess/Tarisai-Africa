import { notFound } from "next/navigation";

import { destinations } from "@/data/destinations";
import { specials } from "@/data/specials";

import Container from "@/components/ui/Container";
import DestinationHero from "@/components/destinations/DestinationHero";
import DestinationOverview from "@/components/destinations/DestinationOverview";
import DestinationWhyVisit from "@/components/destinations/DestinationWhyVisit";
import DestinationHighlights from "@/components/destinations/DestinationHighlights";
import DestinationThingsToDo from "@/components/destinations/DestinationThingsToDo";
import DestinationBestTime from "@/components/destinations/DestinationBestTime";
import DestinationRecommendedStay from "@/components/destinations/DestinationRecommendedStay";
import DestinationAccommodation from "@/components/destinations/DestinationAccommodation";
import DestinationGettingThere from "@/components/destinations/DestinationGettingThere";
import DestinationTravelInfo from "@/components/destinations/DestinationTravelInfo";
import DestinationItineraries from "@/components/destinations/DestinationItineraries";
import DestinationFAQs from "@/components/destinations/DestinationFAQs";
import DestinationMap from "@/components/destinations/DestinationMap";
import DestinationResearchTracker from "@/components/research/DestinationResearchTracker";

type DestinationPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = destinations.find((item) => item.slug === slug);

  if (!destination) {
    notFound();
  }

  const destinationSpecials = destination.relatedContent.packages
    .map((specialSlug) => specials.find((special) => special.slug === specialSlug))
    .filter((special): special is (typeof specials)[number] => special !== undefined);

  const destinationItineraries = destinationSpecials.filter(
    (special) =>
      special.destinations.length === 1 &&
      special.destinations[0] === destination.name,
  );

  return (
    <main className="bg-white">
      <DestinationResearchTracker slug={destination.slug} />

      <DestinationHero
        name={destination.name}
        image="/images/placeholder.jpg"
        location={`${destination.region}, ${destination.country}`}
        description={destination.tagline}
      />

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            <div>
              <DestinationOverview
                name={destination.name}
                {...destination.overview}
              />
              <DestinationWhyVisit items={destination.whyVisit} />
              <DestinationHighlights highlights={destination.highlights} />
              <DestinationThingsToDo items={destination.thingsToDo} />
              <DestinationBestTime {...destination.bestTimeToVisit} />
              <DestinationRecommendedStay stays={destination.recommendedStay} />
              <DestinationAccommodation
                overview={destination.whereToStay.overview}
                accommodations={destination.whereToStay.accommodations}
              />
              <DestinationGettingThere gettingThere={destination.gettingThere} />
              <DestinationTravelInfo information={destination.travelInformation} />
              <DestinationItineraries itineraries={destinationItineraries} />
              <DestinationFAQs slug={destination.slug} faqs={destination.faqs} />
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <DestinationMap
                name={destination.name}
                country={destination.country}
              />
            </aside>
          </div>
        </Container>
      </section>

    </main>
  );
}
