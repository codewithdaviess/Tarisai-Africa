import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "@/components/experiences/ExperienceSectionSubHeading";

type DestinationWhyVisitProps = {
  items: {
    title: string;
    description: string;
    image?: string;
  }[];
};

export default function DestinationWhyVisit({
  items,
}: DestinationWhyVisitProps) {
  return (
    <section className="mt-16 pt-10">
      <ExperienceSectionSubHeading>
        Discover
      </ExperienceSectionSubHeading>

      <ExperienceSectionHeading>
        Why visit this destination
      </ExperienceSectionHeading>

      <div className="mt-8 space-y-12">
        {items.map((item, index) => (
          <article key={item.title}>
            <h3 className="flex items-baseline gap-5 text-neutral-900">
              <span className="shrink-0 text-xl font-medium tracking-tight text-neutral-400">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="text-xl font-semibold tracking-tight">
                {item.title}
              </span>
            </h3>

            <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-600">
              {item.description}
            </p>

            {item.image && (
              <div className="mt-8 max-w-3xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-72 w-full rounded-sm object-cover"
                />
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}