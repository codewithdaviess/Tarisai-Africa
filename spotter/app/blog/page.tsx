import { PageHero } from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import { BlogCard } from "@/components/blog/BlogCard";
import { blogs } from "@/data/blogs";

export default function BlogPage() {
  return (
    <>
      <PageHero
        image="/images/blogs/blog-hero.webp"
        title="Blog."
        description="Read the latest news and updates from our team of travel experts."
      />

      <section className="py-16">
        <Container>
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-eyebrow font-medium uppercase tracking-[0.18em] text-brand">
              Travel Journal
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
              Stories worth reading.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog.slug} {...blog} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
