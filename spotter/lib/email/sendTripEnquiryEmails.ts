import { Resend } from "resend";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY");
  }

  return new Resend(apiKey);
}

type TripEmailItem = {
  type: string;
  slug: string;
  name: string;
  pricing?: {
    currency: string;
    unitAmount?: number;
    quantity?: number;
    totalAmount: number;
    label: string;
  };
};

type TripEmailData = {
  reference: string;
  items: TripEmailItem[];
  travelDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country?: string;
  message?: string;
};

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function itemList(items: TripEmailItem[]) {
  return items
    .map((item) => {
      const price = item.pricing
        ? `${item.pricing.currency} ${item.pricing.totalAmount.toLocaleString()} (${item.pricing.label})`
        : "Price to be confirmed";

      return `<li><strong>${escapeHtml(item.type)}</strong>: ${escapeHtml(item.name)}<br /><span>${escapeHtml(price)}</span></li>`;
    })
    .join("");
}

function totalText(enquiry: TripEmailData) {
  const currency = enquiry.items.find((item) => item.pricing)?.pricing?.currency ?? "USD";

  return enquiry.items.some((item) => !item.pricing)
    ? `${currency} ${enquiry.items.reduce((sum, item) => sum + (item.pricing?.totalAmount ?? 0), 0).toLocaleString()} known-price estimate; final quote required`
    : `${currency} ${enquiry.items.reduce((sum, item) => sum + (item.pricing?.totalAmount ?? 0), 0).toLocaleString()}`;
}

export async function sendTripEnquiryNotification(enquiry: TripEmailData) {
  const resend = getResendClient();
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const notificationEmail = process.env.ENQUIRY_NOTIFICATION_EMAIL;
  if (!notificationEmail) {
    throw new Error("Missing ENQUIRY_NOTIFICATION_EMAIL");
  }

  return resend.emails.send({
    from: `Travel Asambe Africa <${fromEmail}>`,
    to: notificationEmail,
    subject: `New trip enquiry ${enquiry.reference}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:620px;color:#171717">
      <p style="color:#f08720;font-size:12px;font-weight:600;text-transform:uppercase">New Travel Asambe Africa enquiry</p>
      <h1>${escapeHtml(enquiry.reference)}</h1>
      <h2>Requested trip</h2>
      <ul>${itemList(enquiry.items)}</ul>
      <p><strong>Travel date:</strong> ${escapeHtml(enquiry.travelDate)}<br /><strong>Return date:</strong> ${escapeHtml(enquiry.returnDate || "Not provided")}<br /><strong>Travellers:</strong> ${enquiry.adults} adults, ${enquiry.children} children<br /><strong>Estimated total:</strong> ${escapeHtml(totalText(enquiry))}</p>
      <h2>Traveller</h2>
      <p>${escapeHtml(enquiry.firstName)} ${escapeHtml(enquiry.lastName)}<br />${escapeHtml(enquiry.email)}<br />${escapeHtml(enquiry.phone)}<br />${escapeHtml(enquiry.country || "Country not provided")}</p>
      <h2>Message</h2><p>${escapeHtml(enquiry.message || "No additional message provided.")}</p>
    </div>`,
  });
}

export async function sendTripEnquiryConfirmation(enquiry: TripEmailData) {
  const resend = getResendClient();
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  return resend.emails.send({
    from: `Travel Asambe Africa <${fromEmail}>`,
    to: enquiry.email,
    subject: `We've received your Travel Asambe Africa enquiry — ${enquiry.reference}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:620px;color:#171717">
      <p style="color:#f08720;font-size:12px;font-weight:600;text-transform:uppercase">Enquiry received</p>
      <h1>Thanks, ${escapeHtml(enquiry.firstName)}.</h1>
      <p>We've received your Travel Asambe Africa enquiry.</p>
      <p><strong>Reference:</strong> ${escapeHtml(enquiry.reference)}</p>
      <h2>Your requested trip</h2>
      <ul>${itemList(enquiry.items)}</ul>
      <p><strong>Travel date:</strong> ${escapeHtml(enquiry.travelDate)}<br /><strong>Travellers:</strong> ${enquiry.adults} adults, ${enquiry.children} children<br /><strong>Estimated total:</strong> ${escapeHtml(totalText(enquiry))}</p>
      <h2>What happens next?</h2>
      <ol>
        <li>Our team will check availability for your selected dates and services.</li>
        <li>We'll send you a confirmed quote with the final price and inclusions.</li>
        <li>If you decide to proceed, we'll provide the next steps and payment details where applicable.</li>
      </ol>
      <p><strong>No payment is required at this stage.</strong> Submitting this enquiry does not confirm a booking or reserve availability. Your booking is only confirmed after you accept the quote, complete any required payment, and receive our booking confirmation.</p>
    </div>`,
  });
}
