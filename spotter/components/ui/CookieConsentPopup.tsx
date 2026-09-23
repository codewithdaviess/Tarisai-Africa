"use client";

import { startTransition, useEffect, useState } from "react";
import { CookieToggle } from "@/components/ui/CookieToggle";

const COOKIE_PREFERENCES_KEY = "travel-asambe-cookie-preferences";

type CookiePreferences = {
  analytics: boolean;
  preferences: boolean;
  marketing: boolean;
};

const defaultPreferences: CookiePreferences = {
  analytics: false,
  preferences: false,
  marketing: false,
};

export default function CookieConsentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isManaging, setIsManaging] = useState(false);
  const [preferences, setPreferences] = useState(defaultPreferences);

  useEffect(() => {
    const savedPreferences = window.localStorage.getItem(COOKIE_PREFERENCES_KEY);

    if (savedPreferences) {
      try {
        const saved = { ...defaultPreferences, ...JSON.parse(savedPreferences) };
        startTransition(() => setPreferences(saved));
      } catch {
        window.localStorage.removeItem(COOKIE_PREFERENCES_KEY);
      }
    } else {
      startTransition(() => setIsOpen(true));
    }

    function openCookieSettings() {
      setIsOpen(true);
      setIsManaging(true);
    }

    window.addEventListener("open-cookie-settings", openCookieSettings);
    return () => window.removeEventListener("open-cookie-settings", openCookieSettings);
  }, []);

  useEffect(() => {
    if (!isOpen || !isManaging) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, isManaging]);

  function savePreferences(nextPreferences: CookiePreferences) {
    window.localStorage.setItem(
      COOKIE_PREFERENCES_KEY,
      JSON.stringify(nextPreferences),
    );
    setPreferences(nextPreferences);
    setIsOpen(false);
    setIsManaging(false);
  }

  if (!isOpen) {
    return null;
  }

  if (!isManaging) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
        className="fixed inset-x-0 bottom-0 z-100 border-t border-neutral-200 bg-white px-5 py-5 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] sm:px-8 sm:py-6"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-eyebrow font-medium uppercase tracking-[0.15em] text-brand">Your privacy</p>
            <h2 id="cookie-consent-title" className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900">
              We use cookies
            </h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Necessary cookies keep the site working. You can accept optional cookies or manage your choices.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => savePreferences(defaultPreferences)}
              className="border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
            >
              Reject optional
            </button>
            <button
              type="button"
              onClick={() => setIsManaging(true)}
              className="border border-neutral-900 px-5 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
            >
              Manage preferences
            </button>
            <button
              type="button"
              onClick={() =>
                savePreferences({ analytics: true, preferences: true, marketing: true })
              }
              className="bg-brand px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-neutral-950/60 px-4 py-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setIsOpen(false);
          setIsManaging(false);
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white p-6 shadow-xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-eyebrow font-medium uppercase tracking-[0.15em] text-brand">Your privacy</p>
            <h2 id="cookie-settings-title" className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">
              Choose your cookie settings
            </h2>
          </div>
          <button type="button" onClick={() => { setIsOpen(false); setIsManaging(false); }} aria-label="Close cookie settings" className="text-2xl leading-none text-neutral-500 transition-colors hover:text-neutral-900">
            ×
          </button>
        </div>

        <p className="mt-4 text-sm leading-7 text-neutral-600">
          Necessary cookies keep Travel Asambe Africa working. Optional cookies
          can be enabled or disabled below.
        </p>

        <div className="mt-6 divide-y divide-neutral-200 border-y border-neutral-200">
          <CookieChoice title="Necessary cookies" description="Required for core site functions, security, enquiry forms and your cookie choices." enabled disabled onChange={() => undefined} />
          <CookieChoice title="Analytics cookies" description="Help us understand which pages and experiences are useful to visitors." enabled={preferences.analytics} onChange={(enabled) => setPreferences((current) => ({ ...current, analytics: enabled }))} />
          <CookieChoice title="Preference cookies" description="Remember choices such as your cookie settings and display preferences." enabled={preferences.preferences} onChange={(enabled) => setPreferences((current) => ({ ...current, preferences: enabled }))} />
          <CookieChoice title="Marketing cookies" description="Help measure campaigns and make future travel information more relevant." enabled={preferences.marketing} onChange={(enabled) => setPreferences((current) => ({ ...current, marketing: enabled }))} />
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={() => savePreferences(defaultPreferences)} className="border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100">Reject optional</button>
          <button type="button" onClick={() => savePreferences(preferences)} className="bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand">Save choices</button>
          <button type="button" onClick={() => savePreferences({ analytics: true, preferences: true, marketing: true })} className="bg-brand px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-hover">Accept all</button>
        </div>
      </div>
    </div>
  );
}

function CookieChoice({
  title,
  description,
  enabled,
  disabled = false,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  disabled?: boolean;
  onChange: (enabled: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 py-5">
      <div className="min-w-0">
        <h3 className="text-base font-medium text-neutral-900">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-neutral-500">{description}</p>
      </div>
      <CookieToggle enabled={enabled} onChange={onChange} label={`Toggle ${title}`} disabled={disabled} />
    </div>
  );
}