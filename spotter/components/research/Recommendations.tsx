import AccommodationCard from "@/components/accommodation/AccommodationCard";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { SpecialCard } from "@/components/specials/SpecialCard";
import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "../experiences/ExperienceSectionSubHeading";
import Container from "@/components/ui/Container";
import { accommodations } from "@/data/accommodations";
import { activities } from "@/data/activities";
import { specials } from "@/data/specials";
import type { Recommendation } from "@/lib/research/recommendations";

type RecommendationsProps = {
  items: Recommendation[];
};

export default function Recommendations({ items }: RecommendationsProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="bg-white py-12">
      <Container>
        <ExperienceSectionSubHeading>
          Recommended{" "}
          {items[0]?.type === "activity"
            ? "activities"
            : items[0]?.type === "accommodation"
              ? "accommodation"
              : "specials"}
        </ExperienceSectionSubHeading>
        <ExperienceSectionHeading>Continue exploring</ExperienceSectionHeading>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {items.map((item) => {
            const wrapperClass = "h-full";

            if (item.type === "activity") {
              const activity = activities.find(
                (entry) => entry.slug === item.slug,
              );
              return activity ? (
                <div key={`${item.type}-${item.slug}`} className={wrapperClass}>
                  <ActivityCard {...activity} />
                </div>
              ) : null;
            }

            if (item.type === "accommodation") {
              const accommodation = accommodations.find(
                (entry) => entry.slug === item.slug,
              );
              return accommodation ? (
                <div key={`${item.type}-${item.slug}`} className={wrapperClass}>
                  <AccommodationCard {...accommodation} />
                </div>
              ) : null;
            }

            const special = specials.find((entry) => entry.slug === item.slug);
            return special ? (
              <div key={`${item.type}-${item.slug}`} className={wrapperClass}>
                <SpecialCard
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
              </div>
            ) : null;
          })}
        </div>
      </Container>
    </section>
  );
}
