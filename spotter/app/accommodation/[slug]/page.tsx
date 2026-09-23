import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

import AccommodationBookingCard from "@/components/accommodation/AccommodationBookingCard";
import AccommodationResearchTracker from "@/components/research/AccommodationResearchTracker";
import Recommendations from "@/components/research/Recommendations";

import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "@/components/experiences/ExperienceSectionSubHeading";

import { accommodations } from "@/data/accommodations";
import { getRecommendations } from "@/lib/research/recommendations";

type AccommodationPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AccommodationDetailPage({
  params,
}: AccommodationPageProps) {
  const { slug } = await params;

  const accommodation = accommodations.find(
    (item) => item.slug === slug,
  );

  if (!accommodation) {
    notFound();
  }

  const recommendations = await getRecommendations({
    type: "accommodation",
    slug: accommodation.slug,
  });

  return (
    <main className="bg-white">
      <AccommodationResearchTracker slug={accommodation.slug} />

      <PageHero
        image={accommodation.image}
        title={accommodation.name}
        description={accommodation.description}
      />

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px]">
            {/* Main content */}
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-brand">
                {accommodation.category} · {accommodation.location}
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                {accommodation.name}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-600">
                {accommodation.details}
              </p>

              <div className="mt-12 space-y-12">
                {/* Why stay here */}
                <section>
                  <ExperienceSectionSubHeading>
                    About your stay
                  </ExperienceSectionSubHeading>

                  <ExperienceSectionHeading>
                    Why stay here
                  </ExperienceSectionHeading>

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-600">
                    {accommodation.whyStay}
                  </p>
                </section>

                {/* Key features */}
                <section>
                  <ExperienceSectionSubHeading>
                    At a glance
                  </ExperienceSectionSubHeading>

                  <ExperienceSectionHeading>
                    Key features
                  </ExperienceSectionHeading>

                  <ul className="mt-4 space-y-2 text-sm leading-7 text-neutral-600">
                    {accommodation.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </section>

                {/* Rooms */}
                <section>
                  <ExperienceSectionSubHeading>
                    Your room
                  </ExperienceSectionSubHeading>

                  <ExperienceSectionHeading>
                    Rooms
                  </ExperienceSectionHeading>

                  <ul className="mt-4 space-y-2 text-sm leading-7 text-neutral-600">
                    {accommodation.rooms.map((room) => (
                      <li key={room}>{room}</li>
                    ))}
                  </ul>
                </section>

                {/* Facilities */}
                <section>
                  <ExperienceSectionSubHeading>
                    On-site
                  </ExperienceSectionSubHeading>

                  <ExperienceSectionHeading>
                    Facilities
                  </ExperienceSectionHeading>

                  <ul className="mt-4 space-y-2 text-sm leading-7 text-neutral-600">
                    {accommodation.facilities.map((facility) => (
                      <li key={facility}>{facility}</li>
                    ))}
                  </ul>
                </section>

                {/* Dining */}
                <section>
                  <ExperienceSectionSubHeading>
                    Dining
                  </ExperienceSectionSubHeading>

                  <ExperienceSectionHeading>
                    Dining
                  </ExperienceSectionHeading>

                  <ul className="mt-4 space-y-2 text-sm leading-7 text-neutral-600">
                    {accommodation.dining.map((venue) => (
                      <li key={venue}>{venue}</li>
                    ))}
                  </ul>
                </section>

                {/* Nearby */}
                <section>
                  <ExperienceSectionSubHeading>
                    Location
                  </ExperienceSectionSubHeading>

                  <ExperienceSectionHeading>
                    Nearby
                  </ExperienceSectionHeading>

                  <ul className="mt-4 space-y-2 text-sm leading-7 text-neutral-600">
                    {accommodation.nearby.map((place) => (
                      <li key={place}>{place}</li>
                    ))}
                  </ul>
                </section>

                {/* Important information */}
                <section>
                  <ExperienceSectionSubHeading>
                    Good to know
                  </ExperienceSectionSubHeading>

                  <ExperienceSectionHeading>
                    Important information
                  </ExperienceSectionHeading>

                  <ul className="mt-4 space-y-2 text-sm leading-7 text-neutral-600">
                    {accommodation.importantInformation.map(
                      (information) => (
                        <li key={information}>{information}</li>
                      ),
                    )}
                  </ul>
                </section>
              </div>
            </div>

            {/* Booking / enquiry card */}
            <AccommodationBookingCard
              slug={accommodation.slug}
              name={accommodation.name}
            />
          </div>
        </Container>
      </section>

      <Recommendations items={recommendations} />
    </main>
  );
}