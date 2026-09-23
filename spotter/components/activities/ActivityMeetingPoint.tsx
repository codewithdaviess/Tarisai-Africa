import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "../experiences/ExperienceSectionSubHeading";

type ActivityMeetingPointProps = {
  location: string;
  pickup?: string;
};

export default function ActivityMeetingPoint({
  location,
  pickup = "Available",
}: ActivityMeetingPointProps) {
  return (
    <section className="mt-12">
      <ExperienceSectionSubHeading>Meeting and Pickup</ExperienceSectionSubHeading>
      
      <ExperienceSectionHeading>Getting There </ExperienceSectionHeading>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="border border-neutral-200 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
            Location
          </p>

          <p className="mt-2 text-sm font-medium text-neutral-900">
            {location}
          </p>
        </div>

        <div className="border border-neutral-200 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
            Pickup
          </p>

          <p className="mt-2 text-sm font-medium text-neutral-900">{pickup}</p>
        </div>
      </div>
    </section>
  );
}
