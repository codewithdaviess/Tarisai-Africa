import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "@/components/experiences/ExperienceSectionSubHeading";


type ActivityAboutProps = {
  description: string;
  name: string;
};

export default function ActivityAbout({
  description,
  name,
}: ActivityAboutProps) {
  return (
    <section className="mt-12">
      <ExperienceSectionSubHeading>
              About This Experience
      </ExperienceSectionSubHeading>

      <ExperienceSectionHeading>About {name}</ExperienceSectionHeading>

      <div className="mt-4 max-w-3xl">
        <p className="text-base leading-7 text-neutral-600">{description}</p>
      </div>
    </section>
  );
}
