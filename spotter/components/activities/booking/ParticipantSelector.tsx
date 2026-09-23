"use client";

type ParticipantSelectorProps = {
  adults: number;
  children: number;
  onAdultsChange: (value: number) => void;
  onChildrenChange: (value: number) => void;
};

export default function ParticipantSelector({
  adults,
  children,
  onAdultsChange,
  onChildrenChange,
}: ParticipantSelectorProps) {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-neutral-900">
        Participants
      </h3>

      <div className="mt-3 divide-y divide-neutral-200 border border-neutral-200">
        {/* Adults */}
        <div className="flex items-center justify-between p-4">
          <div>
            <p className="text-sm font-medium text-neutral-900">
              Adults
            </p>

            <p className="mt-1 text-xs text-neutral-500">
              Per adult
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                onAdultsChange(Math.max(1, adults - 1))
              }
              disabled={adults <= 1}
              className="flex h-8 w-8 items-center justify-center border border-neutral-300 text-neutral-700 transition hover:border-brand disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Remove adult"
            >
              −
            </button>

            <span className="w-5 text-center text-sm font-medium text-neutral-900">
              {adults}
            </span>

            <button
              type="button"
              onClick={() => onAdultsChange(adults + 1)}
              className="flex h-8 w-8 items-center justify-center border border-neutral-300 text-neutral-700 transition hover:border-brand"
              aria-label="Add adult"
            >
              +
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="flex items-center justify-between p-4">
          <div>
            <p className="text-sm font-medium text-neutral-900">
              Children
            </p>

            <p className="mt-1 text-xs text-neutral-500">
              Per child
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                onChildrenChange(Math.max(0, children - 1))
              }
              disabled={children <= 0}
              className="flex h-8 w-8 items-center justify-center border border-neutral-300 text-neutral-700 transition hover:border-brand disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Remove child"
            >
              −
            </button>

            <span className="w-5 text-center text-sm font-medium text-neutral-900">
              {children}
            </span>

            <button
              type="button"
              onClick={() =>
                onChildrenChange(children + 1)
              }
              className="flex h-8 w-8 items-center justify-center border border-neutral-300 text-neutral-700 transition hover:border-brand"
              aria-label="Add child"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}