import Link from "next/link";

import type { DestinationStay } from "@/data/destinations";

import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "@/components/experiences/ExperienceSectionSubHeading";

type DestinationRecommendedStayProps = {
  stays: DestinationStay[];
};

export default function DestinationRecommendedStay({
  stays,
}: DestinationRecommendedStayProps) {
  if (!stays?.length) {
    return null;
  }

  return (
    <section className="mt-16 pt-10">
      <ExperienceSectionSubHeading>
        Plan your stay
      </ExperienceSectionSubHeading>

      <ExperienceSectionHeading>
        Where to stay
      </ExperienceSectionHeading>

      <div className="mt-8 space-y-10">
        {stays.map((stay) => (
          <article key={stay.duration}>
            <h3 className="text-xl font-semibold tracking-tight text-neutral-900">
              {stay.duration}
            </h3>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600">
              {stay.description}

              {stay.activities && stay.activities.length > 0 && (
                <>
                  {" "}
                  Good experiences to consider include{" "}
                  {stay.activities.map((activity, index) => (
                    <span key={activity.slug}>
                      <Link
                        href={`/activities/${activity.slug}`}
                        className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900"
                      >
                        {activity.name}
                      </Link>

                      {index < stay.activities!.length - 2
                        ? ", "
                        : index === stay.activities!.length - 2
                          ? " and "
                          : "."}
                    </span>
                  ))}
                </>
              )}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}