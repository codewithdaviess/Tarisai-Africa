"use client";

import { useState } from "react";

import ExperienceSectionHeading from "@/components/experiences/ExperienceSectionHeading";
import ExperienceSectionSubHeading from "../experiences/ExperienceSectionSubHeading";
import { trackEvent } from "@/lib/research/trackEvent";

type ExperienceFAQProps = {
  type: "activity" | "special" | "destination";
  slug: string;
  faqs: {
    question: string;
    answer: string;
  }[];
};

export default function ExperienceFAQ({
  type,
  slug,
  faqs,
}: ExperienceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs.length) {
    return null;
  }

  function toggleFAQ(index: number) {
    const isOpening = openIndex !== index;

    if (isOpening) {
      void trackEvent({
        eventName: "faq_opened",
        page: window.location.pathname,
        entityType: type,
        entitySlug: slug,
        metadata: {
          faqId: `${type}-faq-${index + 1}`,
        },
      });
    }

    setOpenIndex(isOpening ? index : null);
  }

  return (
    <section className="mt-12">
      <ExperienceSectionSubHeading>
  FAQs
</ExperienceSectionSubHeading>

<ExperienceSectionHeading>
  Frequently asked questions
</ExperienceSectionHeading>

      <div className="mt-5 divide-y divide-neutral-200 border-y border-neutral-200">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={faq.question}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="font-medium text-neutral-900">
                  {faq.question}
                </span>

                <span
                  aria-hidden="true"
                  className="shrink-0 text-xl text-brand"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <p className="max-w-3xl pb-5 text-sm leading-6 text-neutral-600">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}