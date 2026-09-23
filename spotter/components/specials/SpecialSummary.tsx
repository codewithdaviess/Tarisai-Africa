type SpecialSummaryProps = {
  duration: string;
  category: string;
  groupSize?: string;
  pickup?: string;
};

export default function SpecialSummary({
  duration,
  category,
  groupSize = "2–12 people",
  pickup = "Available",
}: SpecialSummaryProps) {
  return (
    <div className="grid grid-cols-2 overflow-hidden bg-neutral-200 sm:grid-cols-4">
      {/* Duration */}
      <div className="bg-white p-4">
        <p className="text-xs uppercase tracking-wide text-brand/90">
          Duration
        </p>

        <p className="mt-1 text-md font-medium text-neutral-900">
          {duration}
        </p>
      </div>

      {/* Journey */}
      <div className="bg-white p-4">
       <p className="text-xs uppercase tracking-wide text-brand/90">
          Journey
        </p>

        <p className="mt-1 text-md font-medium text-neutral-900">
          {category}
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

        <p className="mt-1 text-md font-medium text-neutral-900">
          {pickup}
        </p>
      </div>
    </div>
  );
}