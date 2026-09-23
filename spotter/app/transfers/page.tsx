import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import TransferCard from "@/components/transfers/TransferCard";
import { transfers } from "@/data/transfers";

export const metadata: Metadata = {
  title: "Victoria Falls Transfers",
  description:
    "Arrange airport, hotel and local transfers for your Victoria Falls itinerary.",
  alternates: { canonical: "/transfers" },
};

export default function TransfersPage() {
  return (
    <main className="bg-white">
      <PageHero
        image="/images/placeholder.jpg"
        title="Transfers."
        description="Arrange practical transport between airports, accommodation and experiences."
      />
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <Container>
          <p className="max-w-3xl text-sm leading-7 text-neutral-600">
            Transfers are arranged by enquiry and confirmed as part of your wider Travel Asambe Africa itinerary.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {transfers.map((transfer) => (
              <TransferCard key={transfer.slug} {...transfer} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
