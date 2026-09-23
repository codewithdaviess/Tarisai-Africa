"use client";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
      className="text-earth transition-colors duration-200 hover:text-brand"
    >
      Update cookie policies
    </button>
  );
}