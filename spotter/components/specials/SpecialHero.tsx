type SpecialHeroProps = {
  name: string;
  image: string;
  category: string;
  duration: string;
  badge?: string;
};

export default function SpecialHero({
  name,
  image,
  category,
  duration,
  badge,
}: SpecialHeroProps) {
  return (
    <section className="relative h-[55vh] min-h-105 overflow-hidden">
      <img
        src={image}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-6 pb-12 lg:px-8">
        <div className="max-w-3xl text-white">
          {badge && (
            <span className="mb-4 inline-block rounded-xs bg-brand px-3 py-2 text-[11px] font-medium uppercase tracking-[0.15em]">
              {badge}
            </span>
          )}

          <p className="mb-3 text-sm uppercase tracking-[0.15em] text-white/80">
            {duration}
          </p>

          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            {name}
          </h1>
        </div>
      </div>
    </section>
  );
}
