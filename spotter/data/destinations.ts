export type DestinationThingToDo = {
  name: string;
  slug: string;
};

export type DestinationSeason = {
  period: string;
  dates: string;
  description: string;
  activities?: DestinationThingToDo[];
};

export type DestinationStay = {
  duration: string;
  description: string;
  activities?: DestinationThingToDo[];
};

export type DestinationAccommodation = {
  name: string;
  slug: string;
  category: "Luxury" | "Mid-range" | "Comfort & Value";
  description: string;
  propertyType?: string;
  highlights?: string[];
  priceFrom?: string;
};

export type DestinationItinerary = {
  title: string;
  duration: string;
  description: string;
  outline: string[];
};

export type DestinationFAQ = {
  question: string;
  answer: string;
};

export type Destination = {
  slug: string;
  name: string;
  country: string;
  region: string;

  tagline: string;

  heroImage: string;

  overview: {
    short: string;
    description: string;
  };

  whyVisit: {
    title: string;
    description: string;
    image: string;
  }[];

  highlights: string[];

  facts: {
    waterfallWidth: string;
    waterfallAltitude: string;
    averageDepth: string;
    deepestPoint: string;
    worldHeritage: string;
    worldHeritageType: string;
    river: string;
  };

  thingsToDo: DestinationThingToDo[];

  bestTimeToVisit: {
    overview: string;
    seasons: DestinationSeason[];
  };

  recommendedStay: DestinationStay[];

  whereToStay: {
    overview: string;
    accommodations: DestinationAccommodation[];
  };

  gettingThere: {
    overview: string;

    airport: {
      name: string;
      code: string;
      description: string;
    };

    road: string;

    airportTransfer: {
      slug: string;
      title: string;
      description: string;
      link: string;
    };

    localTransfers: {
      slug: string;
      title: string;
      description: string;
      link: string;
    };
  };

  travelInformation: {
    currency: {
      title: string;
      description: string;
    };

    language: {
      title: string;
      description: string;
    };

    weather: {
      title: string;
      description: string;
    };

    electricity: {
      title: string;
      description: string;
    };

    internet: {
      title: string;
      description: string;
    };

    visa: {
      title: string;
      description: string;
    };

    health: {
      title: string;
      description: string;
    };

    packing: {
      title: string;
      items: string[];
    };
  };

  sampleItineraries: DestinationItinerary[];

  destinationHighlights: {
    waterfall: string;
    river: string;
    wildlife: string;
    adventure: string;
    culture: string;
  };

  practicalTips: string[];

  faqs: DestinationFAQ[];

  relatedContent: {
    activities: string[];
    packages: string[];
    destinations: string[];
  };

  travelAsambe: {
    title: string;
    description: string;
    services: string[];
    cta: string;
  };

  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };

  /**
   * Existing fields used elsewhere in the site.
   * Keep these while we transition the destination pages.
   */
  location?: string;
  image?: string;
  description?: string;
  intro?: string;
  bestFor?: string[];
  activities?: string[];
  specials?: string[];
  practicalInfo?: {
    gettingThere?: string;
    stay?: string;
    season?: string;
  };
};

