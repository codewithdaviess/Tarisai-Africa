import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { transfers } from "@/data/transfers";
import TransferBookingCard from "@/components/transfers/TransferBookingCard";

type TransferPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function TransferPage({ params }: TransferPageProps) {
  const { slug } = await params;
  const transfer = transfers.find((item) => item.slug === slug);

  if (!transfer) {
    notFound();
  }

  return (
    <main className="bg-white">
      <PageHero
        image={transfer.image ?? "/images/placeholder.jpg"}
        title={transfer.name}
        description={transfer.description}
      />
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
            <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.15em] text-neutral-400">
              {transfer.type} · {transfer.destination}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900">
              Plan this transfer as part of your trip.
            </h1>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-neutral-600">
              {transfer.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            </div>
            <TransferBookingCard slug={transfer.slug} name={transfer.name} />
          </div>
        </Container>
      </section>
    </main>
  );
}
