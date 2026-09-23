import { PageHero } from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import ContactEnquiryForm from "@/components/enquiry/ContactEnquiryForm";
import { accommodations } from "@/data/accommodations";

type ContactPageProps = {
  searchParams: Promise<{
    accommodation?: string;
    service?: string;
  }>;
};

export default async function Page({ searchParams }: ContactPageProps) {
  const {
    accommodation: accommodationSlug,
    service,
  } = await searchParams;
  const accommodation = accommodations.find(
    (item) => item.slug === accommodationSlug,
  );
  const serviceTitle =
    service === "airport-transfer"
      ? "an airport transfer"
      : service === "local-transfers"
        ? "local transfers"
        : null;

  return (
    <>
      <PageHero
        image="/images/contact/contact-hero.jpg"
        title={
          accommodation
            ? `Enquire about ${accommodation.name}.`
            : serviceTitle
              ? `Enquire about ${serviceTitle}.`
              : "Contact Us."
        }
        description={
          accommodation
            ? "Tell us about your travel plans and we will help include this stay in your journey."
            : serviceTitle
              ? `Tell us where you are going and we will help arrange ${serviceTitle}.`
            : "Get in touch with our team for any inquiries or assistance you may need."
        }
      />

      {/* Contact Content */}
      <section className="bg-white px-6 py-20 text-black sm:px-8 lg:px-12">
        <Container>
          <div className="mx-auto max-w-3xl">
            {/* Enquiry Heading */}
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-[0.15em] text-brand">
                Travel enquiry
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                {accommodation
                  ? `Let's plan your stay at ${accommodation.name}.`
                  : serviceTitle
                    ? `Let's arrange ${serviceTitle}.`
                    : "Let's plan your journey."}
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-black/60">
                Tell us a little about your plans, and our team will help you
                take the next step.
              </p>
            </div>

            <ContactEnquiryForm
              context={
                accommodation
                  ? `Accommodation: ${accommodation.name}`
                  : serviceTitle
                    ? `Service: ${serviceTitle}`
                    : undefined
              }
            />
          </div>
        </Container>
      </section>
    </>
  );
}