export const destinations: Destination[] = [
  {
    slug: "victoria-falls",

    name: "Victoria Falls",

    country: "Zimbabwe",

    region: "Matabeleland North",

    tagline:
      "The Smoke that Thunders — where the Zambezi River meets one of Africa's most spectacular natural landmarks.",

    heroImage: "/images/destinations/victoria-falls-1.webp",

    overview: {
      short:
        "Victoria Falls is Zimbabwe's flagship tourism destination, centred around Mosi-oa-Tunya, the great waterfall on the Zambezi River along the border between Zimbabwe and Zambia.",

      description:
        "Victoria Falls is a town in north-western Zimbabwe and one of Southern Africa's best-known travel destinations. At its centre is Mosi-oa-Tunya, meaning 'The Smoke that Thunders', where the Zambezi River plunges through a series of basalt gorges to create a vast curtain of falling water, spray and mist. The Falls form part of the transboundary Mosi-oa-Tunya / Victoria Falls UNESCO World Heritage property shared by Zimbabwe and Zambia. Beyond the waterfall itself, Victoria Falls offers access to the Zambezi River, wildlife, adventure activities, cultural experiences, scenic excursions and a wide range of accommodation.",
    },

    whyVisit: [
      {
        title: "See Mosi-oa-Tunya",
        description:
          "Walk through the rainforest and explore viewpoints overlooking Victoria Falls, where the Zambezi River plunges into a series of dramatic basalt gorges.",
        image: "/images/destinations/victoria-falls-2.webp",
      },

      {
        title: "Experience the Zambezi",
        description:
          "The Zambezi River is central to the Victoria Falls experience, offering opportunities for sunset cruises, fishing, river adventures and scenic exploration.",
        image: "/images/destinations/victoria-falls-3.webp",
      },

      {
        title: "Add Adventure",
        description:
          "Victoria Falls offers experiences for different levels of adventure, from relaxed sightseeing and river cruises to rafting and other adrenaline-filled activities.",
        image: "/images/destinations/victoria-falls-4.webp",
      },

      {
        title: "Discover Wildlife",
        description:
          "The surrounding protected areas provide opportunities to experience Zimbabwean wildlife, while nearby Hwange National Park makes it easy to extend a Victoria Falls stay into a safari.",
        image: "/images/destinations/victoria-falls-5.webp",
      },

      {
        title: "Explore Beyond the Falls",
        description:
          "Victoria Falls is more than a single attraction. A stay can include river experiences, wildlife, local culture, dining, markets and excursions around the wider destination.",
        image: "/images/destinations/victoria-falls/town.jpg",
      },

      {
        title: "Build Your Own Journey",
        description:
          "Stay for a short escape or use Victoria Falls as the starting point for a longer Southern African journey combining Zimbabwe, Zambia and Botswana.",
        image: "/images/destinations/victoria-falls/journey.jpg",
      },
    ],

    highlights: [
      "Mosi-oa-Tunya / Victoria Falls",
      "Victoria Falls Rainforest",
      "Zambezi River",
      "Victoria Falls National Park",
      "Zambezi National Park",
      "Zambezi sunset cruises",
      "Wildlife experiences",
      "Adventure activities",
      "Cultural experiences",
    ],

    facts: {
      waterfallWidth: "Approximately 1,708 metres",

      waterfallAltitude:
        "Approximately 915 metres above mean sea level",

      averageDepth: "Approximately 100 metres",

      deepestPoint: "Approximately 108 metres",

      worldHeritage:
        "UNESCO World Heritage Site since 1989",

      worldHeritageType:
        "Transboundary natural World Heritage property shared by Zimbabwe and Zambia",

      river: "Zambezi River",
    },

    thingsToDo: [
      {
        name: "Victoria Falls Tour",
        slug: "victoria-falls-tour",
      },

      {
        name: "Zambezi Sunset Cruise",
        slug: "zambezi-sunset-cruise",
      },

      {
        name: "White-water Rafting",
        slug: "white-water-rafting",
      },

      {
        name: "Bungee Jumping",
        slug: "bungee-jumping",
      },

      {
        name: "Victoria Falls Canopy Tour",
        slug: "victoria-falls-canopy-tour",
      },

      {
        name: "Scenic Flight",
        slug: "victoria-falls-scenic-flight",
      },
    ],

    bestTimeToVisit: {
      overview:
        "Victoria Falls changes throughout the year as seasonal rainfall affects the volume of water flowing down the Zambezi. There is no single best time for every traveller. Higher water levels create heavier spray and a powerful spectacle, while the drier period can provide clearer views of the individual Falls and surrounding gorge.",

      seasons: [
        {
          period: "Green Season",
          dates: "January – March",
          description:
            "The wetter part of the year brings greener landscapes and increasing river levels. Rainfall can be variable, so travellers should allow flexibility when planning outdoor activities.",

          activities: [
            {
              name: "Victoria Falls Tour",
              slug: "victoria-falls-tour",
            },

            {
              name: "Zambezi Sunset Cruise",
              slug: "zambezi-sunset-cruise",
            },
          ],
        },

        {
          period: "High Water",
          dates: "April – May",
          description:
            "The Zambezi typically reaches its highest levels after the rainy season. The Falls can produce substantial spray and mist, creating a dramatic high-water experience. The spray can also reduce visibility from some viewpoints.",

          activities: [
            {
              name: "Victoria Falls Tour",
              slug: "victoria-falls-tour",
            },

            {
              name: "Zambezi Sunset Cruise",
              slug: "zambezi-sunset-cruise",
            },
          ],
        },

        {
          period: "Dry & Cooler Season",
          dates: "June – August",
          description:
            "Drier conditions and cooler temperatures generally make this a comfortable period for exploring Victoria Falls and combining sightseeing with river and outdoor experiences. Water levels gradually decrease from their seasonal peak.",

          activities: [
            {
              name: "Victoria Falls Tour",
              slug: "victoria-falls-tour",
            },

            {
              name: "Zambezi Sunset Cruise",
              slug: "zambezi-sunset-cruise",
            },
          ],
        },

        {
          period: "Hot & Dry Season",
          dates: "September – October",
          description:
            "The weather becomes hotter and drier, while water levels continue to decline. Lower water can reveal more of the underlying gorge and Falls structure, although some sections may become less powerful later in the dry season.",

          activities: [
            {
              name: "Zambezi Sunset Cruise",
              slug: "zambezi-sunset-cruise",
            },

            {
              name: "Victoria Falls Canopy Tour",
              slug: "victoria-falls-canopy-tour",
            },
          ],
        },

        {
          period: "Early Rains",
          dates: "November – December",
          description:
            "Temperatures remain warm and the first seasonal rains can begin to transform the landscape. Conditions may change quickly as the destination moves towards the wetter season.",

          activities: [
            {
              name: "Victoria Falls Tour",
              slug: "victoria-falls-tour",
            },

            {
              name: "Zambezi Sunset Cruise",
              slug: "zambezi-sunset-cruise",
            },
          ],
        },
      ],
    },

    recommendedStay: [
      {
        duration: "2 nights",
        description:
          "A short Victoria Falls escape that gives you enough time to visit the Falls and experience the Zambezi through a second activity.",

        activities: [
          {
            name: "Victoria Falls Tour",
            slug: "victoria-falls-tour",
          },

          {
            name: "Zambezi Sunset Cruise",
            slug: "zambezi-sunset-cruise",
          },
        ],
      },

      {
        duration: "3 nights",
        description:
          "A balanced stay with time for the Falls, a Zambezi experience and another activity or excursion without making the trip feel rushed.",

        activities: [
          {
            name: "Victoria Falls Tour",
            slug: "victoria-falls-tour",
          },

          {
            name: "Zambezi Sunset Cruise",
            slug: "zambezi-sunset-cruise",
          },

          {
            name: "Victoria Falls Canopy Tour",
            slug: "victoria-falls-canopy-tour",
          },
        ],
      },

      {
        duration: "4–5 nights",
        description:
          "A longer stay gives you time to combine the Falls with adventure, wildlife, river experiences and a wider excursion while keeping a comfortable pace.",

        activities: [
          {
            name: "Victoria Falls Tour",
            slug: "victoria-falls-tour",
          },

          {
            name: "Zambezi Sunset Cruise",
            slug: "zambezi-sunset-cruise",
          },

          {
            name: "Victoria Falls Canopy Tour",
            slug: "victoria-falls-canopy-tour",
          },

          {
            name: "White-water Rafting",
            slug: "white-water-rafting",
          },
        ],
      },
    ],

    whereToStay: {
      overview:
        "Victoria Falls has accommodation ranging from historic luxury hotels and premium lodges to comfortable mid-range properties and good-value stays. The right choice depends on your preferred level of comfort, location and the type of experience you want from your trip.",

      accommodations: [
        {
          name: "The Victoria Falls Hotel",
          slug: "victoria-falls-hotel",
          category: "Luxury",
          description:
            "A historic five-star hotel in the heart of Victoria Falls, established in 1904 and known for its classic Edwardian character, gardens and location close to the Falls.",

          propertyType: "Historic luxury hotel",

          highlights: [
            "Five-star hotel",
            "Established in 1904",
            "Close to Victoria Falls",
            "Historic Edwardian character",
            "Multiple room and suite categories",
          ],

          // Keep the current rate on the accommodation record itself.
          // Rates change and should be updated independently.
          priceFrom: "From USD 664 per night",
        },
      ],
    },

    gettingThere: {
      overview:
        "Victoria Falls is accessible by air and road. The town is served by Victoria Falls International Airport and is connected by road to other destinations in Zimbabwe and neighbouring countries.",

      airport: {
        name: "Victoria Falls International Airport",
        code: "VFA",

        description:
          "Victoria Falls International Airport is the main air gateway for visitors arriving in the Victoria Falls area. From the airport, travellers can continue by road to hotels, lodges and other accommodation in and around Victoria Falls.",
      },

      road:
        "Victoria Falls can be reached by road from other destinations in Zimbabwe and from neighbouring countries. Road travel is particularly useful when combining Victoria Falls with Hwange National Park or continuing towards other regional destinations.",

      airportTransfer: {
        slug: "victoria-falls-airport-transfer",
        title: "Airport transfers",
        description:
          "Arrange a transfer from Victoria Falls International Airport to your hotel, lodge or other accommodation.",

        link:
          "/enquire?service=airport-transfer&destination=victoria-falls",
      },

      localTransfers: {
        slug: "victoria-falls-local-transfers",
        title: "Local transfers",
        description:
          "Arrange transfers between your accommodation, activities and other points of interest around Victoria Falls.",

        link:
          "/enquire?service=local-transfers&destination=victoria-falls",
      },
    },

    travelInformation: {
      currency: {
        title: "Currency",

        description:
          "The United States Dollar (USD) is widely used in Zimbabwe's tourism sector. Zimbabwe also has the Zimbabwe Gold (ZiG) as its local currency. Currency acceptance and payment options can vary between businesses, so travellers should confirm payment arrangements when booking.",
      },

      language: {
        title: "Language",

        description:
          "English is widely used in tourism and is commonly spoken in Victoria Falls. Shona, Ndebele and other Zimbabwean languages are also spoken across the country.",
      },

      weather: {
        title: "Weather",

        description:
          "Victoria Falls has distinct wet and dry periods. The landscape, river levels and appearance of the Falls change through the year, so the most suitable travel period depends on whether you prioritise high water and dramatic spray, clearer views, cooler weather or wildlife experiences.",
      },

      electricity: {
        title: "Electricity",

        description:
          "Zimbabwe uses approximately 220–240V electricity and Type G power outlets. Travellers should bring a suitable travel adaptor for their devices.",
      },

      internet: {
        title: "Internet",

        description:
          "Wi-Fi and mobile connectivity are available across much of Victoria Falls, particularly at hotels, lodges and established tourism businesses. Connection quality can vary by property and location.",
      },

      visa: {
        title: "Visa",

        description:
          "Zimbabwe entry and visa requirements depend on nationality and travel circumstances. Travellers should check the latest requirements with the relevant Zimbabwe immigration authorities before departure.",
      },

      health: {
        title: "Health",

        description:
          "Travellers should check current health advice for Zimbabwe before departure and discuss any destination-specific precautions with a qualified healthcare professional. Travel insurance with appropriate medical and evacuation cover is recommended.",
      },

      packing: {
        title: "What to pack",

        items: [
          "Comfortable walking shoes",
          "Lightweight clothing",
          "Warm layer for cooler mornings and evenings",
          "Sun protection",
          "Sunscreen",
          "Insect repellent",
          "Waterproof protection for cameras and phones",
          "Swimwear",
          "Travel adaptor",
          "Reusable water bottle",
        ],
      },
    },

    sampleItineraries: [
      {
        title: "Victoria Falls Essentials",
        duration: "3 days / 2 nights",

        description:
          "A simple introduction to Victoria Falls combining the main waterfall experience with a relaxed Zambezi sunset cruise.",

        outline: [
          "Arrive in Victoria Falls and settle into your accommodation",
          "Explore Victoria Falls and the surrounding rainforest viewpoints",
          "Enjoy a Zambezi sunset cruise",
          "Depart Victoria Falls",
        ],
      },

      {
        title: "Victoria Falls Adventure Escape",
        duration: "4 days / 3 nights",

        description:
          "A balanced Victoria Falls stay combining the waterfall, river and an additional adventure experience.",

        outline: [
          "Arrive and settle into Victoria Falls",
          "Explore Victoria Falls",
          "Enjoy a Zambezi sunset cruise",
          "Choose an adventure or scenic experience",
          "Depart Victoria Falls",
        ],
      },

      {
        title: "Victoria Falls & Hwange",
        duration: "5–6 days",

        description:
          "Combine the Falls with a Zimbabwe safari for a journey that brings together natural wonder, river experiences and wildlife.",

        outline: [
          "Arrive in Victoria Falls",
          "Explore Victoria Falls",
          "Experience the Zambezi",
          "Travel towards Hwange National Park",
          "Enjoy a safari experience in Hwange",
          "Return or continue your journey",
        ],
      },

      {
        title: "Victoria Falls & Chobe",
        duration: "4–5 days",

        description:
          "Combine Victoria Falls with a cross-border wildlife experience in Botswana's Chobe region.",

        outline: [
          "Arrive in Victoria Falls",
          "Explore Victoria Falls",
          "Enjoy a Zambezi River experience",
          "Travel towards Kasane and Chobe",
          "Experience Chobe by game drive or river safari",
          "Return or continue your journey",
        ],
      },
    ],

    destinationHighlights: {
      waterfall:
        "Mosi-oa-Tunya / Victoria Falls is the defining attraction of the destination and forms part of a UNESCO World Heritage property shared by Zimbabwe and Zambia.",

      river:
        "The Zambezi River shapes the destination, providing scenery and opportunities for sunset cruises, fishing and other river-based experiences.",

      wildlife:
        "Wildlife experiences are available around Victoria Falls, while nearby protected areas and Hwange National Park provide opportunities to extend a visit into a dedicated safari.",

      adventure:
        "Victoria Falls offers a broad range of adventure experiences, from river activities and canopy experiences to rafting, bungee jumping and scenic flights.",

      culture:
        "The Victoria Falls area offers opportunities to learn about local communities, Zimbabwean culture and the history surrounding the Zambezi and the Falls.",
    },

    practicalTips: [
      "Allow at least two nights if the Falls are a main reason for your visit.",
      "Wear comfortable walking shoes when exploring the Falls viewpoints and rainforest.",
      "Protect cameras and phones from spray, particularly during higher-water periods.",
      "Carry sun protection and stay hydrated during warmer months.",
      "Choose activities according to seasonal conditions and the operator's current schedule.",
      "Book accommodation, transfers and popular activities ahead of busy travel periods.",
      "If combining Victoria Falls with Hwange or Chobe, allow enough time for road transfers and border formalities where applicable.",
      "Check current visa, entry, health and travel requirements before departure.",
    ],

    faqs: [
      {
        question: "Where is Victoria Falls?",

        answer:
          "Victoria Falls is in north-western Zimbabwe on the Zambezi River, close to the border with Zambia. The waterfall forms part of the transboundary Mosi-oa-Tunya / Victoria Falls UNESCO World Heritage property.",
      },

      {
        question: "What is Victoria Falls called locally?",

        answer:
          "The Falls are also known as Mosi-oa-Tunya, commonly translated as 'The Smoke that Thunders'. The name refers to the spray, mist and sound created as the Zambezi River plunges into the gorges below.",
      },

      {
        question: "How wide is Victoria Falls?",

        answer:
          "The waterfall spans approximately 1,708 metres. UNESCO describes Mosi-oa-Tunya / Victoria Falls as the world's greatest sheet of falling water.",
      },

      {
        question: "How high is Victoria Falls?",

        answer:
          "The waterfall reaches a maximum depth of approximately 108 metres, with the main sections ranging from about 61 to 99 metres.",
      },

      {
        question: "How long should I stay in Victoria Falls?",

        answer:
          "Two nights can work for a short visit focused on the Falls and one additional experience. Three nights gives you more flexibility, while four or more nights works well if you want to add several activities or combine Victoria Falls with a safari.",
      },

      {
        question: "When is the best time to visit Victoria Falls?",

        answer:
          "There is no single best period for every traveller. Higher water levels generally create more spray and a dramatic spectacle, while lower water levels can provide clearer views of the individual Falls and gorge. Weather and wildlife conditions also vary throughout the year.",
      },

      {
        question: "What can I do in Victoria Falls besides seeing the waterfall?",

        answer:
          "You can experience the Zambezi River through activities such as sunset cruises and fishing, take part in adventure experiences, explore the surrounding wildlife areas, enjoy scenic flights and discover local culture and dining.",
      },

      {
        question: "Can I combine Victoria Falls with Hwange National Park?",

        answer:
          "Yes. Victoria Falls and Hwange make a natural Zimbabwe combination, allowing travellers to pair the waterfall and Zambezi with a dedicated wildlife and safari experience.",
      },

      {
        question: "Can I visit Chobe National Park from Victoria Falls?",

        answer:
          "Yes. Chobe National Park in Botswana is commonly combined with Victoria Falls, particularly for travellers interested in adding a wildlife and river-safari experience to their trip.",
      },

      {
        question: "Can I see Victoria Falls from both Zimbabwe and Zambia?",

        answer:
          "Yes. The Victoria Falls World Heritage property is shared by Zimbabwe and Zambia, and the Falls can be viewed from both sides of the Zambezi.",
      },
    ],

    relatedContent: {
      activities: [
        "victoria-falls-tour",
        "zambezi-sunset-cruise",
        "white-water-rafting",
        "bungee-jumping",
        "victoria-falls-canopy-tour",
      ],

      packages: [
        "victoria-falls-essentials",
        "victoria-falls-hwange-chobe",
      ],

      destinations: [
        "hwange",
        "chobe",
        "livingstone",
      ],
    },

    travelAsambe: {
      title: "Plan your Victoria Falls experience",

      description:
        "Whether you are visiting for the Falls, the Zambezi, adventure or wildlife, Travel Asambe can help bring your accommodation, activities, transfers and wider itinerary together.",

      services: [
        "Accommodation",
        "Activities",
        "Airport transfers",
        "Local transfers",
        "Tours",
        "Multi-day itineraries",
      ],

      cta: "Plan My Trip",
    },

    seo: {
      title:
        "Victoria Falls Zimbabwe | Things to Do, Tours & Travel | Travel Asambe",

      description:
        "Explore Victoria Falls, Zimbabwe. Discover the Falls, Zambezi River, adventure activities, wildlife, accommodation and multi-day travel experiences with Travel Asambe.",

      keywords: [
        "Victoria Falls",
        "Victoria Falls Zimbabwe",
        "Victoria Falls tours",
        "Victoria Falls travel",
        "things to do in Victoria Falls",
        "Victoria Falls activities",
        "Victoria Falls accommodation",
        "Victoria Falls safari",
        "Zambezi River",
        "Victoria Falls holidays",
        "Victoria Falls itinerary",
        "Victoria Falls and Hwange",
        "Victoria Falls and Chobe",
      ],
    },

    /**
     * Existing fields used elsewhere in the site.
     */
    location: "Victoria Falls, Zimbabwe",

    image: "/images/destinations/victoria-falls-1.jpg",

    description:
      "Discover Victoria Falls, the Smoke that Thunders, from the Falls and Zambezi River to adventure, wildlife, accommodation and unforgettable Southern African experiences.",

    intro:
      "Experience Victoria Falls through the waterfall, the Zambezi, adventure, wildlife and carefully planned travel experiences.",

    bestFor: [
      "First-time visitors",
      "Couples",
      "Families",
      "Adventure travellers",
      "Safari travellers",
      "Luxury travellers",
    ],

    activities: [
      "victoria-falls-tour",
      "zambezi-sunset-cruise",
      "white-water-rafting",
      "bungee-jumping",
      "victoria-falls-canopy-tour",
    ],

    specials: [
      "victoria-falls-essentials",
      "victoria-falls-hwange-chobe",
    ],

    practicalInfo: {
      gettingThere:
        "Fly into Victoria Falls International Airport or travel by road from other destinations in Zimbabwe and neighbouring countries.",

      stay:
        "A 2–3 night stay works well for a first visit, while 4–5 nights allows more time for adventure, wildlife and river experiences.",

      season:
        "Victoria Falls changes throughout the year as Zambezi water levels and weather conditions vary. Higher water brings more spray, while lower water can provide clearer views of the Falls and gorge.",
    },
  },
];