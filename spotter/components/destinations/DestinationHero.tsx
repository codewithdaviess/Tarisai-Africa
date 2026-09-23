import Image from "next/image";

type DestinationHeroProps = {
  name: string;
  image: string;
  location: string;
  description: string;
  badge?: string | null;
};

export default function DestinationHero({
  name,
  image,
  location,
  badge,
}: DestinationHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="h-[60vh] min-h-125 w-full">
        <Image
          src={image}
          alt={name}
          fill
          priority
          sizes="100vw"
          className="h-full w-full object-cover "
        />
      </div>

      <div className="absolute inset-0 bg-black/30" />

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
