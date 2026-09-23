import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";

type ExperienceChecklistProps = {
  subheading: string;
  title: string;
  items: string[];
  marker: "included" | "notIncluded";
};

export default function ExperienceChecklist({
  subheading,
  title,
  items,
  marker,
}: ExperienceChecklistProps) {
  if (!items?.length) {
    return null;
  }

  return (
    <section className="mt-12">
       <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-brand/90">
        {subheading}
      </p>
      <ExperienceSectionHeading>{title}</ExperienceSectionHeading>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 text-sm leading-6 text-neutral-600"
          >
            <span
              className={
                marker === "included"
                  ? "mt-0.5 text-brand"
                  : "mt-0.5 text-neutral-400"
              }
              aria-hidden="true"
            >
              {marker === "included" ? "✓" : "×"}
            </span>

            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
