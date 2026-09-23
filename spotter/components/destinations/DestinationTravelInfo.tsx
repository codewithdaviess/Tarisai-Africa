import type { Destination } from "@/data/destinations";

import ReadMoreModal from "@/components/ui/ReadMoreModal";
import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "@/components/experiences/ExperienceSectionSubHeading";

type DestinationTravelInfoProps = {
  information: Destination["travelInformation"];
};

export default function DestinationTravelInfo({
  information,
}: DestinationTravelInfoProps) {
  const items = [
    information.currency,
    information.language,
    information.weather,
    information.electricity,
    information.internet,
    information.visa,
    information.health,
  ];

  return (
    <section className="mt-16 pt-10">
      <ExperienceSectionSubHeading>
        Plan your trip
      </ExperienceSectionSubHeading>

      <ExperienceSectionHeading>
        Travel information
      </ExperienceSectionHeading>

      <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-600">
        Practical information about currency, language, weather, connectivity,
        entry requirements and what to pack.
      </p>

      <ReadMoreModal title="Travel information">
        <div className="space-y-6">
          {items.map((item) => (
            <article key={item.title}>
              <h3 className="font-semibold text-neutral-900">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-7 text-neutral-600">
                {item.description}
              </p>
            </article>
          ))}

          <article>
            <h3 className="font-semibold text-neutral-900">
              {information.packing.title}
            </h3>

            <p className="mt-2 text-sm leading-7 text-neutral-600">
              {information.packing.items.join(" • ")}
            </p>
          </article>
        </div>
      </ReadMoreModal>
    </section>
  );
}