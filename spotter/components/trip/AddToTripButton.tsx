"use client";

import { ShoppingCart } from "lucide-react";
import { useTrip, type TripItem } from "./TripProvider";

type AddToTripButtonProps = {
  type: TripItem["type"];
  slug: string;
  className?: string;
  details?: TripItem["details"];
  disabled?: boolean;
  disabledLabel?: string;
  onBeforeAdd?: () => boolean;
};

export default function AddToTripButton({
  type,
  slug,
  className,
  details,
  disabled = false,
  disabledLabel = "Complete details above",
  onBeforeAdd,
}: AddToTripButtonProps) {
  const { addItem, hasItem } = useTrip();
  const item = { type, slug, details };

  const alreadyAdded = hasItem(item);

  return (
    <button
      type="button"
      onClick={() => {
        if (onBeforeAdd && !onBeforeAdd()) {
          return;
        }

        addItem(item);
      }}
      disabled={alreadyAdded || disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:bg-earth disabled:opacity-100 ${className ?? ""}`}
      title={disabled && !alreadyAdded ? disabledLabel : undefined}
    >
      <ShoppingCart size={16} />
      {alreadyAdded ? "Added to cart" : disabled ? disabledLabel : "Add to cart"}
    </button>
  );
}