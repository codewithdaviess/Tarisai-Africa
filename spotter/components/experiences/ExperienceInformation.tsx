import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "./ExperienceSectionSubHeading";

type ExperienceInformationProps = {
  items: string[];
};

export default function ExperienceInformation({
  items,
}: ExperienceInformationProps) {
  if (!items?.length) {
    return null;
  }

  return (
    <section className="mt-12">
      <ExperienceSectionSubHeading>
        Good to Know
      </ExperienceSectionSubHeading>
       
      <ExperienceSectionHeading>
        Important information
      </ExperienceSectionHeading>

      <div className="mt-5 ">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-4 py-4">
            <span className="mt-0.5 text-brand" aria-hidden="true">
              -
            </span>

            <p className="text-sm leading-6 text-neutral-600">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
