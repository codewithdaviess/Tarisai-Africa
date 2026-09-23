import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "@/components/experiences/ExperienceSectionSubHeading";

type DestinationOverviewProps = {
  name: string;
  short: string;
  description: string;
};

export default function DestinationOverview({
  name,
  short,
  description,
}: DestinationOverviewProps) {
  return (
    <section className="mt-12">
      <ExperienceSectionSubHeading>Explore {name} </ExperienceSectionSubHeading>

       <ExperienceSectionHeading>{short}</ExperienceSectionHeading>

      <div className="mt-5 max-w-3xl">
        <p className="text-base leading-8 text-neutral-600">
          {description}
        </p>
      </div>
    </section>
  );
}