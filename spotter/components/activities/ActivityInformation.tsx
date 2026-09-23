import ExperienceInformation from "@/components/experiences/ExperienceInformation";

type ActivityInformationProps = {
  items: string[];
};

export default function ActivityInformation({
  items,
}: ActivityInformationProps) {
  return <ExperienceInformation items={items} />;
}