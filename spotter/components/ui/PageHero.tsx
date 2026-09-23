"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type PageHeroProps = {
  image: string;
  title: string;
  description: string;
};

export function PageHero({
  image,
  title,
  description,
}: PageHeroProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative min-h-[75svh] overflow-hidden bg-black text-white">
      {/* Background Image */}
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="scale-110 object-cover"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
        aria-hidden="true"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-[75svh] items-center justify-center px-6 py-20 text-center sm:px-8 lg:px-12">
        <div className="w-full max-w-3xl">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            {title}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/90">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}