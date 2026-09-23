import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-start justify-center px-5 py-20 sm:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/50">
        404
      </p>
      <h1 className="mt-4 text-4xl font-semibold leading-tight text-black sm:text-5xl">
        We could not find that spot.
      </h1>
      <p className="mt-5 max-w-xl text-base leading-7 text-black/65 sm:text-lg">
        The page may have moved, the link may be out of date, or the address may
        have a typo.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/80"
      >
        Back to home
      </Link>
    </section>
  );
}
