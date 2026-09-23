type DestinationCTAProps = {
  title: string;
  description: string;
  services: string[];
  cta: string;
};

export default function DestinationCTA({
  title,
  description,
  services,
  cta,
}: DestinationCTAProps) {
  return (
    <section className="bg-brand py-20 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8">
          <div>
            <p className="text-eyebrow font-medium uppercase tracking-[0.18em] text-white/75">Start planning</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/85">{description}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/90">
              {services.map((service) => <li key={service}>{service}</li>)}
            </ul>
          </div>
          <a href="/contact" className="inline-flex w-fit bg-white px-6 py-4 text-sm font-medium text-neutral-900 transition hover:bg-neutral-900 hover:text-white">
            {cta}
          </a>
      </div>
    </section>
  );
}