type PriceSummaryProps = {
  adults: number;
  children: number;
  adultPrice: number;
  childPrice: number;
  currency: string;
};

export default function PriceSummary({
  adults,
  children,
  adultPrice,
  childPrice,
  currency,
}: PriceSummaryProps) {
  const adultTotal = adults * adultPrice;
  const childTotal = children * childPrice;
  const total = adultTotal + childTotal;

  return (
    <div className="mt-6 border-neutral-200 pt-5">
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">
            Adults × {adults}
          </span>

          <span className="text-neutral-900">
            {currency} {adultTotal}
          </span>
        </div>

        {children > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-neutral-500">
              Children × {children}
            </span>

            <span className="text-neutral-900">
              {currency} {childTotal}
            </span>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-neutral-200 pt-5">
        <span className="text-sm font-medium text-neutral-900">
          Estimated total
        </span>

        <span className="text-xl font-semibold text-neutral-900">
          {currency} {total}
        </span>
      </div>
    </div>
  );
}