import type { Metadata } from "next";
import { Cormorant_Garamond, Quicksand } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TripProvider } from "@/components/trip/TripProvider";
import TripFloatingButton from "@/components/trip/TripFloatingButton";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tarisai.co.zw";
const siteTitle = "Tarisai Africa Travel | Victoria Falls Tours & Experiences";
const siteDescription =
  "Book unforgettable Victoria Falls tours, Zimbabwe adventures, accommodation and tailored travel experiences with Tarisai Africa Travel.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Tarisai Africa Travel",

  title: {
    default: siteTitle,
    template: "%s | Tarisai Africa Travel",
  },

  description: siteDescription,

  alternates: {
    canonical: "/",
  },

  keywords: [
    "Tarisai Africa Travel",
    "Victoria Falls tours",
    "Victoria Falls activities",
    "Victoria Falls travel agency",
    "Zimbabwe tours",
    "Zimbabwe travel experiences",
    "Victoria Falls accommodation",
    "Tailor-made Africa travel",
  ],

  authors: [{ name: "Tarisai Africa Travel" }],
  creator: "Tarisai Africa Travel",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    siteName: "Tarisai Africa Travel",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/images/destinations/victoria-falls-1.webp",
        width: 1200,
        height: 630,
        alt: "Victoria Falls and travel experiences in Zimbabwe",
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

          <Footer />
        </TripProvider>
      </body>
    </html>
  );
}