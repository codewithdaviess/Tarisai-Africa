"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

type GalleryLightboxProps = {
  images: GalleryImage[];
};

export default function GalleryLightbox({ images }: GalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeImage = activeIndex === null ? null : images[activeIndex];

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((index) =>
          index === null ? null : (index - 1 + images.length) % images.length,
        );
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((index) =>
          index === null ? null : (index + 1) % images.length,
        );
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, images.length]);

  const showPrevious = () => {
    setActiveIndex((index) =>
      index === null ? null : (index - 1 + images.length) % images.length,
    );
  };

  const showNext = () => {
    setActiveIndex((index) =>
      index === null ? null : (index + 1) % images.length,
    );
  };

  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <figure key={`${image.src}-${image.alt}`} className="group">
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="block w-full cursor-zoom-in overflow-hidden rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              aria-label={`Open image: ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </button>

            {image.caption && (
              <figcaption className="mt-3 text-sm text-neutral-500">
                {image.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {activeImage && activeIndex !== null && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-neutral-950/95 p-4 sm:p-8"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setActiveIndex(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Image ${activeIndex + 1} of ${images.length}`}
            className="flex max-h-full w-full max-w-6xl flex-col items-center"
          >
            <div className="flex w-full items-center justify-between pb-4 text-white">
              <p className="text-sm text-white/70">
                {activeIndex + 1} / {images.length}
              </p>

              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close image viewer"
                className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            <div className="relative flex min-h-0 w-full flex-1 items-center justify-center">
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                className="max-h-[70vh] w-auto max-w-[calc(100%-5rem)] object-contain"
              />

              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous image"
                className="absolute left-0 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white sm:left-2"
              >
                <ChevronLeft size={24} aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={showNext}
                aria-label="Next image"
                className="absolute right-0 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white sm:right-2"
              >
                <ChevronRight size={24} aria-hidden="true" />
              </button>
            </div>

            <div className="w-full max-w-3xl pt-5 text-center text-white">
              <p className="text-sm font-medium">{activeImage.alt}</p>
              {activeImage.caption && (
                <p className="mt-2 text-sm leading-6 text-white/70">
                  {activeImage.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}