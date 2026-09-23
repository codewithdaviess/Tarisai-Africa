import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Cormorant_Garamond, Quicksand } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TripProvider } from "@/components/trip/TripProvider";
import TripFloatingButton from "@/components/trip/TripFloatingButton";
import CookieConsentPopup from "@/components/ui/CookieConsentPopup";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://travelasambe.co.za";
const siteTitle = "Travel Asambe Africa | Victoria Falls Tours & Experiences";
const siteDescription =
  "Discover unforgettable tours, activities and experiences in Victoria Falls with Travel Asambe Africa.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Travel Asambe Africa",

  title: {
    default: siteTitle,
    template: "%s | Travel Asambe Africa",
  },

  description: siteDescription,

  alternates: {
    canonical: "/",
  },

  keywords: [
    "Travel Asambe Africa",
    "Victoria Falls tours",
    "Victoria Falls activities",
    "Victoria Falls experiences",
    "things to do in Victoria Falls",
    "Zimbabwe tours",
    "Victoria Falls travel",
  ],

  authors: [{ name: "Travel Asambe Africa" }],
  creator: "Travel Asambe Africa",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    siteName: "Travel Asambe Africa",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/images/destinations/victoria-falls-1.webp",
        width: 1200,
        height: 630,
        alt: "Victoria Falls in Zimbabwe",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/destinations/victoria-falls-1.webp"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${cormorantGaramond.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <TripProvider>
          <Header />

          <main className="flex-1">
            {children}
          </main>

          <TripFloatingButton />

          <CookieConsentPopup />

          <Footer />
        </TripProvider>

        <Analytics />
      </body>
    </html>
  );
}