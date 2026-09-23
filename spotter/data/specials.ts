export type Special = {
  slug: string;
  name: string;
  category: string;
  image: string;
  badge?: string;

  description: string;

  duration: {
    days: number;
    nights: number;
    label: string;
  };

  destinations: string[];

  activities: string[];

  highlights: string[];

  itinerary: {
    day: string;
    title: string;
    description: string;

    times?: {
      time: string;
      title: string;
      description: string;
    }[];

    activities?: string[];
  }[];

  included: string[];
  notIncluded: string[];

  information: string[];

  accommodation?: {
    name?: string;
    description: string;
    category: string;
  };

  pricing: {
    currency: string;
    tiers: PricingTier[];
  };

  cancellation?: {
    policy: string;
  };

  faqs?: {
    question: string;
    answer: string;
  }[];
};

export type PricingTier = {
  minPeople: number;
  maxPeople: number;
  pricePerPerson: number;
};

export function getSpecialPricePerPerson(
  pricing: Special["pricing"],
  people: number,
) {
  return (
    pricing.tiers.find(
      (tier) =>
        people >= tier.minPeople &&
        people <= tier.maxPeople,
    )?.pricePerPerson ?? null
  );
}

export function getSpecialFromPrice(
  pricing: Special["pricing"],
) {
  return Math.min(
    ...pricing.tiers.map(
      (tier) => tier.pricePerPerson,
    ),
  );
}

