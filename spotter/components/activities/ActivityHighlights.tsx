import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "@/components/experiences/ExperienceSectionSubHeading";

type ActivityHighlightsProps = {
  highlights: string[];
};

export default function ActivityHighlights({
  highlights,
}: ActivityHighlightsProps) {
  if (!highlights?.length) {
    return null;
  }

  return (
    <section className="mt-12 pt-10">
      <ExperienceSectionSubHeading>
        Highlights
      </ExperienceSectionSubHeading>

      <ExperienceSectionHeading>
        What you’ll experience
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