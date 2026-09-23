import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "@/components/experiences/ExperienceSectionSubHeading";

type SpecialCancellationProps = {
  cancellation: string;
};

export default function SpecialCancellation({
  cancellation,
}: SpecialCancellationProps) {
  if (!cancellation) {
    return null;
  }

  return (
    <section className="mt-12 pt-12">
      <ExperienceSectionSubHeading>
        Before you book
      </ExperienceSectionSubHeading>

      <ExperienceSectionHeading>
        Cancellation policy
      </ExperienceSectionHeading>

      <div className="mt-5 border border-neutral-200 bg-neutral-50 p-5">
        <p className="text-sm leading-6 text-neutral-600">
          {cancellation}
        </p>
      </div>
    </section>
  );
}