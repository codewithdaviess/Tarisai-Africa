import Link from "next/link";
import {
  BedDouble,
  CarFront,
  Compass,
  MapPinned,
} from "lucide-react";

import { PageHero } from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";

const services = [
  {
    title: "Experiences",
    href: "/activities",
    icon: Compass,
    description:
      "Discover activities and things to do, from Victoria Falls adventures and river experiences to wildlife and cultural encounters.",
  },
  {
    title: "Accommodation",
    href: "/accommodation",
    icon: BedDouble,
    description:
      "Explore carefully selected places to stay across different travel styles and budgets, from luxury hotels and lodges to comfortable mid-range options.",
  },
  {
    title: "Transfers",
    href: "/transfers",
    icon: CarFront,
    description:
      "Get where you need to go with arranged airport, hotel, activity and inter-destination transfers.",
  },
  {
    title: "Trips & Specials",
    href: "/specials",
    icon: MapPinned,
    description:
      "For travelers who want more than a single activity, our multi-day journeys bring destinations, accommodation, activities and transfers together into one trip.",
  },
];

const planningSteps = [
  ["See what is available.", "Explore destinations, activities, accommodation and trips."],
  [
    "Understand what you are getting.",
    "We provide the important details before you enquire, including what is included, what is not included, duration, locations, pricing where available and important travel information.",
  ],
  ["Tell us what you need.", "Share your dates, group size and what you are interested in."],
  [
    "We put the pieces together.",
    "We check availability and help arrange the relevant experiences, accommodation and transfers.",
  ],
  ["You decide.", "We provide the information and options you need to make your travel arrangements with confidence."],
];

const journeySteps = [
  ["01", "Discover", "Explore destinations, activities, accommodation and special trips."],
  ["02", "Enquire", "Tell us your dates, number of travelers and what you would like to experience."],
  ["03", "We arrange", "We check availability and coordinate the relevant activities, accommodation and transfers."],
  ["04", "Confirm", "You receive the details, pricing and arrangements needed to confirm your trip."],
  ["05", "Travel", "Arrive, explore and enjoy your journey while the important details are taken care of."],
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      <PageHero
        image="/images/about/about-hero.webp"
        title="About Travel Asambe"
        description="Travel planning should be easier, clearer and more connected."
      />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-left">
            <p className="text-eyebrow font-medium uppercase tracking-[0.18em] text-brand">
              Travel should feel simple.
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
              A clearer way to plan your journey.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-muted">
              <p>
                Travel Asambe was launched three years ago with a simple goal
                <strong className="font-semibold text-ink">
                  {" "}to make travel planning easier, clearer and more seamless.
                </strong>
              </p>
              <p>
                We help travelers discover places, choose experiences, arrange
                accommodation and get from one place to another without having
                to figure out every detail on their own.
              </p>
              <p>
                From your arrival at the airport to your activities,
                accommodation and transfers, we help bring the different parts
                of your journey together.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-left">
            <div>
              <p className="text-eyebrow font-medium uppercase tracking-[0.18em] text-brand">
                Simple planning. Clear information.
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                Know what fits before you enquire.
              </h2>
            </div>

            <div className="mt-10 space-y-7">
              <p className="text-base leading-8 text-muted">
                We believe planning a trip should not mean searching through
                dozens of websites trying to work out what fits together.
                That&apos;s why we aim to keep things straightforward.
              </p>
              {planningSteps.map(([title, description]) => (
                <div key={title} className="pt-5">
                  <h3 className="text-lg font-semibold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-earth py-20 text-white sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-left">
            <div>
              <p className="text-eyebrow font-medium uppercase tracking-[0.18em] text-white/70">
                Transparency matters
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                Clear choices, fewer surprises.
              </h2>
            </div>
            <div className="mt-10 space-y-5 text-base leading-8 text-white/80">
              <p>
                We want travelers to know what they are enquiring about before
                they contact us.
              </p>
              <p>
                Where pricing is available, we aim to show it clearly. Where a
                price depends on dates, availability, room type, group size or
                the specific arrangements required, we&apos;ll explain that rather
                than presenting a misleading fixed price.
              </p>
              <p>
                We also make it clear what is included and what isn&apos;t, so there
                are fewer surprises when planning your trip.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-left">
            <p className="text-eyebrow font-medium uppercase tracking-[0.18em] text-brand">
              How it works
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
              From discovery to departure.
            </h2>
          </div>

          <div className="mx-auto mt-12 max-w-3xl space-y-8 text-left">
            {journeySteps.map(([number, title, description]) => (
              <article key={number} className="border-t border-neutral-300 pt-5">
                <p className="text-eyebrow font-medium tracking-[0.18em] text-brand">{number}</p>
                <h3 className="mt-4 text-xl font-semibold text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
