import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import { GalleryCard } from "@/components/gallery/GalleryCard";
import { galleryCategories } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Victoria Falls Travel Gallery",
  description:
    "See the destinations, activities, wildlife and dining experiences behind Travel Asambe Africa journeys.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        image="/images/placeholder.jpg"
        title="Gallery."
        description="Explore the places, experiences, wildlife and flavours that make every journey unforgettable."
      />

      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-7xl px-2">
            <div className="mb-12 lg:max-w-2xl">
              <p className="mb-3 text-eyebrow font-medium tracking-[0.18em] text-brand">
                The Gallery
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                Moments worth remembering.
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {galleryCategories.map((category) => (
                <GalleryCard key={category.slug} {...category} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
