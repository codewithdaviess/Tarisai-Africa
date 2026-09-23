import ExperienceChecklist from "@/components/experiences/ExperienceChecklist";

type ActivityNotIncludedProps = {
  items: string[];
};

export default function ActivityNotIncluded({
  items,
}: ActivityNotIncludedProps) {
  return (
    <ExperienceChecklist
    subheading="Not Included"
      title="What's not included"
      items={items}
      marker="notIncluded"
    />
  );
}