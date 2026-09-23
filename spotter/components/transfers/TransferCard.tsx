import Link from "next/link";

import type { Transfer } from "@/data/transfers";

type TransferCardProps = Transfer;

export default function TransferCard({
  slug,
  name,
  type,
  destination,
  description,
}: TransferCardProps) {
  return (
    <article className="border border-neutral-200 p-5">
      <Link href={`/transfers/${slug}`} className="group block">
        <p className="text-xs uppercase tracking-[0.15em] text-neutral-400">
          {type} · {destination}
        </p>
        <h2 className="mt-2 text-xl font-semibold text-neutral-900 group-hover:text-brand">
          {name}
        </h2>
        <p className="mt-3 text-sm leading-7 text-neutral-600">{description}</p>
      </Link>
    </article>
  );
}
