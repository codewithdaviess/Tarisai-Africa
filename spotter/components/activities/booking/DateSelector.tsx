"use client";

type DateSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function DateSelector({
  value,
  onChange,
}: DateSelectorProps) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="mt-6">
      <label
        htmlFor="activity-date"
        className="text-sm font-medium text-neutral-900"
      >
        Date
      </label>

      <input
        id="activity-date"
        type="date"
        min={today}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 block w-full border border-neutral-300 bg-white px-3 py-3 text-sm text-neutral-900 outline-none transition focus:border-brand focus:ring-0"
      />

      <p className="mt-2 text-xs leading-5 text-neutral-500">
        Select the date you would like to experience this activity.
      </p>
    </div>
  );
}