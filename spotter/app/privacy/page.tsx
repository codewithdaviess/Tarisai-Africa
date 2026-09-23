import type { Metadata } from "next";

import Container from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Travel Asambe Africa collects, uses and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-white text-black">
      <PageHero
        image="/images/activities/activities-hero.jpg"
        title="Privacy Policy"
        description="How Travel Asambe Africa collects, uses and protects your information."
      />

      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-3xl space-y-10 text-sm leading-7 text-black/65 sm:text-base">
            <PolicySection title="Information we collect">
              <p>
                When you use our website, submit an enquiry, write a review or
                create a trip enquiry, we may collect your name, email address,
                telephone number, country, dates, group size, selected travel
                services and any message or preferences you provide.
              </p>
            </PolicySection>

            <PolicySection title="How we use your information">
              <p>
                We use this information to respond to enquiries and reviews,
                check availability, arrange requested activities, accommodation
                and transfers, send enquiry confirmations, communicate with you,
                and improve the website.
              </p>
            </PolicySection>

            <PolicySection title="Information sharing">
              <p>
                We do not sell personal information. We may share relevant
                information with travel providers or partners when necessary to
                fulfil a booking or service that you requested. Supabase may
                store enquiry records and Resend may deliver transactional
                emails on our behalf.
              </p>
            </PolicySection>

            <PolicySection title="Data security">
              <p>
                We use reasonable safeguards, including server-side validation,
                rate limiting and restricted handling of enquiry data. However,
                no internet transmission or storage system can be guaranteed to
                be completely secure.
              </p>
            </PolicySection>

            <PolicySection title="Your choices and rights">
              <p>
                You may contact us with questions about the personal information
                we hold about you or request that we update or correct it. You
                can also manage cookies through your browser settings and the
                cookie controls available on our legal and information page.
              </p>
            </PolicySection>

            <PolicySection title="Contact us">
              <p>
                If you have a question about this policy or how your information
                is handled, please contact Travel Asambe Africa through our
                <a
                  href="/contact"
                  className="ml-1 font-medium text-black underline underline-offset-4"
                >
                  contact page
                </a>
                .
              </p>
            </PolicySection>
          </div>
        </Container>
      </section>
    </main>
  );
}

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-3xl font-medium tracking-tight text-black sm:text-4xl">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}