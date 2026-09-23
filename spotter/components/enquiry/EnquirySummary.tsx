type EnquirySummaryProps = {
  activityName: string;
  location: string;
  date: string;
  adults: number;
  children: number;
  currency: string;
  total: number;
  pricePerPerson?: number;
};

export default function EnquirySummary({
  activityName,
  location,
  date,
  adults,
  children,
  currency,
  total,
  pricePerPerson,
}: EnquirySummaryProps) {
  const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  );

  return (
    <div className="border border-neutral-200 bg-neutral-50 p-6">
      <p className="text-eyebrow font-medium uppercase tracking-[0.12em] text-brand">
        Your experience
      </p>
      <h2 className="mt-2 text-section-title font-semibold tracking-tight text-neutral-900">
        {activityName}
      </h2>
      <p className="mt-1 text-sm text-neutral-500">{location}</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-400">Date</p>
          <p className="mt-1 text-sm font-medium text-neutral-900">{formattedDate}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-400">
            Participants
          </p>
          <p className="mt-1 text-sm font-medium text-neutral-900">
            {adults} {adults === 1 ? "Adult" : "Adults"}
            {children > 0 && (
              <>
                {" · "}
                {children} {children === 1 ? "Child" : "Children"}
              </>
            )}
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-neutral-200 pt-5">
        {pricePerPerson !== undefined && (
          <p className="mb-3 text-sm text-neutral-500">
            {currency} {pricePerPerson.toLocaleString()} per person
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-500">Estimated total</span>
          <span className="text-xl font-semibold text-neutral-900">
            {currency} {total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}