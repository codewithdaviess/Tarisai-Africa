import ExperienceFAQ from "@/components/research/ExperienceFAQ";
import type { DestinationFAQ } from "@/data/destinations";

type DestinationFAQsProps = {
  slug: string;
  faqs: DestinationFAQ[];
};

export default function DestinationFAQs({
  slug,
  faqs,
}: DestinationFAQsProps) {
  return <ExperienceFAQ type="destination" slug={slug} faqs={faqs} />;
}