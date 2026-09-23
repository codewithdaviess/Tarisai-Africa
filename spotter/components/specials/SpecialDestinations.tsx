import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "@/components/experiences/ExperienceSectionSubHeading";

type SpecialDestinationsProps = {
  destinations: string[];
};

export default function SpecialDestinations({
  destinations,
}: SpecialDestinationsProps) {
  if (!destinations?.length) {
    return null;
  }

  return (
    <section className="mt-12 pt-10">
      <ExperienceSectionSubHeading>
        Where you’ll go
      </ExperienceSectionSubHeading>

      <ExperienceSectionHeading>
        Destinations
      </ExperienceSectionHeading>

      <div className="mt-5 flex flex-wrap gap-3">
        {destinations.map((destination) => (
          <span
            key={destination}
            className="rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-700"
          >
            {destination}
          </span>
        ))}
      </div>
    </section>
  );
}