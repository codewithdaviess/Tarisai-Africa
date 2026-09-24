import { Resend } from "resend";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY");
  }

  return new Resend(apiKey);
}

type EnquiryEmailData = {
  reference: string;
  activityName: string;
  travelDate: string;
  adults: number;
  children: number;
  total: number;
  currency: string;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  country?: string | null;
  message?: string | null;
};

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
}

export async function sendEnquiryNotification(
  enquiry: EnquiryEmailData
) {
  const notificationEmail =
    process.env.ENQUIRY_NOTIFICATION_EMAIL;

  if (!notificationEmail) {
    throw new Error(
      "Missing ENQUIRY_NOTIFICATION_EMAIL"
    );
  }

  const resend = getResendClient();
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  const formattedDate = formatDate(
    enquiry.travelDate
  );

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
    from: `Travel Asambe Africa <${fromEmail}>`,
    to: notificationEmail,

    subject: `New enquiry ${enquiry.reference} — ${enquiry.activityName}`,

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #171717;">

        <div style="padding: 32px 0; border-bottom: 1px solid #e5e5e5;">
          <p style="
            margin: 0;
            color: #f08720;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
          ">
            New Travel Enquiry
          </p>

          <h1 style="
            margin: 10px 0 6px;
            font-size: 28px;
            font-weight: 600;
          ">
            ${escapeHtml(enquiry.activityName)}
          </h1>

          <p style="
            margin: 0;
            color: #737373;
            font-size: 14px;
          ">
            Reference: <strong>${escapeHtml(enquiry.reference)}</strong>
          </p>
        </div>

        <div style="padding: 28px 0;">

          <h2 style="font-size: 16px; margin-bottom: 12px;">
            Experience
          </h2>

          <p style="font-size: 14px; line-height: 1.8;">
            <strong>Date:</strong> ${escapeHtml(formattedDate)}<br />
            <strong>Participants:</strong> ${participantText}<br />
            <strong>Estimated total:</strong>
            ${escapeHtml(enquiry.currency)} ${enquiry.total}
          </p>

          <h2 style="
            font-size: 16px;
            margin-top: 30px;
            margin-bottom: 12px;
          ">
            Traveller
          </h2>

          <p style="font-size: 14px; line-height: 1.8;">
            <strong>Name:</strong>
            ${escapeHtml(enquiry.firstName)} ${escapeHtml(enquiry.lastName)}<br />

            <strong>Email:</strong>
            ${escapeHtml(enquiry.email)}<br />

            <strong>Phone:</strong>
            ${escapeHtml(enquiry.phone)}<br />

            <strong>Country:</strong>
            ${escapeHtml(enquiry.country || "Not provided")}
          </p>

          <h2 style="
            font-size: 16px;
            margin-top: 30px;
            margin-bottom: 12px;
          ">
            Message
          </h2>

          <div style="
            background: #f5f5f5;
            padding: 16px;
            font-size: 14px;
            line-height: 1.7;
          ">
            ${escapeHtml(enquiry.message || "No additional message provided.")}
          </div>

        </div>

        <div style="
          border-top: 1px solid #e5e5e5;
          padding: 24px 0;
          color: #737373;
          font-size: 12px;
          line-height: 1.6;
        ">
          This enquiry was submitted through the Travel Asambe Africa website.
        </div>

      </div>
    `,
  });

  if (error) {
    console.error(
      "Resend notification error:",
      error
    );

    throw error;
  }

  return data;
}