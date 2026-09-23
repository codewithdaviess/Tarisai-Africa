type DestinationMapProps = {
  name: string;
  country: string;
};

export default function DestinationMap({
  name,
  country,
}: DestinationMapProps) {
  const query = encodeURIComponent(`${name}, ${country}`);

  return (
    <div>
      <p className="text-eyebrow font-medium uppercase tracking-[0.15em] text-brand">
        Location
      </p>
      <h2 className="mt-3 text-section-title font-semibold tracking-tight text-neutral-900">
        Find your way to {name}.
      </h2>
      <div className="mt-6 aspect-video overflow-hidden bg-neutral-100">
        <iframe
          title={`${name} map`}
          src={`https://www.google.com/maps?q=${query}&output=embed`}
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
