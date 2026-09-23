import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { blogs } from "@/data/blogs";

type BlogSlugPageProps = {
	params: Promise<{
		slug: string;
	}>;
};

export function generateStaticParams() {
	return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({
	params,
}: BlogSlugPageProps): Promise<Metadata> {
	const { slug } = await params;
	const blog = blogs.find((item) => item.slug === slug);

	return {
		title: blog?.title ?? "Blog",
		description: blog?.excerpt,
	};
}

export default async function BlogSlugPage({ params }: BlogSlugPageProps) {
	const { slug } = await params;
	const blog = blogs.find((item) => item.slug === slug);

	if (!blog) {
		notFound();
	}

	return (
		<main className="bg-white">
			<PageHero image={blog.image} title={blog.title} description={blog.excerpt} />

			<article className="py-16">
				<Container>
					<div className="mx-auto max-w-3xl">
						<div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-neutral-200 pb-6 text-xs font-medium uppercase tracking-[0.15em] text-neutral-500">
							<span>{blog.category}</span>
							<span>{blog.readTime}</span>
							<span>{blog.date}</span>
						</div>

						<div className="mt-10 space-y-6 text-base leading-8 text-neutral-700">
							<p>
								Victoria Falls is one of Africa&apos;s most remarkable places to
								begin a journey. The waterfall itself is unforgettable, but the
								wider destination offers far more to discover during a first
								visit.
							</p>

							<h2 className="pt-5 text-3xl font-semibold tracking-tight text-neutral-900">
								Start with the falls
							</h2>

							<p>
								Give yourself enough time to experience the falls from several
								viewpoints. The spray, changing light and different walking
								paths make each viewpoint feel distinct, especially around
								sunrise or late afternoon.
							</p>

							<h2 className="pt-5 text-3xl font-semibold tracking-tight text-neutral-900">
								Make room for more than one experience
							</h2>

							<p>
								A first visit is best enjoyed at an unhurried pace. Combine a
								guided walk with a river experience, a wildlife outing or time
								to explore the town. Local knowledge helps you choose the right
								activities for the season, your interests and the time you have
								available.
							</p>

							<h2 className="pt-5 text-3xl font-semibold tracking-tight text-neutral-900">
								Plan with the season in mind
							</h2>

							<p>
								Water levels, weather and wildlife sightings change throughout
								the year. Before travelling, check what conditions to expect and
								plan a flexible itinerary. That small amount of preparation
								leaves more space to enjoy the destination when you arrive.
							</p>
						</div>

						<div className="mt-12 border-t border-neutral-200 pt-6 text-sm text-neutral-500">
							Written by {blog.author}
						</div>

						<Link
							href="/blog"
							className="mt-8 inline-flex text-sm font-medium text-brand transition-colors hover:text-brand-hover"
						>
							Back to the blog
						</Link>
					</div>
				</Container>
			</article>
		</main>
	);
}
