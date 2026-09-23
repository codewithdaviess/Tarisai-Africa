import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "@/components/experiences/ExperienceSectionSubHeading";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import { galleryCategories } from "@/data/gallery";

type GalleryCategory = {
  slug: string;
  title: string;
  image: string;
  description?: string;
  longDescription?: string;
  images?: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
};

type GallerySlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function GallerySlugPage({
  params,
}: GallerySlugPageProps) {
  const { slug } = await params;

  const category = galleryCategories.find(
    (item) => item.slug === slug,
  ) as GalleryCategory | undefined;

  if (!category) {
    notFound();
  }

  const introCopy =
    category.longDescription ??
    category.description ??
    `A curated collection of ${category.title.toLowerCase()} moments from across the region.`;

  const images =
    category.images && category.images.length > 0
      ? category.images
      : [
          {
            src: category.image,
            alt: `${category.title} gallery image`,
            caption: "Captured moments from this collection.",
          },
          {
            src: category.image,
            alt: `${category.title} gallery detail`,
            caption: "A closer look at the atmosphere and character.",
          },
          {
            src: category.image,
            alt: `${category.title} gallery scene`,
            caption: "The textures, colour and feeling behind each experience.",
          },
        ];

  const relatedLink =
    category.slug === "activities"
      ? "/activities"
      : category.slug === "destinations"
        ? "/destinations"
        : category.slug === "dining"
          ? "/specials"
          : "/gallery";

  return (
    <main className="bg-white">
      <PageHero
        image={category.image}
        title={category.title}
        description={category.description ?? introCopy}
      />

      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-7xl px-2">
            <ExperienceSectionSubHeading>Explore</ExperienceSectionSubHeading>

            <ExperienceSectionHeading>
              {category.title} through the lens.
            </ExperienceSectionHeading>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-neutral-600">
              {introCopy}
            </p>

            <GalleryLightbox images={images} />
          </div>
        </Container>
      </section>

    </main>
  );
}
