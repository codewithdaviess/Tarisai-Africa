import { Resend } from "resend";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY");
  }

  return new Resend(apiKey);
}

type TravellerConfirmationData = {
  reference: string;
  activityName: string;
  travelDate: string;
  adults: number;
  children: number;
  total: number;
  currency: string;
  firstName: string;
  email: string;
};

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function sendTravellerConfirmation(
  enquiry: TravellerConfirmationData
) {
  const resend = getResendClient();

  const formattedDate = new Date(
    `${enquiry.travelDate}T00:00:00`
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const participantText = [
    `${enquiry.adults} ${
      enquiry.adults === 1 ? "Adult" : "Adults"
    }`,
    enquiry.children > 0
      ? `${enquiry.children} ${
          enquiry.children === 1
            ? "Child"
            : "Children"
        }`
      : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const { data, error } = await resend.emails.send({
    from: "Travel Asambe Africa <onboarding@resend.dev>",
    to: enquiry.email,

    subject: `We've received your enquiry — ${enquiry.reference}`,

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 620px;
        margin: 0 auto;
        color: #171717;
      ">

        <div style="
          padding: 32px 0;
          border-bottom: 1px solid #e5e5e5;
        ">

          <p style="
            margin: 0;
            color: #f08720;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
          ">
            Enquiry received
          </p>

          <h1 style="
            margin: 10px 0;
            font-size: 30px;
            font-weight: 600;
          ">
            Thanks, ${escapeHtml(enquiry.firstName)}.
          </h1>

          <p style="
            margin: 0;
            color: #737373;
            font-size: 14px;
          ">
            We've received your travel enquiry.
          </p>

        </div>

        <div style="padding: 28px 0;">

          <div style="
            background: #f5f5f5;
            padding: 18px;
            margin-bottom: 28px;
          ">

            <p style="
              margin: 0 0 6px;
              color: #737373;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 1px;
            ">
              Your reference
            </p>

            <p style="
              margin: 0;
              font-size: 22px;
              font-weight: 600;
            ">
              ${escapeHtml(enquiry.reference)}
            </p>

          </div>

          <h2 style="font-size: 17px;">
            Your enquiry
          </h2>

          <p style="
            font-size: 14px;
            line-height: 1.8;
          ">
            <strong>Experience:</strong>
            ${escapeHtml(enquiry.activityName)}<br />

            <strong>Date:</strong>
            ${escapeHtml(formattedDate)}<br />

            <strong>Participants:</strong>
            ${participantText}<br />

            <strong>Estimated total:</strong>
            ${escapeHtml(enquiry.currency)} ${enquiry.total}
          </p>

          <h2 style="
            margin-top: 32px;
            font-size: 17px;
          ">
            What happens next?
          </h2>

          <p style="
            font-size: 14px;
            line-height: 1.8;
            color: #525252;
          ">
            We've received your request and our team will
            now check availability for your selected date
            and participants.
          </p>

          <ol style="
            padding-left: 20px;
            font-size: 14px;
            line-height: 2;
            color: #525252;
          ">
            <li>
              We'll check availability for your requested experience.
            </li>

            <li>
              We'll send you a quotation with the confirmed
              price and what's included.
            </li>

            <li>
              If you decide to proceed, we'll provide the
              appropriate payment option.
            </li>

            <li>
              Your booking will only be confirmed once the
              required payment has been received and we've
              sent your booking confirmation.
            </li>
          </ol>

          <div style="
            margin-top: 28px;
            padding: 18px;
            border: 1px solid #e5e5e5;
          ">

            <p style="
              margin: 0;
              font-size: 14px;
              line-height: 1.7;
            ">
              <strong>No payment is required at this stage.</strong>
              Your enquiry is not yet a confirmed booking.
            </p>

          </div>

        </div>

        <div style="
          border-top: 1px solid #e5e5e5;
          padding: 24px 0;
          color: #737373;
          font-size: 12px;
          line-height: 1.6;
        ">
            Travel Asambe Africa<br />
          Thank you for choosing us for your travel experience.
        </div>

      </div>
    `,
  });

  if (error) {
    console.error(
      "Traveller confirmation email error:",
      error
    );

    throw error;
  }

  return data;
}