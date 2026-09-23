import Link from "next/link";

import type { DestinationThingToDo } from "@/data/destinations";

import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "@/components/experiences/ExperienceSectionSubHeading";

type DestinationThingsToDoProps = {
  items: DestinationThingToDo[];
};

export default function DestinationThingsToDo({
  items,
}: DestinationThingsToDoProps) {
  if (!items?.length) {
    return null;
  }

  return (
    <section className="mt-16 pt-10">
      <ExperienceSectionSubHeading>
        Experiences
      </ExperienceSectionSubHeading>

      <ExperienceSectionHeading>
        Things to do
      </ExperienceSectionHeading>

      <div className="mt-8 space-y-5">
        {items.map((item) => (
          <article key={item.slug}>
            <Link
              href={`/activities/${item.slug}`}
              className="text-sm font-medium text-neutral-600 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900"
            >
              {item.name}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}