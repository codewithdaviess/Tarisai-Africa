import Link from "next/link";
import type { Destination } from "@/data/destinations";

import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "@/components/experiences/ExperienceSectionSubHeading";

type DestinationGettingThereProps = {
  gettingThere: Destination["gettingThere"];
};

export default function DestinationGettingThere({
  gettingThere,
}: DestinationGettingThereProps) {
  return (
    <section className="mt-16 pt-10">
      <ExperienceSectionSubHeading>
        Arrive
      </ExperienceSectionSubHeading>

      <ExperienceSectionHeading>
        Getting there
      </ExperienceSectionHeading>

      <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-600">
        {gettingThere.overview}
      </p>

      <div className="mt-8 space-y-8">
        <article>
          <h3 className="font-semibold text-neutral-900">
            By air
          </h3>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600">
            {gettingThere.airport.name} ({gettingThere.airport.code}).{" "}
            {gettingThere.airport.description}
          </p>
        </article>

        <article>
          <h3 className="font-semibold text-neutral-900">
            By road
          </h3>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600">
            {gettingThere.road}
          </p>
        </article>

        <article>
          <h3 className="font-semibold text-neutral-900">
            {gettingThere.airportTransfer.title}
          </h3>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600">
            {gettingThere.airportTransfer.description}
          </p>

          <Link
            href={gettingThere.airportTransfer.link}
            className="mt-3 inline-flex text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-brand"
          >
            Arrange an airport transfer
          </Link>
        </article>

        <article>
          <h3 className="font-semibold text-neutral-900">
            {gettingThere.localTransfers.title}
          </h3>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600">
            {gettingThere.localTransfers.description}
          </p>

          <Link
            href={gettingThere.localTransfers.link}
            className="mt-3 inline-flex text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-brand"
          >
            Explore transfer options
          </Link>
        </article>
      </div>
    </section>
  );
}