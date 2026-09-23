"use client";

import { useEffect, useState, type ReactNode } from "react";

type ReadMoreModalProps = {
  title: string;
  children: ReactNode;
};

export default function ReadMoreModal({ title, children }: ReadMoreModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-5 inline-flex bg-neutral-200 px-5 py-3 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-900"
      >
        Read more
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-neutral-950/60 px-4 py-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="read-more-modal-title"
            className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden bg-white"
          >
            {/* Fixed modal header */}
            <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-6 py-5 shadow-xs sm:px-8">
              <h2
                id="read-more-modal-title"
                className="text-section-title font-semibold tracking-tight text-neutral-900"
              >
                {title}
              </h2>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close dialog"
                className="shrink-0 text-2xl leading-none text-neutral-500 transition-colors hover:text-neutral-900"
              >
                ×
              </button>
            </div>

            {/* Scrollable content */}
            <div className="min-h-0 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
