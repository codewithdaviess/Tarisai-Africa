"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-start justify-center px-5 py-20 sm:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/50">
        Something went wrong
      </p>
      <h1 className="mt-4 text-4xl font-semibold leading-tight text-black sm:text-5xl">
        This page hit a snag.
      </h1>
      <p className="mt-5 max-w-xl text-base leading-7 text-black/65 sm:text-lg">
        Please try again. If the problem keeps happening, come back in a little
        while.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/80"
      >
        Try again
      </button>
    </section>
  );
}
