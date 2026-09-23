import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "@/components/experiences/ExperienceSectionSubHeading";

type DestinationHighlightsProps = {
  highlights: string[];
};

export default function DestinationHighlights({
  highlights,
}: DestinationHighlightsProps) {
  if (!highlights?.length) {
    return null;
  }

  return (
    <section className="mt-12 pt-10">
      <ExperienceSectionSubHeading>
        Destination
      </ExperienceSectionSubHeading>

      <ExperienceSectionHeading>
        Highlights
      </ExperienceSectionHeading>

      <div className="mt-5 flex flex-wrap gap-y-2 text-sm text-neutral-600">
        {highlights.map((highlight, index) => (
          <span key={highlight}>
            {highlight}

            {index < highlights.length - 1 && (
              <span className="mx-3 text-neutral-300">|</span>
            )}
          </span>
        ))}
      </div>
    </section>
  );
}