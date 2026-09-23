import Link from "next/link";

import ResearchContactLink from "@/components/research/ResearchContactLink";
import CookieSettingsButton from "@/components/ui/CookieSettingsButton";

type SocialIconProps = {
  size?: number;
};

function FacebookIcon({ size = 17 }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M14 8.4V6.8c0-.7.5-.9.9-.9h2.2V2.1L14 2c-3.5 0-4.4 2.6-4.4 4.3v2.1H6.8v4.3h2.8V22H14v-9.3h3.1l.4-4.3H14Z" />
    </svg>
  );
}

function InstagramIcon({ size = 17 }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}

function LinkedinIcon({ size = 17 }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M6.7 8.8H3V21h3.7V8.8ZM4.9 7.1a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2ZM21 21h-3.7v-6.4c0-1.7-.7-2.6-2-2.6-1.4 0-2.2 1-2.2 2.6V21H9.4V8.8H13v1.6c.6-.9 1.8-1.9 3.7-1.9 2.6 0 4.3 1.7 4.3 5.3V21Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-5 py-10 text-center sm:px-8 lg:px-12">
        {/* Social Icons */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            aria-label="Facebook"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-earth text-white transition-colors duration-200 hover:bg-brand"
          >
            <FacebookIcon size={17} />
          </a>

          <a
            href="#"
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-earth text-white transition-colors duration-200 hover:bg-brand"
          >
            <InstagramIcon size={17} />
          </a>

          <a
            href="#"
            aria-label="LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-earth text-white transition-colors duration-200 hover:bg-brand"
          >
            <LinkedinIcon size={17} />
          </a>
        </div>

        {/* Footer Links */}
        <div className="mt-8">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs text-earth">
            <Link
              href="/legal#photo-credits"
              className="transition-colors duration-200 hover:text-brand"
            >
              Photo credits
            </Link>

            <span className="text-earth/30">|</span>

            <Link
              href="/privacy"
              className="transition-colors duration-200 hover:text-brand"
            >
              Privacy policy
            </Link>

            <span className="text-earth/30">|</span>

            <Link
              href="/legal#cookie-policy"
              className="transition-colors duration-200 hover:text-brand"
            >
              Cookie policy
            </Link>

            <span className="text-earth/30">|</span>

            <Link
              href="/legal#sitemap"
              className="transition-colors duration-200 hover:text-brand"
            >
              Sitemap
            </Link>

            <span className="text-earth/30">|</span>

            <CookieSettingsButton />
          </div>
        </div>

        {/* Company Information */}
        <div className="mt-8 text-xs leading-6 text-earth">
          <p className="font-semibold text-earth">
            Travel Asambe Africa
          </p>

          <p>Kazungula Street, Victoria Falls, Zimbabwe, 000263</p>

          <p>
            Telephone -{" "}
            <ResearchContactLink
              href="tel:+263777102275"
              eventName="phone_clicked"
              className="transition-colors duration-200 hover:text-brand"
            >
              +263 77 710 2275
            </ResearchContactLink>

            <span className="mx-1">|</span>

            Email -{" "}
            <ResearchContactLink
              href="mailto:hello@travelasambe.co.za"
              eventName="email_clicked"
              className="transition-colors duration-200 hover:text-brand"
            >
              hello@travelasambe.co.za
            </ResearchContactLink>
          </p>

          <p className="mt-2 text-earth">
            © Travel Asambe Africa {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}