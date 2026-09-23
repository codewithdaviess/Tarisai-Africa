import Link from "next/link";
type BlogCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  author: string;
  date: string;
};

export function BlogCard({
  slug,
  title,
  excerpt,
  category,
  readTime,
  image,
  author,
  date,
}: BlogCardProps) {
  return (
    <article className="min-w-0">
      <Link href={`/blog/${slug}`} className="group block">
        {/* Image */}
        <div className="relative overflow-hidden rounded-xs">
          <img
            src={image}
            alt={title}
            className="aspect-16/10 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Category */}
          <span className="absolute left-4 top-4 rounded-xs bg-brand px-3 py-2 text-[11px] font-medium tracking-[0.12em] text-white">
            {category}
          </span>
        </div>

        {/* Card Content */}
        <div className="border border-gray-100 px-6 pb-5">
          {/* Read Time */}
          <div className="mt-5 text-[11px] font-medium tracking-[0.12em] text-neutral-500">
            {readTime}
          </div>

          {/* Title */}
          <h2 className="mt-2.5 line-clamp-2 text-2xl font-semibold leading-[1.2] tracking-tight text-neutral-900">
            {title}
          </h2>

          {/* Excerpt */}
          <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-neutral-600">
            {excerpt}
          </p>

          {/* Read More */}
          <div className="mt-6">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-900">
              <span>Read more</span>

              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-300 transition-all duration-200 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                <svg
                  aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </span>
          </div>

          {/* Author + Date */}
          <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-4">
            <span className="text-xs font-medium text-neutral-900">
              {author}
            </span>

            <span className="text-xs text-neutral-500">
              {date}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}