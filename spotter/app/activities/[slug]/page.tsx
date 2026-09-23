import { notFound } from "next/navigation";

import { activities } from "@/data/activities";
import Container from "@/components/ui/Container";
import ActivityHero from "@/components/activities/ActivityHero";
import ActivitySummary from "@/components/activities/ActivitySummary";
import ActivityAbout from "@/components/activities/ActivityAbout";
import ActivityHighlights from "@/components/activities/ActivityHighlights";
import ActivityItinerary from "@/components/activities/ActivityItinerary";
import ActivityIncluded from "@/components/activities/ActivityIncluded";
import ActivityNotIncluded from "@/components/activities/ActivityNotIncluded";
import ActivityInformation from "@/components/activities/ActivityInformation";
import ActivityMeetingPoint from "@/components/activities/ActivityMeetingPoint";
import ActivityReviews from "@/components/activities/ActivityReviews";
import ActivityCancellation from "@/components/activities/ActivityCancellation";
import ActivityBookingCard from "@/components/activities/booking/ActivityBookingCard";
import ExperienceResearchTracker from "@/components/research/ExperienceResearchTracker";
import ExperienceFAQ from "@/components/research/ExperienceFAQ";
import ResearchPageTracker from "@/components/research/ResearchPageTracker";
import Recommendations from "@/components/research/Recommendations";
import { getRecommendations } from "@/lib/research/recommendations";

type ActivityPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { slug } = await params;

  const activity = activities.find((activity) => activity.slug === slug);

  if (!activity) {
    notFound();
  }

  const recommendations = await getRecommendations({
    type: "activity",
    slug: activity.slug,
  });

  return (
    <main className="bg-white">
      <ResearchPageTracker
        page={`/activities/${activity.slug}`}
        entityType="activity"
        entitySlug={activity.slug}
      />
      <ExperienceResearchTracker
        type="activity"
        slug={activity.slug}
      />

      {/* Hero */}
      <ActivityHero
        name={activity.name}
        image={activity.image}
        category={activity.category}
        location={activity.location}
        badge={activity.badge}

      />

      {/* Activity Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
            {/* Main Content */}
            <div>
              <ActivitySummary
                rating={activity.rating}
                reviewCount={activity.reviewCount}
                duration={activity.duration}
                location={activity.location}

              />

              <ActivityAbout 
                description={activity.description}
                name={activity.name}
              />
              <ActivityHighlights highlights={activity.highlights} />
              <ActivityItinerary
                items={activity.itinerary ?? []}
                slug={activity.slug}
              />
              <ActivityIncluded items={activity.included ?? []} />
              <ActivityNotIncluded items={activity.notIncluded ?? []} />
              <ActivityInformation items={activity.information ?? []} />
              <ActivityMeetingPoint
                location={activity.location}
                pickup={activity.pickup}
              />
              <ActivityReviews
                rating={activity.rating}
                reviewCount={activity.reviewCount}
                slug={activity.slug}
              />
              <ActivityCancellation
                cancellation={activity.cancellation?.policy ?? ""}
              />
              <ExperienceFAQ
                type="activity"
                slug={activity.slug}
                faqs={activity.faqs ?? []}
              />
            </div>

            {/* Booking */}
            <aside>
              <ActivityBookingCard
                slug={activity.slug}
                pricing={activity.pricing}
                duration={activity.duration}
              />
            </aside>
          </div>
        </Container>
      </section>

      <Recommendations items={recommendations} />
    </main>
  );
}
