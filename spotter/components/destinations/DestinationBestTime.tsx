import Link from "next/link";

import type { DestinationSeason } from "@/data/destinations";

import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "@/components/experiences/ExperienceSectionSubHeading";

type DestinationBestTimeProps = {
  overview: string;
  seasons: DestinationSeason[];
};

export default function DestinationBestTime({
  overview,
  seasons,
}: DestinationBestTimeProps) {
  if (!seasons?.length) {
    return null;
  }

  return (
    <section className="mt-16 pt-10">
      <ExperienceSectionSubHeading>
        When to go
      </ExperienceSectionSubHeading>

      <ExperienceSectionHeading>
        Best time to visit
      </ExperienceSectionHeading>

      <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-600">
        {overview}
      </p>

      <div className="mt-8 space-y-10">
        {seasons.map((season) => (
          <article key={season.period}>
            <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
              {season.period}
            </h3>

            <p className="mt-1 text-sm font-medium text-neutral-400">
              {season.dates}
            </p>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600">
              {season.description}

              {season.activities && season.activities.length > 0 && (
                <>
                  {" "}
                  Good experiences to consider during this period include{" "}
                  {season.activities.map((activity, index) => (
                    <span key={activity.slug}>
                      <Link
                        href={`/activities/${activity.slug}`}
                        className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900"
                      >
                        {activity.name}
                      </Link>

                      {index < season.activities!.length - 2
                        ? ", "
                        : index === season.activities!.length - 2
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