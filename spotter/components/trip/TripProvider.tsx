"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type TripItemType = "activity" | "special" | "accommodation" | "transfer";

export type TripItem = {
  type: TripItemType;
  slug: string;
  details?: {
    date?: string;
    adults?: number;
    children?: number;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    passengers?: number;
  };
};

type TripContextValue = {
  items: TripItem[];
  count: number;
  addItem: (item: TripItem) => void;
  removeItem: (item: TripItem) => void;
  hasItem: (item: TripItem) => boolean;
  clear: () => void;
};

const STORAGE_KEY = "travelAsambeTrip";
const TripContext = createContext<TripContextValue | null>(null);

function sameItem(left: TripItem, right: TripItem) {
  return left.type === right.type && left.slug === right.slug;
}

function sameDetails(left: TripItem, right: TripItem) {
  return JSON.stringify(left.details ?? {}) === JSON.stringify(right.details ?? {});
}

export function TripProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<TripItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as TripItem[];
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }

    return [];
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<TripContextValue>(
    () => ({
      items,
      count: items.length,
      addItem: (item) => {
        setItems((current) =>
          current.some((existing) => sameItem(existing, item))
            ? current.map((existing) =>
                sameItem(existing, item) ? item : existing,
              )
            : [...current, item],
        );
      },
      removeItem: (item) => {
        setItems((current) => current.filter((existing) => !sameItem(existing, item)));
      },
      hasItem: (item) =>
        items.some(
          (existing) =>
            sameItem(existing, item) &&
            (!item.details || sameDetails(existing, item)),
        ),
      clear: () => setItems([]),
    }),
    [items],
  );

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTrip() {
  const context = useContext(TripContext);

  if (!context) {
    throw new Error("useTrip must be used within TripProvider");
  }

  return context;
}
