"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { CookieToggle } from "@/components/ui/CookieToggle";

export default function LegalPage() {
  const [necessaryEnabled, setNecessaryEnabled] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [preferencesEnabled, setPreferencesEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  const [showOptionalCookies, setShowOptionalCookies] = useState(false);

  useEffect(() => {
    document.title = "Legal | Travel Asambe Africa";

    const description =
      "Travel Asambe Africa's privacy policy, cookie policy, photo credits, sitemap and cookie settings.";

    let meta = document.querySelector(
      'meta[name="description"]',
    ) as HTMLMetaElement | null;

    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.content = description;
  }, []);

  return (
    <main className="bg-white text-black">
      {/* Hero */}
      <PageHero
        image="/images/activities/activities-hero.jpg"
        title="Legal & Information"
        description="Information about how we use this website, protect your information, use cookies, and credit the visual content used across our digital experience."
      />

      {/* Legal content */}
      <section className="mx-auto w-full max-w-4xl px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        <div className="min-w-0">
          {/* Photo Credits */}
          <section id="photo-credits" className="pb-10 sm:pb-12 lg:pb-14">
            <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
              Photo Credits
            </h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-black/65 sm:text-base">
              <p>
                Travel Asambe Africa uses photographs and visual media to show
                destinations, activities, accommodation, transfers, specials and
                other travel experiences available through this website.
              </p>

              <p>
                Where an image requires attribution, the relevant creator,
                photographer, agency or source is credited here or alongside the
                relevant gallery, destination or experience content where
                appropriate.
              </p>

              <p>
                If you believe that an image has been used incorrectly or
                without appropriate attribution, please contact us so that we
                can investigate and address the matter.
              </p>
            </div>
          </section>

          {/* Privacy Policy */}
          <section id="privacy-policy" className="py-10 sm:py-12 lg:py-14">
            <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
              Privacy Policy
            </h2>

            <div className="mt-6 space-y-6 text-sm leading-7 text-black/65 sm:text-base">
              <LegalSubsection title="Information we collect">
                <p>
                  When you use our website, contact us, submit an enquiry, write
                  a review or create a trip enquiry, we may collect information
                  that you voluntarily provide. This can include your name, email
                  address, telephone number, country, travel dates, group size,
                  selected activities, accommodation, transfers, special trips
                  and the message or preferences you share with us.
                </p>
              </LegalSubsection>

              <LegalSubsection title="How we use information">
                <p>
                  We use this information to respond to enquiries and reviews,
                  check availability, arrange requested travel services,
                  communicate with you, provide enquiry confirmations, maintain
                  trip details, improve the website and provide the services you
                  request.
                </p>
              </LegalSubsection>

              <LegalSubsection title="Information sharing">
                <p>
                  We do not sell personal information. Information may be shared
                  with relevant accommodation, activity, transfer or other travel
                  service providers where necessary to fulfil a booking, enquiry
                  or service that you have requested. Our website may also use
                  Supabase for enquiry data storage and Resend for transactional
                  email delivery.
                </p>
              </LegalSubsection>

              <LegalSubsection title="Data security">
                <p>
                  We take reasonable measures to protect information submitted
                  through our website, including validation, rate limiting and
                  restricted server-side handling of enquiry data. However, no
                  internet transmission or storage system can be guaranteed to be
                  completely secure.
                </p>
              </LegalSubsection>

              <LegalSubsection title="Your choices">
                <p>
                  You may contact us if you have questions about personal
                  information that we hold about you or if you would like to
                  request that we update, correct or remove information, subject
                  to any legal or operational requirements that apply.
                </p>
              </LegalSubsection>
            </div>
          </section>

          {/* Cookie Policy */}
          <section id="cookie-policy" className="py-10 sm:py-12 lg:py-14">
            <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
              Cookie Policy
            </h2>

            <div className="mt-6 space-y-6 text-sm leading-7 text-black/65 sm:text-base">
              <LegalSubsection title="What are cookies?">
                <p>
                  Cookies are small files stored on your device by websites.
                  They can help websites remember preferences, understand how
                  visitors use a website and provide certain functionality.
                </p>
              </LegalSubsection>

              <LegalSubsection title="How we use cookies">
                <p>
                  Travel Asambe Africa uses necessary cookies or local storage
                  for core website functionality, security, enquiry workflows and
                  remembering your cookie choices. Optional analytics, preference
                  and marketing categories are disabled unless you choose to
                  enable them.
                </p>
              </LegalSubsection>

              <LegalSubsection title="Managing cookies">
                <p>
                  You can control or remove cookies through your browser
                  settings. Some website functionality may be affected if
                  certain cookies are disabled.
                </p>
              </LegalSubsection>

              <LegalSubsection title="Cookie preferences">
                <p>
                  You can review or change your preferences through the cookie
                  settings popup or the Cookie Settings section below. Necessary
                  cookies cannot be disabled because the website cannot provide
                  core functionality without them.
                </p>

                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
                  className="mt-4 inline-flex items-center font-medium text-black underline underline-offset-4 transition hover:text-black/55"
                >
                  Manage cookie settings
                </button>
              </LegalSubsection>
            </div>
          </section>

          {/* Sitemap */}
          <section id="sitemap" className="py-10 sm:py-12 lg:py-14">
            <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
              Sitemap
            </h2>

            <div className="mt-7 grid gap-x-16 gap-y-3 sm:grid-cols-2 sm:gap-y-4">
              <SitemapLink href="/" label="Home" />
              <SitemapLink href="/activities" label="Activities" />
              <SitemapLink href="/destinations" label="Destinations" />
              <SitemapLink href="/accommodation" label="Accommodation" />
              <SitemapLink href="/transfers" label="Transfers" />
              <SitemapLink href="/specials" label="Specials" />
              <SitemapLink href="/gallery" label="Gallery" />
              <SitemapLink href="/blog" label="Blog" />
              <SitemapLink href="/about" label="About Us" />
              <SitemapLink href="/contact" label="Contact" />
              <SitemapLink href="/enquire" label="Trip Enquiry" />
              <SitemapLink href="/privacy" label="Privacy Policy" />
              <SitemapLink href="/legal" label="Legal & Information" />
            </div>
          </section>

          {/* Cookie Settings */}
          <section id="cookie-settings" className="pt-10 sm:pt-12 lg:pt-14">
            <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
              Cookie Settings
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-7 text-black/65 sm:text-base">
              <p className="max-w-2xl">
                Manage your cookie preferences for this website. Necessary
                cookies support essential functionality, while optional cookies
                can be enabled or disabled based on your preferences.
              </p>

              {/* Necessary Cookies */}
              <CookieSettingCard
                title="Necessary cookies"
                description="Required for essential website functionality."
                enabled={necessaryEnabled}
                onChange={setNecessaryEnabled}
              />

              {/* Optional Cookies */}
              <div className="overflow-hidden rounded-xs border border-black/10 bg-white">
                {/* Dropdown Header */}
                <button
                  type="button"
                  onClick={() => setShowOptionalCookies((current) => !current)}
                  aria-expanded={showOptionalCookies}
                  className="flex w-full items-center justify-between gap-5 p-5 text-left transition hover:bg-black/1.5 sm:p-6"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-base font-medium text-black sm:text-lg">
                        Optional cookies
                      </h3>
                    </div>

                    <p className="mt-1.5 max-w-2xl text-sm leading-6 text-black/50">
                      Analytics, preference and marketing cookies can be managed
                      individually.
                    </p>
                  </div>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-black/50 transition-all duration-200 ${
                      showOptionalCookies
                        ? "rotate-180 bg-black text-white"
                        : "bg-white"
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                {/* Dropdown Content */}
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    showOptionalCookies ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="border-t border-black/[0.07]">
                      <ModalCookieOption
                        title="Analytics cookies"
                        description="Help us understand how visitors use the website."
                        enabled={analyticsEnabled}
                        onChange={setAnalyticsEnabled}
                      />

                      <ModalCookieOption
                        title="Preference cookies"
                        description="Remember preferences and improve your experience."
                        enabled={preferencesEnabled}
                        onChange={setPreferencesEnabled}
                      />

                      <ModalCookieOption
                        title="Marketing cookies"
                        description="Support marketing measurement and relevant advertising."
                        enabled={marketingEnabled}
                        onChange={setMarketingEnabled}
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

/* --------------------------------
   Cookie Setting Card
-------------------------------- */

function CookieSettingCard({
  title,
  description,
  enabled,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="rounded-xs border border-black/10 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between gap-5">
        <div className="min-w-0">
          <h3 className="text-base font-medium text-black sm:text-lg">
            {title}
          </h3>

          <p className="mt-1.5 text-sm leading-6 text-black/50">
            {description}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span
            className={`text-[10px] font-medium uppercase tracking-[0.15em] ${
              enabled ? "text-black/45" : "text-black/30"
            }`}
          >
            {enabled ? "On" : "Off"}
          </span>

          <CookieToggle
            enabled={enabled}
            onChange={onChange}
            label={`Toggle ${title}`}
          />
        </div>
      </div>
    </div>
  );
}

/* --------------------------------
   Optional Cookie Option
-------------------------------- */

function ModalCookieOption({
  title,
  description,
  enabled,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 px-5 py-5 sm:px-6">
      <div className="min-w-0 pr-2">
        <div className="flex items-center gap-2">
          <h3 className="text-md font-medium text-black">{title}</h3>
        </div>

        <p className="mt-1 text-sm leading-5 text-black/45">{description}</p>
      </div>

      <CookieToggle
        enabled={enabled}
        onChange={onChange}
        label={`Toggle ${title}`}
      />
    </div>
  );
}

/* --------------------------------
   Legal Subsection
-------------------------------- */

function LegalSubsection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="text-lg font-medium text-black">{title}</h3>

      <div className="mt-2">{children}</div>
    </div>
  );
}

/* --------------------------------
   Sitemap Link
-------------------------------- */
function SitemapLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between border-b border-black/10 py-4 px-2 text-sm transition rounded-xs hover:bg-black/2.5 hover:border-black/30"
    >
      <span>{label}</span>
    </Link>
  );
}