export const specials: Special[] = [
  /*
   * =====================================================
   * 1. VICTORIA FALLS ESSENTIALS
   * =====================================================
   */

  {
    slug: "victoria-falls-essentials",
    name: "Victoria Falls Essentials",
    category: "Short Escape",
    image: "/images/specials/victoria-falls-essentials.webp",
    badge: "Popular",

    description:
      "A relaxed Victoria Falls stay combining the Falls rainforest, a Zambezi sunset cruise and time to explore at your own pace.",

    duration: {
      days: 3,
      nights: 2,
      label: "3 Days / 2 Nights",
    },

    destinations: ["Victoria Falls"],

    activities: [
      "victoria-falls-tour",
      "zambezi-sunset-cruise",
    ],

    highlights: [
      "Guided Victoria Falls rainforest tour",
      "Zambezi sunset cruise",
      "Local airport and activity transfers",
      "Free time to explore Victoria Falls",
    ],

    pricing: {
      currency: "USD",
      tiers: [
        {
          minPeople: 1,
          maxPeople: 1,
          pricePerPerson: 850,
        },
        {
          minPeople: 2,
          maxPeople: 2,
          pricePerPerson: 800,
        },
        {
          minPeople: 3,
          maxPeople: 3,
          pricePerPerson: 750,
        },
        {
          minPeople: 4,
          maxPeople: 4,
          pricePerPerson: 700,
        },
        {
          minPeople: 5,
          maxPeople: 12,
          pricePerPerson: 650,
        },
      ],
    },

    itinerary: [
      {
        day: "Day 1",
        title: "Arrive in Victoria Falls",
        description:
          "Arrive in Victoria Falls, transfer to your accommodation and enjoy an evening on the Zambezi River.",

        times: [
          {
            time: "Arrival",
            title: "Airport transfer",
            description:
              "Meet your driver at Victoria Falls International Airport and transfer to your accommodation.",
          },
          {
            time: "Afternoon",
            title: "Check-in & free time",
            description:
              "Settle into your accommodation and enjoy some time to relax or explore independently.",
          },
          {
            time: "Late afternoon",
            title: "Zambezi sunset cruise",
            description:
              "Enjoy a relaxed cruise on the Zambezi River timed around sunset. Exact departure time is confirmed for your travel date.",
          },
        ],

        activities: [
          "zambezi-sunset-cruise",
        ],
      },

      {
        day: "Day 2",
        title: "Experience Victoria Falls",
        description:
          "Explore the Victoria Falls rainforest and viewpoints with a guide before enjoying a free afternoon.",

        times: [
          {
            time: "Morning",
            title: "Victoria Falls tour",
            description:
              "Explore the Victoria Falls rainforest and viewpoints with a local guide.",
          },
          {
            time: "Afternoon",
            title: "Free time",
            description:
              "Enjoy lunch and spend the afternoon relaxing, exploring the town or adding another experience.",
          },
        ],

        activities: [
          "victoria-falls-tour",
        ],
      },

      {
        day: "Day 3",
        title: "Departure",
        description:
          "Enjoy your final morning before checking out and continuing with your onward journey.",

        times: [
          {
            time: "Morning",
            title: "Breakfast & free time",
            description:
              "Enjoy breakfast and any remaining time at your accommodation.",
          },
          {
            time: "Check-out",
            title: "Departure transfer",
            description:
              "Transfer to Victoria Falls International Airport or your next destination.",
          },
        ],
      },
    ],

    included: [
      "2 nights accommodation",
      "Victoria Falls tour",
      "Zambezi sunset cruise",
      "Airport transfers",
      "Activity transfers",
    ],

    notIncluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Personal expenses",
      "Meals not specifically listed",
      "Optional additional activities",
    ],

    information: [
      "Activities are subject to availability and confirmed operating schedules.",
      "The sunset cruise departure time is confirmed according to the selected operator and travel date.",
      "Accommodation is selected within the agreed category and is subject to availability.",
      "The itinerary can be adjusted around confirmed arrival and departure times.",
    ],

    accommodation: {
      description:
        "Comfortable mid-range accommodation in Victoria Falls, selected according to availability and the agreed package.",
      category: "Mid-range",
    },

    cancellation: {
      policy:
        "Cancellation terms depend on the accommodation and activity suppliers included in the package. Final cancellation conditions are provided with the confirmed booking.",
    },

    faqs: [
      {
        question: "Can I add more activities?",
        answer:
          "Yes. Additional Victoria Falls activities can be added according to your travel dates, preferences and availability.",
      },
      {
        question: "Can I change the accommodation?",
        answer:
          "Yes. Alternative accommodation can be requested. Any difference in accommodation cost will be reflected in the final quote.",
      },
      {
        question: "Can I stay longer?",
        answer:
          "Yes. Additional nights and activities can be added to create a longer Victoria Falls stay.",
      },
    ],
  },

  /*
   * =====================================================
   * 2. VICTORIA FALLS ADVENTURE ESCAPE
   * =====================================================
   */

  {
    slug: "victoria-falls-adventure-escape",
    name: "Victoria Falls Adventure Escape",
    category: "Adventure",
    image: "/images/specials/victoria-falls-adventure-escape.webp",
    badge: "Adventure",

    description:
      "A four-day Victoria Falls escape combining the Falls, the Zambezi River and a full-day white-water rafting experience.",

    duration: {
      days: 4,
      nights: 3,
      label: "4 Days / 3 Nights",
    },

    destinations: ["Victoria Falls"],

    activities: [
      "victoria-falls-tour",
      "zambezi-sunset-cruise",
      "white-water-rafting",
    ],

    highlights: [
      "Victoria Falls rainforest tour",
      "Zambezi sunset cruise",
      "White-water rafting",
      "Adventure-focused Victoria Falls stay",
    ],

    pricing: {
      currency: "USD",
      tiers: [
        {
          minPeople: 1,
          maxPeople: 1,
          pricePerPerson: 1250,
        },
        {
          minPeople: 2,
          maxPeople: 2,
          pricePerPerson: 1200,
        },
        {
          minPeople: 3,
          maxPeople: 3,
          pricePerPerson: 1150,
        },
        {
          minPeople: 4,
          maxPeople: 4,
          pricePerPerson: 1100,
        },
        {
          minPeople: 5,
          maxPeople: 12,
          pricePerPerson: 1050,
        },
      ],
    },

    itinerary: [
      {
        day: "Day 1",
        title: "Arrive & Cruise the Zambezi",
        description:
          "Arrive in Victoria Falls, settle into your accommodation and enjoy an evening Zambezi experience.",

        times: [
          {
            time: "Arrival",
            title: "Airport transfer",
            description:
              "Transfer from Victoria Falls International Airport to your accommodation.",
          },
          {
            time: "Afternoon",
            title: "Check-in & free time",
            description:
              "Settle in and enjoy some time to relax.",
          },
          {
            time: "Late afternoon",
            title: "Zambezi sunset cruise",
            description:
              "Enjoy an evening cruise on the Zambezi River, with departure time confirmed for your travel date.",
          },
        ],

        activities: [
          "zambezi-sunset-cruise",
        ],
      },

      {
        day: "Day 2",
        title: "Explore Victoria Falls",
        description:
          "Spend the day exploring the Victoria Falls rainforest and viewpoints.",

        times: [
          {
            time: "Morning",
            title: "Victoria Falls tour",
            description:
              "Explore the Falls and surrounding rainforest with a guide.",
          },
          {
            time: "Afternoon",
            title: "Free time",
            description:
              "Enjoy lunch and spend the afternoon at your own pace.",
          },
        ],

        activities: [
          "victoria-falls-tour",
        ],
      },

      {
        day: "Day 3",
        title: "Zambezi White-Water Rafting",
        description:
          "Take on a full-day white-water rafting experience on the Zambezi River, subject to seasonal river conditions and operator availability.",

        times: [
          {
            time: "Early morning",
            title: "Rafting transfer & briefing",
            description:
              "Meet the rafting operator, transfer to the launch area and complete the required safety briefing.",
          },
          {
            time: "Daytime",
            title: "White-water rafting",
            description:
              "Experience the Zambezi River with a professional rafting operator.",
          },
          {
            time: "Late afternoon",
            title: "Return to Victoria Falls",
            description:
              "Return to Victoria Falls and enjoy a relaxed evening.",
          },
        ],

        activities: [
          "white-water-rafting",
        ],
      },

      {
        day: "Day 4",
        title: "Departure",
        description:
          "Enjoy your final morning in Victoria Falls before departure.",

        times: [
          {
            time: "Morning",
            title: "Breakfast & check-out",
            description:
              "Enjoy your final breakfast and check out of your accommodation.",
          },
          {
            time: "Departure",
            title: "Airport or onward transfer",
            description:
              "Continue to Victoria Falls International Airport or your next destination.",
          },
        ],
      },
    ],

    included: [
      "3 nights accommodation",
      "Victoria Falls tour",
      "Zambezi sunset cruise",
      "White-water rafting",
      "Airport transfers",
      "Activity transfers",
    ],

    notIncluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Personal expenses",
      "Meals not specifically listed",
      "Optional additional activities",
    ],

    information: [
      "White-water rafting is seasonal and depends on river conditions and operator availability.",
      "Adventure activities have specific participation, safety and age requirements.",
      "Rafting schedules and operating arrangements are confirmed for the selected travel date.",
      "The itinerary may be adjusted if river or operating conditions affect the activity.",
    ],

    accommodation: {
      description:
        "Comfortable mid-range accommodation in Victoria Falls, selected according to availability and the agreed package.",
      category: "Mid-range",
    },

    cancellation: {
      policy:
        "Cancellation terms depend on the accommodation and activity suppliers included in the package. Final cancellation conditions are provided with the confirmed booking.",
    },

    faqs: [
      {
        question: "Is rafting available all year?",
        answer:
          "No. White-water rafting depends on seasonal river conditions and operator schedules. Availability is confirmed for your travel dates.",
      },
      {
        question: "Can I replace rafting with another activity?",
        answer:
          "Yes. Subject to availability, rafting can be replaced with another Victoria Falls adventure experience and the package price can be adjusted accordingly.",
      },
      {
        question: "Can I extend the stay?",
        answer:
          "Yes. Additional nights and activities can be added according to availability.",
      },
    ],
  },

  /*
   * =====================================================
   * 3. FALLS & CHOBE ESCAPE
   * =====================================================
   */

  {
    slug: "falls-and-chobe-escape",
    name: "Falls & Chobe Escape",
    category: "Safari & Nature",
    image: "/images/specials/victoria-falls-chobe-escape.webp",
    badge: "Safari",

    description:
      "Combine Victoria Falls with a full-day Chobe National Park experience in Botswana, with time to enjoy the Zambezi before and after your safari.",

    duration: {
      days: 4,
      nights: 3,
      label: "4 Days / 3 Nights",
    },

    destinations: [
      "Victoria Falls",
      "Chobe National Park",
    ],

    activities: [
      "victoria-falls-tour",
      "zambezi-sunset-cruise",
      "chobe-national-park-day-trip",
    ],

    highlights: [
      "Victoria Falls rainforest tour",
      "Zambezi sunset cruise",
      "Chobe National Park safari",
      "Zimbabwe and Botswana in one journey",
    ],

    pricing: {
      currency: "USD",
      tiers: [
        {
          minPeople: 1,
          maxPeople: 1,
          pricePerPerson: 1100,
        },
        {
          minPeople: 2,
          maxPeople: 2,
          pricePerPerson: 1050,
        },
        {
          minPeople: 3,
          maxPeople: 3,
          pricePerPerson: 1000,
        },
        {
          minPeople: 4,
          maxPeople: 4,
          pricePerPerson: 950,
        },
        {
          minPeople: 5,
          maxPeople: 12,
          pricePerPerson: 900,
        },
      ],
    },

    itinerary: [
      {
        day: "Day 1",
        title: "Arrive in Victoria Falls",
        description:
          "Arrive in Victoria Falls, settle into your accommodation and enjoy an evening Zambezi cruise.",

        times: [
          {
            time: "Arrival",
            title: "Airport transfer",
            description:
              "Transfer from Victoria Falls International Airport to your accommodation.",
          },
          {
            time: "Afternoon",
            title: "Check-in & free time",
            description:
              "Settle in and enjoy some time to relax.",
          },
          {
            time: "Late afternoon",
            title: "Zambezi sunset cruise",
            description:
              "Enjoy an evening cruise on the Zambezi River. Departure time is confirmed for your travel date.",
          },
        ],

        activities: [
          "zambezi-sunset-cruise",
        ],
      },

      {
        day: "Day 2",
        title: "Explore Victoria Falls",
        description:
          "Explore Victoria Falls and the surrounding rainforest before enjoying a free afternoon.",

        times: [
          {
            time: "Morning",
            title: "Victoria Falls tour",
            description:
              "Explore the Falls rainforest and viewpoints with a guide.",
          },
          {
            time: "Afternoon",
            title: "Free time",
            description:
              "Enjoy lunch and spend the afternoon exploring or relaxing.",
          },
        ],

        activities: [
          "victoria-falls-tour",
        ],
      },

      {
        day: "Day 3",
        title: "Chobe National Park",
        description:
          "Travel into Botswana for a full-day Chobe National Park experience before returning towards Victoria Falls.",

        times: [
          {
            time: "Early morning",
            title: "Cross-border transfer",
            description:
              "Travel from Victoria Falls towards the Botswana border and continue to Chobe National Park.",
          },
          {
            time: "Morning",
            title: "Chobe safari experience",
            description:
              "Enjoy your scheduled wildlife experience in and around Chobe National Park.",
          },
          {
            time: "Afternoon",
            title: "Return journey",
            description:
              "Begin the return journey towards Victoria Falls.",
          },
        ],

        activities: [
          "chobe-national-park-day-trip",
        ],
      },

      {
        day: "Day 4",
        title: "Departure",
        description:
          "Enjoy your final morning in Victoria Falls before your onward journey.",

        times: [
          {
            time: "Morning",
            title: "Breakfast & check-out",
            description:
              "Enjoy breakfast and check out of your accommodation.",
          },
          {
            time: "Departure",
            title: "Airport or onward transfer",
            description:
              "Transfer to Victoria Falls International Airport or continue to your next destination.",
          },
        ],
      },
    ],

    included: [
      "3 nights accommodation",
      "Victoria Falls tour",
      "Zambezi sunset cruise",
      "Chobe National Park day experience",
      "Local transfers",
      "Safari transfers",
      "Cross-border transfer assistance",
    ],

    notIncluded: [
      "International flights",
      "Visa and immigration fees",
      "Travel insurance",
      "Personal expenses",
      "Meals not specifically listed",
      "Optional additional activities",
    ],

    information: [
      "Cross-border travel requirements apply when entering Botswana.",
      "Passport and visa requirements depend on nationality and current immigration rules.",
      "Chobe activities are subject to park, weather and operator conditions.",
      "Safari vehicle and river activities are subject to availability.",
      "Allow sufficient time for border procedures when planning onward flights.",
    ],

    accommodation: {
      description:
        "Comfortable mid-range accommodation in Victoria Falls, selected according to availability and the agreed package.",
      category: "Mid-range",
    },

    cancellation: {
      policy:
        "Cancellation terms depend on the accommodation, safari and activity suppliers included in the package. Final cancellation conditions are provided with the confirmed booking.",
    },

    faqs: [
      {
        question: "Do I need a visa for Botswana?",
        answer:
          "Entry requirements depend on your nationality. Travel Asambe will confirm the applicable requirements when preparing your booking.",
      },
      {
        question: "Can I stay longer in Victoria Falls?",
        answer:
          "Yes. Additional nights and activities can be added according to availability.",
      },
      {
        question: "Can I replace the Chobe experience?",
        answer:
          "Yes. Alternative experiences can be discussed depending on your interests and travel dates.",
      },
    ],
  },

  /*
   * =====================================================
   * 4. VICTORIA FALLS & HWANGE
   * =====================================================
   */

  {
    slug: "falls-and-hwange",
    name: "Victoria Falls & Hwange",
    category: "Wildlife & Nature",
    image: "/images/specials/victoria-falls-hwange.webp",
    badge: "Wildlife",

    description:
      "Combine Victoria Falls with a Zimbabwe safari in Hwange National Park for a journey that pairs the Falls with wildlife and wilderness.",

    duration: {
      days: 5,
      nights: 4,
      label: "5 Days / 4 Nights",
    },

    destinations: [
      "Victoria Falls",
      "Hwange National Park",
    ],

    activities: [
      "victoria-falls-tour",
      "zambezi-sunset-cruise",
      "hwange-national-park-safari",
    ],

    highlights: [
      "Victoria Falls rainforest tour",
      "Zambezi sunset cruise",
      "Hwange National Park safari",
      "Zimbabwe wildlife experience",
    ],

    pricing: {
      currency: "USD",
      tiers: [
        {
          minPeople: 1,
          maxPeople: 1,
          pricePerPerson: 1450,
        },
        {
          minPeople: 2,
          maxPeople: 2,
          pricePerPerson: 1400,
        },
        {
          minPeople: 3,
          maxPeople: 3,
          pricePerPerson: 1350,
        },
        {
          minPeople: 4,
          maxPeople: 4,
          pricePerPerson: 1300,
        },
        {
          minPeople: 5,
          maxPeople: 12,
          pricePerPerson: 1250,
        },
      ],
    },

    itinerary: [
      {
        day: "Day 1",
        title: "Arrive in Victoria Falls",
        description:
          "Arrive in Victoria Falls, settle into your accommodation and enjoy an evening on the Zambezi.",

        times: [
          {
            time: "Arrival",
            title: "Airport transfer",
            description:
              "Transfer from Victoria Falls International Airport to your accommodation.",
          },
          {
            time: "Afternoon",
            title: "Check-in & free time",
            description:
              "Settle in and enjoy some time to relax.",
          },
          {
            time: "Late afternoon",
            title: "Zambezi sunset cruise",
            description:
              "Enjoy an evening cruise on the Zambezi River.",
          },
        ],

        activities: [
          "zambezi-sunset-cruise",
        ],
      },

      {
        day: "Day 2",
        title: "Explore Victoria Falls",
        description:
          "Explore Victoria Falls and its rainforest before preparing for the safari portion of your journey.",

        times: [
          {
            time: "Morning",
            title: "Victoria Falls tour",
            description:
              "Explore the Falls rainforest and viewpoints with a guide.",
          },
          {
            time: "Afternoon",
            title: "Free time",
            description:
              "Enjoy lunch and spend the afternoon at your own pace.",
          },
        ],

        activities: [
          "victoria-falls-tour",
        ],
      },

      {
        day: "Day 3",
        title: "Travel to Hwange",
        description:
          "Travel from Victoria Falls towards Hwange National Park and settle into your safari accommodation.",

        times: [
          {
            time: "Morning",
            title: "Breakfast & check-out",
            description:
              "Enjoy breakfast before checking out of your Victoria Falls accommodation.",
          },
          {
            time: "Morning",
            title: "Transfer to Hwange",
            description:
              "Travel towards Hwange National Park. Exact journey time depends on the selected accommodation and road conditions.",
          },
          {
            time: "Afternoon",
            title: "Arrival & check-in",
            description:
              "Arrive at your safari accommodation and settle in.",
          },
          {
            time: "Afternoon",
            title: "Leisure time",
            description:
              "Relax at the lodge or arrange an available afternoon safari experience.",
          },
        ],
      },

      {
        day: "Day 4",
        title: "Hwange Safari",
        description:
          "Spend the day exploring Hwange National Park on safari.",

        times: [
          {
            time: "Early morning",
            title: "Morning safari",
            description:
              "Head out for an early wildlife experience in Hwange National Park.",
          },
          {
            time: "Midday",
            title: "Return & rest",
            description:
              "Return to the lodge for breakfast, lunch and time to relax.",
          },
          {
            time: "Afternoon",
            title: "Afternoon safari",
            description:
              "Continue exploring Hwange National Park during the afternoon.",
          },
        ],

        activities: [
          "hwange-national-park-safari",
        ],
      },

      {
        day: "Day 5",
        title: "Departure",
        description:
          "Enjoy your final morning before beginning your onward journey.",

        times: [
          {
            time: "Morning",
            title: "Breakfast",
            description:
              "Enjoy your final breakfast at the safari accommodation.",
          },
          {
            time: "Morning",
            title: "Onward transfer",
            description:
              "Begin your onward journey according to your confirmed travel arrangements.",
          },
        ],
      },
    ],

    included: [
      "4 nights accommodation",
      "Victoria Falls tour",
      "Zambezi sunset cruise",
      "Hwange safari experience",
      "Scheduled transfers",
      "Safari transfers",
    ],

    notIncluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Personal expenses",
      "Meals not specifically listed",
      "Optional additional activities",
    ],

    information: [
      "Wildlife sightings are not guaranteed.",
      "Safari routes and schedules may change according to wildlife, weather and park conditions.",
      "Travel time between Victoria Falls and Hwange depends on the selected accommodation and road conditions.",
      "Accommodation and safari arrangements are subject to availability.",
    ],

    accommodation: {
      description:
        "Mid-range accommodation in Victoria Falls and Hwange National Park or its surrounding safari area, selected according to availability.",
      category: "Mid-range",
    },

    cancellation: {
      policy:
        "Cancellation terms depend on the accommodation, safari and transfer suppliers included in the package. Final cancellation conditions are provided with the confirmed booking.",
    },

    faqs: [
      {
        question: "Can I add more safari days?",
        answer:
          "Yes. Additional nights and safari activities can be added according to availability.",
      },
      {
        question: "Are wildlife sightings guaranteed?",
        answer:
          "No. Wildlife is free-ranging and sightings cannot be guaranteed.",
      },
      {
        question: "Can I return to Victoria Falls after Hwange?",
        answer:
          "Yes. The itinerary can be arranged around your onward travel plans and available transfers.",
      },
    ],
  },

  /*
   * =====================================================
   * 5. VICTORIA FALLS, HWANGE & CHOBE
   * =====================================================
   */

  {
    slug: "victoria-falls-hwange-chobe",
    name: "Victoria Falls, Hwange & Chobe",
    category: "Wildlife Journey",
    image: "/images/specials/victoria-falls-hwange-chobe.png",
    badge: "Wildlife",

    description:
      "A multi-destination journey combining Victoria Falls, Zimbabwe's Hwange National Park and a Chobe National Park experience in Botswana.",

    duration: {
      days: 6,
      nights: 5,
      label: "6 Days / 5 Nights",
    },

    destinations: [
      "Victoria Falls",
      "Hwange National Park",
      "Chobe National Park",
    ],

    activities: [
      "victoria-falls-tour",
      "zambezi-sunset-cruise",
      "hwange-national-park-safari",
      "chobe-national-park-day-trip",
    ],

    highlights: [
      "Victoria Falls rainforest tour",
      "Zambezi sunset cruise",
      "Hwange National Park safari",
      "Chobe National Park experience",
    ],

    pricing: {
      currency: "USD",
      tiers: [
        {
          minPeople: 1,
          maxPeople: 1,
          pricePerPerson: 3900,
        },
        {
          minPeople: 2,
          maxPeople: 2,
          pricePerPerson: 3700,
        },
        {
          minPeople: 3,
          maxPeople: 3,
          pricePerPerson: 3500,
        },
        {
          minPeople: 4,
          maxPeople: 4,
          pricePerPerson: 3300,
        },
        {
          minPeople: 5,
          maxPeople: 12,
          pricePerPerson: 3100,
        },
      ],
    },

    itinerary: [
      {
        day: "Day 1",
        title: "Arrive in Victoria Falls",
        description:
          "Arrive in Victoria Falls and settle into your accommodation.",

        times: [
          {
            time: "Arrival",
            title: "Airport transfer",
            description:
              "Transfer from Victoria Falls International Airport to your accommodation.",
          },
          {
            time: "Afternoon",
            title: "Check-in & free time",
            description:
              "Settle in and enjoy some time to relax.",
          },
        ],
      },

      {
        day: "Day 2",
        title: "Victoria Falls & Zambezi",
        description:
          "Explore Victoria Falls before enjoying an evening cruise on the Zambezi River.",

        times: [
          {
            time: "Morning",
            title: "Victoria Falls tour",
            description:
              "Explore the Falls rainforest and viewpoints with a guide.",
          },
          {
            time: "Afternoon",
            title: "Lunch & free time",
            description:
              "Enjoy lunch and spend some time at your own pace.",
          },
          {
            time: "Late afternoon",
            title: "Zambezi sunset cruise",
            description:
              "Enjoy an evening cruise on the Zambezi River.",
          },
        ],

        activities: [
          "victoria-falls-tour",
          "zambezi-sunset-cruise",
        ],
      },

      {
        day: "Day 3",
        title: "Travel to Hwange",
        description:
          "Travel towards Hwange National Park and settle into your safari accommodation.",

        times: [
          {
            time: "Morning",
            title: "Breakfast & check-out",
            description:
              "Enjoy breakfast before leaving Victoria Falls.",
          },
          {
            time: "Morning",
            title: "Transfer to Hwange",
            description:
              "Travel towards Hwange National Park. Exact journey time depends on the selected accommodation and road conditions.",
          },
          {
            time: "Afternoon",
            title: "Arrival & check-in",
            description:
              "Arrive at your safari accommodation and settle in.",
          },
          {
            time: "Afternoon",
            title: "Leisure time",
            description:
              "Relax at the lodge or arrange an available afternoon safari experience.",
          },
        ],
      },

      {
        day: "Day 4",
        title: "Hwange Safari",
        description:
          "Spend the day exploring Hwange National Park on safari.",

        times: [
          {
            time: "Early morning",
            title: "Morning safari",
            description:
              "Begin the day with an early wildlife experience in Hwange National Park.",
          },
          {
            time: "Midday",
            title: "Rest & lunch",
            description:
              "Return to the lodge for breakfast, lunch and time to relax.",
          },
          {
            time: "Afternoon",
            title: "Afternoon safari",
            description:
              "Continue exploring Hwange National Park.",
          },
        ],

        activities: [
          "hwange-national-park-safari",
        ],
      },

      {
        day: "Day 5",
        title: "Return to Victoria Falls",
        description:
          "Return towards Victoria Falls and prepare for the following day's cross-border Chobe experience.",

        times: [
          {
            time: "Morning",
            title: "Breakfast & check-out",
            description:
              "Enjoy breakfast before leaving your Hwange accommodation.",
          },
          {
            time: "Morning",
            title: "Transfer to Victoria Falls",
            description:
              "Travel back towards Victoria Falls.",
          },
          {
            time: "Afternoon",
            title: "Check-in & free time",
            description:
              "Settle back into your Victoria Falls accommodation and prepare for the following day's Chobe experience.",
          },
        ],
      },

      {
        day: "Day 6",
        title: "Chobe & Onward Journey",
        description:
          "Travel into Botswana for your Chobe experience before continuing with your onward travel arrangements.",

        times: [
          {
            time: "Early morning",
            title: "Cross-border transfer",
            description:
              "Travel from Victoria Falls towards the Botswana border and continue to Chobe National Park.",
          },
          {
            time: "Morning",
            title: "Chobe safari experience",
            description:
              "Enjoy your scheduled wildlife experience in and around Chobe National Park.",
          },
          {
            time: "Afternoon",
            title: "Return or onward journey",
            description:
              "Continue according to your confirmed onward travel arrangements.",
          },
        ],

        activities: [
          "chobe-national-park-day-trip",
        ],
      },
    ],

    included: [
      "5 nights accommodation",
      "Victoria Falls tour",
      "Zambezi sunset cruise",
      "Hwange safari experience",
      "Chobe National Park experience",
      "Scheduled local transfers",
      "Safari transfers",
      "Cross-border transfer assistance",
    ],

    notIncluded: [
      "International flights",
      "Visa and immigration fees",
      "Travel insurance",
      "Personal expenses",
      "Meals not specifically listed",
      "Optional additional activities",
    ],

    information: [
      "Wildlife sightings are not guaranteed.",
      "Safari activities are subject to park, weather and operating conditions.",
      "Botswana border-entry requirements depend on nationality and current immigration rules.",
      "Travel times between destinations depend on road, border and operating conditions.",
      "Accommodation and activities are subject to availability.",
    ],

    accommodation: {
      description:
        "Mid-range accommodation selected in Victoria Falls and Hwange according to availability and the agreed itinerary.",
      category: "Mid-range",
    },

    cancellation: {
      policy:
        "Cancellation terms depend on the accommodation, safari, activity and transfer suppliers included in the package. Final cancellation conditions are provided with the confirmed booking.",
    },

    faqs: [
      {
        question: "Can I remove Chobe from the itinerary?",
        answer:
          "Yes. The itinerary can be redesigned around Victoria Falls and Hwange if you do not want the Botswana portion.",
      },
      {
        question: "Can I add more time in Hwange?",
        answer:
          "Yes. Additional nights and safari activities can be added according to availability.",
      },
      {
        question: "Do I need a visa for Botswana?",
        answer:
          "Entry requirements depend on your nationality. Travel Asambe will confirm the applicable requirements when preparing your booking.",
      },
      {
        question: "Can I change the accommodation category?",
        answer:
          "Yes. Accommodation can be upgraded or adjusted subject to availability and the resulting package price.",
      },
    ],
  },
];