export type AccommodationCategory =
  | "Luxury"
  | "Mid-range"
  | "Comfort & Value";

export type Accommodation = {
  slug: string;
  name: string;
  category: AccommodationCategory;
  location: string;
  image: string;
  description: string;
  details: string;
  propertyType: string;
  highlights: string[];
  facilities: string[];
  dining: string[];
  rooms: string[];
  whyStay: string;
  nearby: string[];
  importantInformation: string[];
  priceFrom?: {
    amount: number;
    currency: string;
    label: string;
  };
};

export const accommodations: Accommodation[] = [
  {
    slug: "palm-river-hotel",
    name: "Palm River Hotel",
    category: "Luxury",
    location: "Victoria Falls",
    image: "/images/accommodation/palm-river-hotel-1.webp",
    description:
      "A riverside hotel offering spacious accommodation, gardens and views towards the Zambezi River.",
    details:
      "Palm River Hotel sits along the Zambezi River and offers contemporary rooms and suites with private river-facing balconies, landscaped surroundings and facilities designed for relaxed stays.",
    propertyType: "Riverside luxury hotel",
    highlights: [
      "Zambezi River setting",
      "Private river-facing balconies",
      "Spacious rooms and suites",
      "Suitable for couples and families",
    ],
    facilities: [
      "Swimming pools",
      "Spa services",
      "Gym",
      "Complimentary Wi-Fi",
      "Concierge and guest services",
      "Laundry service",
    ],
    dining: [
      "Main restaurant",
      "Alfresco bar",
      "Afternoon tea",
      "In-room dining",
    ],
    rooms: [
      "Deluxe Rooms",
      "Deluxe Suites",
      "Executive Suites",
      "Honeymoon Suites",
      "Presidential Suite",
      "Palm River Villa",
    ],
    whyStay:
      "Well suited to travellers who prefer a quieter riverside setting with spacious accommodation and resort-style facilities.",
    nearby: [
      "Zambezi River",
      "Victoria Falls",
      "Victoria Falls town",
    ],
    importantInformation: [
      "Room categories include river-facing options.",
      "The Palm River Villa provides private accommodation for families or small groups.",
      "Rates vary according to room type and travel date.",
    ],
  },

  {
    slug: "ilala-lodge",
    name: "Ilala Lodge Hotel",
    category: "Mid-range",
    location: "Victoria Falls",
    image: "/images/accommodation/illala-lodge-1.webp",
    description:
      "A centrally located hotel offering comfortable accommodation within walking distance of Victoria Falls.",
    details:
      "Ilala Lodge Hotel has 73 rooms across its Deluxe, Garden and Pool Wings. Its location provides convenient access to Victoria Falls, while the gardens and surrounding National Park create opportunities for wildlife sightings around the property.",
    propertyType: "Upscale lodge hotel",
    highlights: [
      "73 rooms",
      "About 8-minute walk to Victoria Falls",
      "Views towards Falls spray",
      "Garden and National Park setting",
    ],
    facilities: [
      "Two swimming pools",
      "Poolside bar",
      "Spa treatments",
      "Tours and activities desk",
      "Complimentary Wi-Fi",
      "Conference facilities",
    ],
    dining: [
      "On-site restaurant",
      "Poolside Bar",
      "In-room dining",
    ],
    rooms: [
      "Classic Rooms",
      "Deluxe Rooms",
      "Classic Suites",
      "Executive Suites",
      "Strathearn Suite",
    ],
    whyStay:
      "A convenient option for travellers who want comfortable accommodation close enough to walk to Victoria Falls and explore the town easily.",
    nearby: [
      "Victoria Falls",
      "Victoria Falls town centre",
      "Victoria Falls National Park",
    ],
    importantInformation: [
      "The hotel currently lists 73 rooms.",
      "Classic Room rates currently start from around US$271 per person per night on the hotel's website.",
      "Rates vary by room category, occupancy and travel date.",
    ],
    priceFrom: {
      amount: 271,
      currency: "USD",
      label: "From per person per night",
    },
  },

  {
    slug: "shearwater-explorers-village",
    name: "Shearwater Explorers Village",
    category: "Comfort & Value",
    location: "Victoria Falls town centre",
    image: "/images/accommodation/shearwater-explorer-village-1.webp",
    description:
      "A well-located Victoria Falls lodge offering comfortable rooms, breakfast and easy access to the town's activities, shops and restaurants.",
    details:
      "Shearwater Explorers Village is approximately 400 metres from Victoria Falls and close to the town's craft markets and entertainment area. The property has 96 rooms, comprising Deluxe and Standard rooms, together with serviced camping options.",
    propertyType: "Value-oriented lodge",
    highlights: [
      "About 400 m from Victoria Falls",
      "96 rooms",
      "Close to town activities and shops",
      "Breakfast included",
    ],
    facilities: [
      "Swimming pool",
      "Restaurant and bar",
      "Lounge area",
      "Activity centre",
      "Gift shop",
      "24-hour front desk",
      "Guest services",
      "Wi-Fi",
    ],
    dining: [
      "On-site restaurant",
      "Bar",
      "Breakfast",
    ],
    rooms: [
      "Deluxe Rooms",
      "Standard Rooms",
      "Serviced Dome Tents",
      "Own Camping",
    ],
    whyStay:
      "A practical choice for travellers who want to stay close to Victoria Falls and the centre of town while keeping accommodation costs more manageable.",
    nearby: [
      "Victoria Falls",
      "Victoria Falls town centre",
      "Craft markets",
      "Restaurants and entertainment",
      "Elephants Walk Shopping & Artist Village",
    ],
    importantInformation: [
      "The property currently has 54 Deluxe Rooms and 42 Standard Rooms.",
      "The 2026 published rate is US$137 per person sharing for a Deluxe Room, including breakfast.",
      "The 2026 published rate is US$110 per person sharing for a Standard Room, including breakfast.",
      "Rates are published for 2026 and should be reconfirmed for the traveller's dates.",
      "Serviced tents and own camping are also available.",
    ],
    priceFrom: {
      amount: 110,
      currency: "USD",
      label: "From per person sharing",
    },
  },
];