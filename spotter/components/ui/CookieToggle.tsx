"use client";

type CookieToggleProps = {
  enabled: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
};

export function CookieToggle({
  enabled,
  onChange,
  label = "Toggle cookie setting",
  disabled = false,
}: CookieToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!enabled)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 focus:outline-none focus:ring-4 ${
        enabled
          ? "focus:ring-earth/15"
          : "bg-black/15 focus:ring-black/10"
      }`}
      style={enabled ? { backgroundColor: "var(--color-earth)" } : undefined}
    >
      <span
        className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow-sm transition-all duration-200 ${
          enabled ? "right-1" : "left-1"
        }`}
      />
    </button>
  );
}