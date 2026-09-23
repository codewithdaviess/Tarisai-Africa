import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "@/components/experiences/ExperienceSectionSubHeading";

type SpecialHighlightsProps = {
  highlights: string[];
};

export default function SpecialHighlights({
  highlights,
}: SpecialHighlightsProps) {
  if (!highlights?.length) {
    return null;
  }

  return (
    <section className="mt-12 pt-10">
      <ExperienceSectionSubHeading>
        Special
      </ExperienceSectionSubHeading>

      <ExperienceSectionHeading>
        Highlights
      </ExperienceSectionHeading>

      <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2 text-sm text-neutral-600">
        {highlights.map((highlight, index) => (
          <span key={highlight}>
            {highlight}
            {index < highlights.length - 1 && (
              <span className="ml-3 text-neutral-300">|</span>
            )}
          </span>
        ))}
      </div>
    </section>
  );
}