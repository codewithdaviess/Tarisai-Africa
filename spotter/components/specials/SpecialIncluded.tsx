import ExperienceChecklist from "@/components/experiences/ExperienceChecklist";

type SpecialIncludedProps = {
  items: string[];
};

export default function SpecialIncluded({
  items,
}: SpecialIncludedProps) {
  return (
    <ExperienceChecklist
      subheading="Included"
      title="What's included"
      items={items}
      marker="included"
    />
  );
}