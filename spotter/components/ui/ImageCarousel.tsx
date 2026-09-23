"use client";

import { useState } from "react";
import Image from "next/image";

type ImageCarouselProps = {
  images: {
    src: string;
    alt: string;
  }[];
};

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      {/* Image */}
      <div className="relative h-100 overflow-hidden rounded-xs md:h-130">
        <Image
          src={images[current].src}
          alt={images[current].alt}
          fill
          priority
          className="object-cover transition-opacity duration-500"
        />
      </div>

      {/* Controls */}
      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={previousImage}
            aria-label="Previous image"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:bg-gray-100"
          >
            ←
          </button>

          <button
            type="button"
            onClick={nextImage}
            aria-label="Next image"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:bg-gray-100"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}