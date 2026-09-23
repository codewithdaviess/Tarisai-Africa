import ExperienceChecklist from "@/components/experiences/ExperienceChecklist";

type ActivityIncludedProps = {
  items: string[];
};

export default function ActivityIncluded({ items }: ActivityIncludedProps) {
  return (
    <ExperienceChecklist
      subheading="Included"
      title="What's included"
      items={items}
      marker="included"
    />
  );
}
