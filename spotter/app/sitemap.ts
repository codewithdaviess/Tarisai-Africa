import type { MetadataRoute } from "next";

import { accommodations } from "@/data/accommodations";
import { activities } from "@/data/activities";
import { blogs } from "@/data/blogs";
import { destinations } from "@/data/destinations";
import { galleryCategories } from "@/data/gallery";
import { specials } from "@/data/specials";
import { transfers } from "@/data/transfers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://travelasambe.co.za";

const staticRoutes = [
  ["/", 1, "weekly"],
  ["/about", 0.7, "monthly"],
  ["/activities", 0.9, "weekly"],
  ["/accommodation", 0.9, "weekly"],
  ["/destinations", 0.9, "weekly"],
  ["/transfers", 0.8, "weekly"],
  ["/specials", 0.8, "weekly"],
  ["/gallery", 0.6, "monthly"],
  ["/blog", 0.7, "weekly"],
  ["/contact", 0.6, "monthly"],
  ["/enquire", 0.6, "monthly"],
  ["/privacy", 0.2, "yearly"],
  ["/legal", 0.2, "yearly"],
] as const;

function entry(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]): MetadataRoute.Sitemap[number] {
  return {
    url: new URL(path, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map(([path, priority, changeFrequency]) =>
      entry(path, priority, changeFrequency),
    ),
    ...activities.map((item) => entry(`/activities/${item.slug}`, 0.8, "monthly")),
    ...accommodations.map((item) => entry(`/accommodation/${item.slug}`, 0.8, "monthly")),
    ...destinations.map((item) => entry(`/destinations/${item.slug}`, 0.8, "monthly")),
    ...transfers.map((item) => entry(`/transfers/${item.slug}`, 0.7, "monthly")),
    ...specials.map((item) => entry(`/specials/${item.slug}`, 0.7, "monthly")),
    ...blogs.map((item) => entry(`/blog/${item.slug}`, 0.7, "monthly")),
    ...galleryCategories.map((item) => entry(`/gallery/${item.slug}`, 0.5, "yearly")),
  ];
}
