import ExperienceInformation from "@/components/experiences/ExperienceInformation";

type SpecialInformationProps = {
  items: string[];
};

export default function SpecialInformation({
  items,
}: SpecialInformationProps) {
  return (
    <ExperienceInformation items={items} />
  );
}