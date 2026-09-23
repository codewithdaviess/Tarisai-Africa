"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

import { activities } from "@/data/activities";
import { accommodations } from "@/data/accommodations";
import { getSpecialPricePerPerson, specials } from "@/data/specials";
import { transfers } from "@/data/transfers";

import Container from "@/components/ui/Container";
import EnquirySummary from "@/components/enquiry/EnquirySummary";
import TravellerDetailsForm from "@/components/enquiry/TravellerDetailsForm";
import EnquirySuccess from "@/components/enquiry/EnquirySuccess";
import TripEnquiryForm from "@/components/enquiry/TripEnquiryForm";
import { useTrip } from "@/components/trip/TripProvider";
import { trackEvent } from "@/lib/research/trackEvent";

function EnquirePageContent() {
  const searchParams = useSearchParams();
  const { items } = useTrip();

  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");

  const activitySlug = searchParams.get("activity");
  const specialSlug = searchParams.get("special");

  const date = searchParams.get("date") ?? "";

  const adults = Math.max(
    1,
    Number(searchParams.get("adults") ?? 1),
  );

  const children = Math.max(
    0,
    Number(searchParams.get("children") ?? 0),
  );

  const activity = useMemo(
    () =>
      activitySlug
        ? activities.find(
            (item) => item.slug === activitySlug,
          )
        : undefined,
    [activitySlug],
  );

  const special = useMemo(
    () =>
      specialSlug
        ? specials.find(
            (item) => item.slug === specialSlug,
          )
        : undefined,
    [specialSlug],
  );

  /*
   * Determine what the enquiry is for.
   */
  const enquiryType = special
    ? "special"
    : activity
      ? "activity"
      : null;

  const tripProducts = items.map((item) => {
    const product =
      item.type === "activity"
        ? activities.find((entry) => entry.slug === item.slug)
        : item.type === "special"
          ? specials.find((entry) => entry.slug === item.slug)
          : item.type === "accommodation"
            ? accommodations.find((entry) => entry.slug === item.slug)
            : transfers.find((entry) => entry.slug === item.slug);

    return { item, name: product?.name ?? item.slug };
  });

  useEffect(() => {
    if (activity) {
      trackEvent({
        eventName: "enquiry_started",
        page: "/enquire",
        entityType: "activity",
        entitySlug: activity.slug,
      });
    }

    if (special) {
      trackEvent({
        eventName: "enquiry_started",
        page: "/enquire",
        entityType: "special",
        entitySlug: special.slug,
      });
    }
  }, [activity, special]);

  if (!enquiryType) {
    if (submitted) {
      return (
        <main className="bg-white">
          <section className="min-h-[75svh] bg-brand text-white">
            <Container>
              <div className="flex min-h-[75svh] items-center justify-center px-6 py-20 text-center sm:px-8 lg:px-12">
                <div className="w-full max-w-3xl">
                  <p className="text-sm font-medium uppercase tracking-[0.12em] text-white/80">
                    Enquiry
                  </p>
                  <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                    You're all set.
                  </h1>
                </div>
              </div>
            </Container>
          </section>
          <section className="bg-white py-12">
            <Container>
              <EnquirySuccess
                activityName="your selected trip"
                reference={reference}
              />
            </Container>
          </section>
        </main>
      );
    }

    return (
      <main className="bg-white">
        <section className="min-h-[75svh] bg-brand text-white">
          <Container>
            <div className="flex min-h-[75svh] items-center justify-center px-6 py-20 text-center sm:px-8 lg:px-12">
              <div className="w-full max-w-3xl">
                <p className="text-sm font-medium uppercase tracking-[0.12em] text-white/80">
                  Travel enquiry
                </p>
                <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                  Build your journey.
                </h1>
                <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/90">
                  Tell us about your plans and we will help arrange your trip.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white py-12">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[380px_1fr]">
              <div>
                <div className="border border-neutral-200 bg-neutral-50 p-6">
                  <p className="text-eyebrow font-medium uppercase tracking-[0.12em] text-brand">
                    Your trip
                  </p>
                  <h2 className="mt-2 text-section-title font-semibold tracking-tight text-neutral-900">
                    Selected products
                  </h2>
                  <div className="mt-6 space-y-4">
                    {tripProducts.map(({ item, name }) => (
                      <div
                        key={`${item.type}-${item.slug}`}
                        className="border-t border-neutral-200 pt-4 first:border-t-0 first:pt-0"
                      >
                        <p className="text-xs uppercase tracking-wide text-neutral-400">
                          {item.type}
                        </p>
                        <p className="mt-1 text-sm font-medium text-neutral-900">
                          {name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="min-w-0">
                <TripEnquiryForm
                  onSuccess={(newReference) => {
                    setReference(newReference);
                    setSubmitted(true);
                  }}
                />
              </div>
            </div>
          </Container>
        </section>
      </main>
    );
  }

  /*
   * Activities have fixed adult/child pricing.
   *
   * Specials currently have "from per person" pricing,
   * so we calculate the displayed estimate from the
   * package's starting price.
   */
  const totalPeople = adults + children;
  const specialPricePerPerson = special
    ? getSpecialPricePerPerson(special.pricing, totalPeople)
    : null;

  if (special && specialPricePerPerson === null) {
    return null;
  }

  const total = special
    ? totalPeople * specialPricePerPerson!
    : adults * activity!.pricing.adult.amount +
      children * activity!.pricing.child.amount;

  const currency = special
    ? special.pricing.currency
    : activity!.pricing.adult.currency;

  const name = special
    ? special.name
    : activity!.name;

  const location = special
    ? special.destinations.join(" • ")
    : activity!.location;

  if (submitted) {
    return (
      <main className="bg-white">
        <section className="min-h-[75svh] bg-brand text-white">
          <Container>
            <div className="flex min-h-[75svh] items-center justify-center px-6 py-20 text-center sm:px-8 lg:px-12">
              <div className="w-full max-w-3xl">
                <p className="text-sm font-medium uppercase tracking-[0.12em] text-white/80">
                  Enquiry
                </p>

                <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                  You're all set.
                </h1>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white py-12">
          <Container>
            <EnquirySuccess
              activityName={name}
              reference={reference}
            />
          </Container>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <section className="min-h-[75svh] bg-brand text-white">
        <Container>
          <div className="flex min-h-[75svh] items-center justify-center px-6 py-20 text-center sm:px-8 lg:px-12">
            <div className="w-full max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.12em] text-white/80">
                Enquiry
              </p>

              <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                Plan your experience
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/90">
                Tell us a little about yourself and we'll help arrange the
                experience.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-12">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[380px_1fr]">
            <div>
              <EnquirySummary
                activityName={name}
                location={location}
                date={date}
                adults={adults}
                children={children}
                currency={currency}
                total={total}
                pricePerPerson={specialPricePerPerson ?? undefined}
              />
            </div>

            <div>
              <TravellerDetailsForm
                activity={activitySlug ?? ""}
                special={specialSlug ?? ""}
                date={date}
                adults={adults}
                children={children}
                onSuccess={(newReference) => {
                  setReference(newReference);
                  setSubmitted(true);
                }}
              />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default function EnquirePage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[75svh] items-center justify-center bg-white">
          <p className="text-sm text-neutral-500">Loading your enquiry...</p>
        </main>
      }
    >
      <EnquirePageContent />
    </Suspense>
  );
}