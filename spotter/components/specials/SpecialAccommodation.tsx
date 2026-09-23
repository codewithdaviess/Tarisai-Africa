import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "@/components/experiences/ExperienceSectionSubHeading";

type SpecialAccommodationProps = {
  accommodation: {
    name?: string;
    description: string;
    category: string;
  };
};

export default function SpecialAccommodation({
  accommodation,
}: SpecialAccommodationProps) {
  return (
    <section className="mt-12 pt-10">
      <ExperienceSectionSubHeading>
        Where you’ll stay
      </ExperienceSectionSubHeading>

      <ExperienceSectionHeading>
        Accommodation
      </ExperienceSectionHeading>

      {accommodation.name && (
        <h3 className="mt-5 font-medium text-neutral-900">
          {accommodation.name}
        </h3>
      )}

      <p className="mt-2 text-xs uppercase tracking-[0.12em] text-neutral-400">
        {accommodation.category}
      </p>

      <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-600">
        {accommodation.description}
      </p>
    </section>
  );
}