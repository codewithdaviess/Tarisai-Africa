type EnquirySuccessProps = {
  activityName: string;
  reference: string;
};

export default function EnquirySuccess({
  activityName,
  reference,
}: EnquirySuccessProps) {
  return (
    <div className="bg-white p-8 sm:p-12">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-xl text-brand">
        ✓
      </div>

      <div className="mt-6 text-center">
        <p className="text-eyebrow font-medium uppercase tracking-[0.12em] text-brand">
          Enquiry received
        </p>

        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">
          Thanks for your enquiry.
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-neutral-600">
          We've received your enquiry for{" "}
          <span className="font-medium text-neutral-900">
            {activityName}
          </span>
          .
        </p>
      </div>

      {/* Reference */}
      <div className="mx-auto mt-8 max-w-md border border-neutral-200 bg-neutral-50 p-5 text-center">
        <p className="text-xs uppercase tracking-[0.12em] text-neutral-400">
          Your enquiry reference
        </p>

        <p className="mt-2 text-section-title font-semibold tracking-tight text-neutral-900">
          {reference}
        </p>

        <p className="mt-2 text-xs text-neutral-500">
          Keep this reference for future communication.
        </p>
      </div>

      {/* What happens next */}
      <div className="mx-auto mt-10 max-w-2xl text-left">
        <h3 className="text-lg font-semibold text-neutral-900">
          What happens next?
        </h3>

        <div className="mt-5 space-y-5">
          <div className="flex gap-4">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-medium text-white">
              1
            </div>

            <div>
              <p className="text-sm font-medium text-neutral-900">
                We'll check availability
              </p>

              <p className="mt-1 text-sm leading-6 text-neutral-600">
                Our team will check availability for your
                selected date and number of participants.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-medium text-white">
              2
            </div>

            <div>
              <p className="text-sm font-medium text-neutral-900">
                We'll send you a quotation
              </p>

              <p className="mt-1 text-sm leading-6 text-neutral-600">
                Once availability is confirmed, we'll send
                you the final quotation and details of what
                is included.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-medium text-white">
              3
            </div>

            <div>
              <p className="text-sm font-medium text-neutral-900">
                Choose whether to proceed
              </p>

              <p className="mt-1 text-sm leading-6 text-neutral-600">
                If you're happy with the quotation, we'll
                provide the appropriate payment option or
                invoice.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-medium text-white">
              4
            </div>

            <div>
              <p className="text-sm font-medium text-neutral-900">
                Your booking is confirmed
              </p>

              <p className="mt-1 text-sm leading-6 text-neutral-600">
                Your booking is only confirmed once the
                required payment has been received and we
                send you a booking confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment notice */}
      <div className="mx-auto mt-10 max-w-2xl border border-neutral-200 p-5">
        <p className="text-sm font-medium text-neutral-900">
          No payment is required at this stage.
        </p>

        <p className="mt-1 text-sm leading-6 text-neutral-600">
          This enquiry is not a confirmed booking. We'll
          contact you after checking availability.
        </p>
      </div>

      <p className="mt-8 text-center text-xs leading-5 text-neutral-500">
        We've also sent an acknowledgement to your email
        address.
      </p>
    </div>
  );
}