import ExperienceChecklist from "@/components/experiences/ExperienceChecklist";

type SpecialNotIncludedProps = {
  items: string[];
};

export default function SpecialNotIncluded({
  items,
}: SpecialNotIncludedProps) {
  return (
    <ExperienceChecklist
      subheading="Not included"
      title="What's not included"
      items={items}
      marker="notIncluded"
    />
  );
}