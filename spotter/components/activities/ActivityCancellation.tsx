import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "@/components/experiences/ExperienceSectionSubHeading";

type ActivityCancellationProps = {
  cancellation: string;
};

export default function ActivityCancellation({
  cancellation,
}: ActivityCancellationProps) {
  if (!cancellation) {
    return null;
  }

  return (
    <section className="mt-12 pt-12">
      <ExperienceSectionSubHeading>Cancellation</ExperienceSectionSubHeading>
     <ExperienceSectionHeading>Cancellation Policy</ExperienceSectionHeading>

      <div className="mt-5 border border-neutral-200 bg-neutral-50 p-5">
        <p className="text-sm leading-6 text-neutral-600">
          {cancellation}
        </p>
      </div>
    </section>
  );
}