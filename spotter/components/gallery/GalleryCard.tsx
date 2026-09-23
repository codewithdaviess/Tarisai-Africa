import Link from "next/link";

type GalleryCardProps = {
  slug: string;
  title: string;
  image: string;
};

export function GalleryCard({
  slug,
  title,
  image,
}: GalleryCardProps) {
  return (
    <article>
      <Link
        href={`/gallery/${slug}`}
        className="group relative block overflow-hidden rounded-xs"
      >
        {/* Image */}
        <img
          src={image}
          alt={title}
          className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/35" />

        {/* Title */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <h2 className="text-center text-xl font-semibold tracking-tight text-white">
            {title}
          </h2>
        </div>
      </Link>
    </article>
  );
}