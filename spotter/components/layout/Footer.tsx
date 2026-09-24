import Link from "next/link";

import ResearchContactLink from "@/components/research/ResearchContactLink";
import CookieSettingsButton from "@/components/ui/CookieSettingsButton";

type SocialIconProps = {
  size?: number;
};

const FACEBOOK_URL =
  "https://www.facebook.com/people/Travel-Asambe/61585513573139/?mibextid=wwXIfr&rdid=x6AE4Ry9ekhOrHdf&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1KjSjaK5Tm%2F%3Fmibextid%3DwwXIfr";
const INSTAGRAM_URL = "https://www.instagram.com/";
const YOUTUBE_URL = "https://www.youtube.com/channel/UCB1Z0uR-3NR4GFKnlppVpvg";

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

function YouTubeIcon({ size = 17 }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M23.5 6.8a3.1 3.1 0 0 0-2.2-2.2C19.5 4.1 12 4.1 12 4.1s-7.5 0-9.3.5A3.1 3.1 0 0 0 .5 6.8C0 8.6 0 12 0 12s0 3.4.5 5.2a3.1 3.1 0 0 0 2.2 2.2c1.8.5 9.3.5 9.3.5s7.5 0 9.3-.5a3.1 3.1 0 0 0 2.2-2.2c.5-1.8.5-5.2.5-5.2s0-3.4-.5-5.2ZM9.8 15.5V8.5l6.3 3.5-6.3 3.5Z" />
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
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-earth text-white transition-colors duration-200 hover:bg-brand"
          >
            <FacebookIcon size={17} />
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-earth text-white transition-colors duration-200 hover:bg-brand"
          >
            <InstagramIcon size={17} />
          </a>

          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-earth text-white transition-colors duration-200 hover:bg-brand"
          >
            <YouTubeIcon size={17} />
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