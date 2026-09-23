type ActivityHeroProps = {
  name: string;
  image: string;
  category: string;
  location: string;
  badge?: string | null;
};

export default function ActivityHero({
  name,
  image,
  location,
  badge,
}: ActivityHeroProps) {
  return (
    <section className="relative">
      {/* Hero Image */}
      <div className="h-[60vh] min-h-125 w-full">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="mx-auto max-w-6xl px-6 pb-12 lg:px-8">
          {badge && (
            <span className="mb-4 inline-block rounded-xs bg-brand px-3 py-2 text-xs font-medium tracking-[0.12em] text-white">
              {badge}
            </span>
          )}

          <p className="mb-2 text-sm font-medium uppercase tracking-[0.15em] text-white/80">
            {location}
          </p>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            {name}
          </h1>
        </div>
      </div>
    </section>
  );
}