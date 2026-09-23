type ActivitySummaryProps = {
  rating: number | null;
  reviewCount: number;
  duration: string;
  location: string;
  groupSize?: string;
  pickup?: string;
};

export default function ActivitySummary({
  duration,
  location,
  groupSize = "2–12 people",
  pickup = "Available",
}: ActivitySummaryProps) {
  return (
    <div className="pb-8">
      {/* Quick Details */}
      <div className="grid grid-cols-2 overflow-hidden bg-neutral-200 sm:grid-cols-4">

        {/* Duration */}
        <div
          className="bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-brand/90">
            Duration
          </p>

          <p className="mt-1 text-md font-medium text-neutral-900">
            {duration}
          </p>
        </div>

        {/* Location */}
        <div className="bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-brand/90">
            Location
          </p>

          <p className="mt-1 text-md font-medium text-neutral-900">
            {location}
          </p>
        </div>

        {/* Group Size */}
        <div className="bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-brand/90">
            Group size
          </p>

          <p className="mt-1 text-md font-medium text-neutral-900">
            {groupSize}
          </p>
        </div>

        {/* Pickup */}
        <div className="bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-brand/90">
            Pickup
          </p>

          <p className="mt-1 text-md font-medium text-neutral-900">{pickup}</p>
        </div>
      </div>
    </div>
  );
}
