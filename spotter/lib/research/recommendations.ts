import { accommodations } from "@/data/accommodations";
import { activities } from "@/data/activities";
import { specials } from "@/data/specials";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type RecommendationType = "accommodation" | "activity" | "special";

export type Recommendation = {
  type: RecommendationType;
  slug: string;
  name: string;
  image: string;
  href: string;
  reason: string;
};

type CatalogItem = {
  type: RecommendationType;
  slug: string;
  name: string;
  image: string;
  category: string;
  location: string;
  href: string;
};

type ResearchEvent = {
  session_id: string | null;
  event_name: string;
  entity_type: string | null;
  entity_slug: string | null;
};

const eventWeights: Record<string, number> = {
  accommodation_viewed: 1,
  activity_viewed: 1,
  special_viewed: 1,
  enquiry_started: 5,
  enquiry_submitted: 10,
};

function getCatalog(): CatalogItem[] {
  return [
    ...accommodations.map((item) => ({
      type: "accommodation" as const,
      slug: item.slug,
      name: item.name,
      image: item.image,
      category: item.category,
      location: item.location,
      href: `/accommodation/${item.slug}`,
    })),
    ...activities.map((item) => ({
      type: "activity" as const,
      slug: item.slug,
      name: item.name,
      image: item.image,
      category: item.category,
      location: item.location,
      href: `/activities/${item.slug}`,
    })),
    ...specials.map((item) => ({
      type: "special" as const,
      slug: item.slug,
      name: item.name,
      image: item.image,
      category: item.category,
      location: item.destinations.join(", "),
      href: `/specials/${item.slug}`,
    })),
  ];
}

function itemKey(type: string, slug: string) {
  return `${type}:${slug}`;
}

export async function getRecommendations(
  current: { type: RecommendationType; slug: string },
  limit = 3,
): Promise<Recommendation[]> {
  const catalog = getCatalog();
  const currentItem = catalog.find(
    (item) => item.type === current.type && item.slug === current.slug,
  );

  if (!currentItem) {
    return [];
  }

  const popularity = new Map<string, number>();
  const coViews = new Map<string, number>();
  let events: ResearchEvent[] = [];

  try {
    const supabase = createSupabaseServerClient();
    const result = await supabase
      .from("research_events")
      .select("session_id,event_name,entity_type,entity_slug")
      .in("event_name", Object.keys(eventWeights))
      .not("entity_slug", "is", null)
      .limit(5000);

    if (!result.error) {
      events = (result.data ?? []) as ResearchEvent[];
    }
  } catch {
    events = [];
  }

  const currentKey = itemKey(current.type, current.slug);
  const currentSessions = new Set(
    events
      .filter(
        (event) =>
          event.session_id &&
          itemKey(event.entity_type ?? "", event.entity_slug ?? "") ===
            currentKey,
      )
      .map((event) => event.session_id as string),
  );

  for (const event of events) {
    if (!event.entity_type || !event.entity_slug) {
      continue;
    }

    const key = itemKey(event.entity_type, event.entity_slug);
    const weight = eventWeights[event.event_name] ?? 0;

    if (weight > 0) {
      popularity.set(key, (popularity.get(key) ?? 0) + weight);
    }

    if (event.session_id && currentSessions.has(event.session_id) && key !== currentKey) {
      coViews.set(key, (coViews.get(key) ?? 0) + 1);
    }
  }

  return catalog
    .filter((item) => item.type === current.type && item.slug !== current.slug)
    .map((item) => {
      const key = itemKey(item.type, item.slug);
      const sameCategory = item.category === currentItem.category;
      const sameLocation = item.location === currentItem.location;
      const score =
        (popularity.get(key) ?? 0) +
        (coViews.get(key) ?? 0) * 4 +
        (sameCategory ? 2 : 0) +
        (sameLocation ? 2 : 0);

      return { item, score, coViewCount: coViews.get(key) ?? 0 };
    })
    .sort((left, right) => right.score - left.score || left.item.name.localeCompare(right.item.name))
    .slice(0, limit)
    .map(({ item, coViewCount }) => ({
      ...item,
      reason:
        coViewCount > 0
          ? "Often explored by travellers viewing this"
          : "Popular with travellers",
    }));
}
