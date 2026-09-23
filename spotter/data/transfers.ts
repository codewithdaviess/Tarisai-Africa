export type TransferType =
  | "Airport Transfer"
  | "Private Transfer"
  | "Local Transfer";

export type Transfer = {
  slug: string;
  name: string;
  type: TransferType;
  destination: string;
  description: string;
  image?: string;
  highlights: string[];
  enquiryOnly: true;
};

export const transfers: Transfer[] = [
  {
    slug: "victoria-falls-airport-to-hotel",
    name: "Victoria Falls Airport to Hotel",
    type: "Airport Transfer",
    destination: "Victoria Falls",
    description:
      "A pre-arranged transfer from Victoria Falls Airport to your hotel or lodge.",
    image: "/images/placeholder.jpg",
    highlights: ["Airport pickup", "Private vehicle", "Hotel drop-off"],
    enquiryOnly: true,
  },
  {
    slug: "victoria-falls-hotel-to-airport",
    name: "Victoria Falls Hotel to Airport",
    type: "Airport Transfer",
    destination: "Victoria Falls",
    description:
      "A scheduled transfer from your accommodation to Victoria Falls Airport.",
    image: "/images/placeholder.jpg",
    highlights: ["Hotel pickup", "Private vehicle", "Airport drop-off"],
    enquiryOnly: true,
  },
  {
    slug: "victoria-falls-local-transfer",
    name: "Private Victoria Falls Transfer",
    type: "Local Transfer",
    destination: "Victoria Falls",
    description:
      "A private local transfer between your accommodation, activities and other points of interest.",
    image: "/images/placeholder.jpg",
    highlights: ["Flexible routing", "Private vehicle", "Activity transfers"],
    enquiryOnly: true,
  },
];
