import crypto from "node:crypto";

import { activities } from "@/data/activities";
import { accommodations } from "@/data/accommodations";
import { getSpecialPricePerPerson, specials } from "@/data/specials";
import { transfers } from "@/data/transfers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  sendTripEnquiryConfirmation,
  sendTripEnquiryNotification,
} from "@/lib/email/sendTripEnquiryEmails";

type TripRequestItem = {
  type: "activity" | "special" | "accommodation" | "transfer";
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

type TripItemPricing = {
  currency: string;
  unitAmount?: number;
  quantity?: number;
  totalAmount: number;
  label: string;
};

type ResolvedTripItem = TripRequestItem & {
  name: string;
  pricing?: TripItemPricing;
};

export type TripEnquiryRequest = {
  items: TripRequestItem[];
  travelDate?: string;
  returnDate?: string;
  adults?: number;
  children?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country?: string;
  message?: string;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function reference() {
  return `TAT-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
}

function isTripItem(value: unknown): value is TripRequestItem {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Partial<TripRequestItem>;
  return (
    ["activity", "special", "accommodation", "transfer"].includes(item.type ?? "") &&
    typeof item.slug === "string" &&
    item.slug.trim().length > 0 &&
    (item.details === undefined || (typeof item.details === "object" && item.details !== null))
  );
}

function isDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

function nightsBetween(checkIn: string, checkOut: string) {
  const start = new Date(`${checkIn}T00:00:00Z`).getTime();
  const end = new Date(`${checkOut}T00:00:00Z`).getTime();
  return Math.round((end - start) / (24 * 60 * 60 * 1000));
}

export async function submitTripEnquiry(body: TripEnquiryRequest) {
  const items = Array.isArray(body.items) ? body.items : [];
  const firstName = clean(body.firstName, 100);
  const lastName = clean(body.lastName, 100);
  const email = clean(body.email, 254).toLowerCase();
  const phone = clean(body.phone, 40);
  const message = clean(body.message, 2000);
  const country = clean(body.country, 100);

  if (items.length === 0 || items.length > 30) {
    throw new Error("Please add at least one item to your trip.");
  }

  if (!items.every(isTripItem)) {
    throw new Error("One or more selected trip items are invalid.");
  }

  if (!firstName || !lastName || !email || !phone) {
    throw new Error("Please complete all required fields.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Please provide a valid email address.");
  }

  const resolved: ResolvedTripItem[] = items.map((item) => {
    const product =
      item.type === "activity"
        ? activities.find((entry) => entry.slug === item.slug)
        : item.type === "special"
          ? specials.find((entry) => entry.slug === item.slug)
          : item.type === "accommodation"
            ? accommodations.find((entry) => entry.slug === item.slug)
            : transfers.find((entry) => entry.slug === item.slug);

    if (!product) {
      throw new Error(`The selected ${item.type} could not be found.`);
    }

    const details = item.details;

    if (item.type === "activity" || item.type === "special") {
      if (
        !isDate(details?.date) ||
        typeof details.adults !== "number" ||
        !Number.isInteger(details.adults) ||
        details.adults < 1 ||
        details.adults > 12 ||
        typeof details.children !== "number" ||
        !Number.isInteger(details.children) ||
        details.children < 0 ||
        details.children > 12 ||
        details.adults + details.children > 12
      ) {
        throw new Error(`Please complete the date and participants for ${product.name}.`);
      }
    }

    if (item.type === "accommodation") {
      if (
        !isDate(details?.checkIn) ||
        !isDate(details.checkOut) ||
        details.checkOut <= details.checkIn ||
        typeof details.guests !== "number" ||
        !Number.isInteger(details.guests) ||
        details.guests < 1 ||
        details.guests > 12
      ) {
        throw new Error(`Please complete the check-in, check-out and guests for ${product.name}.`);
      }
    }

    if (item.type === "transfer") {
      if (
        !isDate(details?.date) ||
        typeof details.passengers !== "number" ||
        !Number.isInteger(details.passengers) ||
        details.passengers < 1 ||
        details.passengers > 12
      ) {
        throw new Error(`Please complete the date and passengers for ${product.name}.`);
      }
    }

    let pricing: TripItemPricing | undefined;

    if (item.type === "activity") {
      const activity = product as (typeof activities)[number];
      const adults = details?.adults ?? 0;
      const children = details?.children ?? 0;
      pricing = {
        currency: activity.pricing.adult.currency,
        totalAmount:
          adults * activity.pricing.adult.amount +
          children * activity.pricing.child.amount,
        label: `${adults} adults, ${children} children`,
      };
    } else if (item.type === "special") {
      const special = product as (typeof specials)[number];
      const people = (details?.adults ?? 0) + (details?.children ?? 0);
      const pricePerPerson = getSpecialPricePerPerson(special.pricing, people);

      if (pricePerPerson !== null) {
        pricing = {
          currency: special.pricing.currency,
          unitAmount: pricePerPerson,
          quantity: people,
          totalAmount: people * pricePerPerson,
          label: `${people} travellers`,
        };
      }
    } else if (item.type === "accommodation") {
      const accommodation = product as (typeof accommodations)[number];
      const nights = nightsBetween(details!.checkIn!, details!.checkOut!);

      if (accommodation.priceFrom) {
        pricing = {
          currency: accommodation.priceFrom.currency,
          unitAmount: accommodation.priceFrom.amount,
          quantity: nights,
          totalAmount: nights * accommodation.priceFrom.amount,
          label: `${nights} nights at published starting rate`,
        };
      }
    }

    return { ...item, name: product.name, pricing };
  });

  const travelDate = clean(
    body.travelDate ||
      resolved.find((item) => item.details?.date)?.details?.date ||
      resolved.find((item) => item.details?.checkIn)?.details?.checkIn,
    20,
  );
  const returnDate = clean(
    body.returnDate || resolved.find((item) => item.details?.checkOut)?.details?.checkOut,
    20,
  );
  const adults = body.adults ?? Math.max(
    1,
    ...resolved.map((item) =>
      item.details?.adults ?? item.details?.guests ?? item.details?.passengers ?? 1,
    ),
  );
  const children = body.children ?? Math.max(
    0,
    ...resolved.map((item) => item.details?.children ?? 0),
  );
  const totalPeople = Math.max(
    1,
    ...resolved.map((item) =>
      item.type === "activity" || item.type === "special"
        ? (item.details?.adults ?? 1) + (item.details?.children ?? 0)
        : item.details?.guests ?? item.details?.passengers ?? 1,
    ),
  );

  const pricedItems = resolved.filter((item) => item.pricing);
  const estimatedTotal = pricedItems.reduce(
    (sum, item) => sum + (item.pricing?.totalAmount ?? 0),
    0,
  );
  const estimatedCurrency = pricedItems[0]?.pricing?.currency ?? "USD";

  if (!travelDate || !Number.isInteger(adults) || adults < 1 || adults > 12 || !Number.isInteger(children) || children < 0 || children > 12) {
    throw new Error("Please check the dates and number of people selected for your trip.");
  }

  const supabase = createSupabaseServerClient();
  const enquiryReference = reference();
  const { data, error } = await supabase
    .from("enquiries")
    .insert({
      reference: enquiryReference,
      enquiry_type: "trip",
      activity_slug: null,
      activity_name: null,
      special_slug: null,
      special_name: null,
      travel_date: travelDate,
      return_date: returnDate || null,
      adults,
      children,
      total_people: totalPeople,
      price_per_person: null,
      total: estimatedTotal,
      currency: estimatedCurrency,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      country: country || null,
      message: message || null,
      status: "new",
    })
    .select("id, reference")
    .single();

  if (error || !data) {
    throw new Error("We couldn't save your enquiry. Please try again.");
  }

  const { error: itemsError } = await supabase.from("enquiry_items").insert(
    resolved.map((item) => ({
      enquiry_id: data.id,
      item_type: item.type,
      item_slug: item.slug,
      item_name: item.name,
      travel_date: item.details?.date ?? item.details?.checkIn ?? travelDate,
      quantity: 1,
      notes:
        item.details || item.pricing
          ? JSON.stringify({
              details: item.details ?? null,
              pricing: item.pricing ?? null,
            })
          : null,
    })),
  );

  if (itemsError) {
    throw new Error("We couldn't save your trip items. Please try again.");
  }

  const emailData = {
    reference: data.reference,
    items: resolved,
    travelDate,
    returnDate,
    adults,
    children,
    firstName,
    lastName,
    email,
    phone,
    country,
    message,
  };

  try {
    await sendTripEnquiryNotification(emailData);
  } catch (emailError) {
    console.error("Trip enquiry notification email error:", emailError);
  }

  try {
    await sendTripEnquiryConfirmation(emailData);
  } catch (emailError) {
    console.error("Trip enquiry confirmation email error:", emailError);
  }

  return { reference: data.reference, items: resolved };
}
