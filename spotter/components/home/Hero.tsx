"use client";

import { useEffect, useState } from "react";

const heroVideo = "/videos/herovid.webm";

export default function Hero() {
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
    <section className="relative min-h-svh overflow-hidden bg-black text-white">
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          transform: `translateY(${scrollY * 0.35}px)`,
        }}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/webm" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-svh items-center justify-center px-6 py-24 text-center sm:px-8 lg:px-12">
        <div className="w-full max-w-3xl">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            See Zimbabwe Differently.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/90">
            Discover Victoria Falls, wild landscapes and experiences shaped by
            local knowledge.
          </p>

          <a
            href="/activities"
            className="mt-8 inline-flex items-center rounded-xs bg-transparent px-7 py-3 text-sm font-medium text-white border border-white  transition-all duration-300 hover:bg-white/90 hover:text-black"
          >
            Explore Experiences
          </a>
        </div>
      </div>
    </section>
  );
}
