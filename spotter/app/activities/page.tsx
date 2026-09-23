import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { activities } from "@/data/activities";

export const metadata: Metadata = {
  title: "Victoria Falls Activities and Tours",
  description:
    "Discover guided tours, river experiences, wildlife, adventure and things to do in Victoria Falls.",
  alternates: { canonical: "/activities" },
};

export default function ActivitiesPage() {
  return (
    <>
      <PageHero
        image="/images/activities/boat-cruise-3.webp"
        title="Experience Zimbabwe."
        description="From the power of Victoria Falls to unforgettable adventures and wild landscapes, discover experiences worth remembering."
      />

      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-7xl px-2">
            <div className="mb-12 lg:max-w-2xl">
              <p className="mb-3 text-eyebrow font-medium tracking-[0.18em] text-brand">
                Things to Do
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                Experiences worth making time for.
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {activities.map((activity) => (
                <ActivityCard key={activity.slug} {...activity} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
