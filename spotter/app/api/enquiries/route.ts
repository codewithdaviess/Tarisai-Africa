import { NextResponse } from "next/server";
import crypto from "node:crypto";

import { activities } from "@/data/activities";
import { getSpecialPricePerPerson, specials } from "@/data/specials";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { enquiryRateLimit } from "@/lib/security/rateLimit";
import { sendEnquiryNotification } from "@/lib/email/sendEnquiryEmail";
import { sendTravellerConfirmation } from "@/lib/email/sendTravellerConfirmation";
import {
  submitTripEnquiry,
  type TripEnquiryRequest,
} from "@/lib/enquiry/submitTripEnquiry";

type EnquiryRequest = {
  contact?: boolean;
  context?: string;
  fullName?: string;
  whatsapp?: string;
  arrival?: string;
  duration?: string;
  travellers?: number;
  activity?: string;
  special?: string;
  date: string;
  adults: number;
  children: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country?: string;
  message?: string;
};

function generateReference() {
  return `TAT-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
}

function cleanString(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip =
      forwardedFor?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rateLimit = await enquiryRateLimit.limit(ip);

    if (!rateLimit.success) {
      const retryAfter = Math.max(
        1,
        Math.ceil((rateLimit.reset - Date.now()) / 1000),
      );

      return NextResponse.json(
        {
          success: false,
          message: "Too many enquiry attempts. Please try again later.",
        },
        {
          status: 429,
          headers: { "Retry-After": String(retryAfter) },
        },
      );
    }
    // --------------------------------
    // Parse request
    // --------------------------------

    let body: EnquiryRequest;

    try {
      body = (await request.json()) as EnquiryRequest;
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request.",
        },
        { status: 400 },
      );
    }

    if (Array.isArray((body as EnquiryRequest & { items?: unknown }).items)) {
      try {
        const result = await submitTripEnquiry(body as unknown as TripEnquiryRequest);

        return NextResponse.json({
          success: true,
          message: "Your trip enquiry has been received.",
          enquiry: result,
        });
      } catch (error) {
        return NextResponse.json(
          {
            success: false,
            message:
              error instanceof Error
                ? error.message
                : "We couldn't send your enquiry. Please try again.",
          },
          { status: 400 },
        );
      }
    }

    if (body.contact) {
      const fullName = cleanString(body.fullName, 150);
      const nameParts = fullName.split(/\s+/).filter(Boolean);
      const firstName = nameParts.shift() ?? "";
      const lastName = nameParts.join(" ") || firstName;
      const email = cleanString(body.email, 254).toLowerCase();
      const phone = cleanString(body.whatsapp, 40);
      const secondaryPhone = cleanString(body.phone, 40);
      const date = cleanString(body.arrival, 20);
      const context = cleanString(body.context, 200);
      const duration = cleanString(body.duration, 50);
      const message = cleanString(body.message, 2000);
      const travellers = body.travellers;

      if (!firstName || !email || !phone || !date || !duration) {
        return NextResponse.json(
          { success: false, message: "Please complete all required fields." },
          { status: 400 },
        );
      }

      if (!/^\S+@\S+\.\S+$/.test(email)) {
        return NextResponse.json(
          { success: false, message: "Please provide a valid email address." },
          { status: 400 },
        );
      }

      const travelDate = new Date(`${date}T00:00:00`);

      if (Number.isNaN(travelDate.getTime())) {
        return NextResponse.json(
          { success: false, message: "Please provide a valid travel date." },
          { status: 400 },
        );
      }

      if (
        typeof travellers !== "number" ||
        !Number.isInteger(travellers) ||
        travellers < 1 ||
        travellers > 12
      ) {
        return NextResponse.json(
          { success: false, message: "Please provide a valid number of travellers." },
          { status: 400 },
        );
      }

      const travellerCount = travellers as number;

      const reference = generateReference();
      const contactMessage = [
        context,
        `Trip duration: ${duration}`,
        secondaryPhone ? `Phone: ${secondaryPhone}` : null,
        message,
      ]
        .filter(Boolean)
        .join("\n");
      const supabase = createSupabaseServerClient();
      const { data, error } = await supabase
        .from("enquiries")
        .insert({
          reference,
          enquiry_type: "contact",
          activity_slug: null,
          activity_name: null,
          special_slug: null,
          special_name: null,
          travel_date: date,
          adults: travellerCount,
          children: 0,
          total_people: travellerCount,
          price_per_person: null,
          total: 0,
          currency: "USD",
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          country: null,
          message: contactMessage || null,
          status: "new",
        })
        .select("id, reference")
        .single();

      if (error) {
        console.error("Supabase contact enquiry error:", error);
        return NextResponse.json(
          { success: false, message: "We couldn't save your enquiry. Please try again." },
          { status: 500 },
        );
      }

      const experienceName = context || "General travel enquiry";

      try {
        await sendEnquiryNotification({
          reference: data.reference,
          activityName: experienceName,
          travelDate: date,
          adults: travellerCount,
          children: 0,
          total: 0,
          currency: "USD",
          firstName,
          lastName,
          email,
          phone,
          country: null,
          message: contactMessage || null,
        });
      } catch (emailError) {
        console.error("Contact enquiry notification email error:", emailError);
      }

      try {
        await sendTravellerConfirmation({
          reference: data.reference,
          activityName: experienceName,
          travelDate: date,
          adults: travellerCount,
          children: 0,
          total: 0,
          currency: "USD",
          firstName,
          email,
        });
      } catch (emailError) {
        console.error("Contact traveller confirmation email error:", emailError);
      }

      return NextResponse.json({
        success: true,
        message: "Your enquiry has been received.",
        enquiry: { id: data.id, reference: data.reference },
      });
    }

    const {
      activity: activitySlug,
      special: specialSlug,
      date,
      adults,
      children,
      country,
    } = body;

    const firstName = cleanString(body.firstName, 100);
    const lastName = cleanString(body.lastName, 100);
    const email = cleanString(body.email, 254).toLowerCase();
    const phone = cleanString(body.phone, 40);
    const message = cleanString(body.message, 2000);

    // --------------------------------
    // Activity OR Special — never both
    // --------------------------------

    if ((!activitySlug && !specialSlug) || (activitySlug && specialSlug)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select one experience.",
        },
        { status: 400 },
      );
    }

    // --------------------------------
    // Required fields
    // --------------------------------

    if (!date || !firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 },
      );
    }

    // --------------------------------
    // Participant validation
    // --------------------------------

    if (
      !Number.isInteger(adults) ||
      adults < 1 ||
      adults > 12 ||
      !Number.isInteger(children) ||
      children < 0 ||
      children > 12
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid participant information.",
        },
        { status: 400 },
      );
    }

    const totalPeople = adults + children;

    if (totalPeople > 12) {
      return NextResponse.json(
        {
          success: false,
          message:
            "For groups larger than 12 travellers, please contact us directly.",
        },
        { status: 400 },
      );
    }

    // --------------------------------
    // Validate email
    // --------------------------------

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 },
      );
    }

    // --------------------------------
    // Validate date
    // --------------------------------

    const travelDate = new Date(`${date}T00:00:00`);

    if (Number.isNaN(travelDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid travel date.",
        },
        { status: 400 },
      );
    }

    // --------------------------------
    // Find experience on server
    // --------------------------------

    const activity = activitySlug
      ? activities.find((item) => item.slug === activitySlug)
      : undefined;

    const special = specialSlug
      ? specials.find((item) => item.slug === specialSlug)
      : undefined;

    if (!activity && !special) {
      return NextResponse.json(
        {
          success: false,
          message: "The selected experience could not be found.",
        },
        { status: 404 },
      );
    }

    // --------------------------------
    // Calculate price on server
    // --------------------------------

    let total: number;
    let pricePerPerson: number | null = null;
    let currency: string;

    if (special) {
      pricePerPerson = getSpecialPricePerPerson(special.pricing, totalPeople);

      if (pricePerPerson === null) {
        return NextResponse.json(
          {
            success: false,
            message: "Please contact us for groups larger than 12 travellers.",
          },
          { status: 400 },
        );
      }

      total = totalPeople * pricePerPerson;
      currency = special.pricing.currency;
    } else {
      total =
        adults * activity!.pricing.adult.amount +
        children * activity!.pricing.child.amount;

      currency = activity!.pricing.adult.currency;
    }

    // --------------------------------
    // Generate reference
    // --------------------------------

    const reference = generateReference();

    // --------------------------------
    // Save enquiry
    // --------------------------------

    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from("enquiries")
      .insert({
        reference,

        enquiry_type: special ? "special" : "activity",

        activity_slug: activity?.slug ?? null,
        activity_name: activity?.name ?? null,

        special_slug: special?.slug ?? null,
        special_name: special?.name ?? null,

        travel_date: date,

        adults,
        children,
        total_people: totalPeople,

        price_per_person: pricePerPerson,

        total,
        currency,

        first_name: firstName,
        last_name: lastName,
        email,
        phone,

        country: cleanString(country, 100) || null,
        message: message || null,

        status: "new",
      })
      .select("id, reference")
      .single();

    if (error) {
      console.error("Supabase enquiry error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "We couldn't save your enquiry. Please try again.",
        },
        { status: 500 },
      );
    }

    // --------------------------------
    // Experience name
    // --------------------------------

    const experienceName = special?.name ?? activity!.name;

    // --------------------------------
    // Notify Travel Asambe Africa
    // --------------------------------

    try {
      await sendEnquiryNotification({
        reference: data.reference,
        activityName: experienceName,
        travelDate: date,
        adults,
        children,
        total,
        currency,
        firstName,
        lastName,
        email,
        phone,
        country: cleanString(country, 100) || null,
        message: message || null,
      });
    } catch (emailError) {
      console.error("Enquiry notification email error:", emailError);
    }

    // --------------------------------
    // Confirm to traveller
    // --------------------------------

    try {
      await sendTravellerConfirmation({
        reference: data.reference,
        activityName: experienceName,
        travelDate: date,
        adults,
        children,
        total,
        currency,
        firstName,
        email,
      });
    } catch (emailError) {
      console.error("Traveller confirmation email error:", emailError);
    }

    // --------------------------------
    // Success
    // --------------------------------

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been received.",
      enquiry: {
        id: data.id,
        reference: data.reference,
        experience: experienceName,
        total,
        currency,
      },
    });
  } catch (error) {
    console.error("Enquiry API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 },
    );
  }
}
