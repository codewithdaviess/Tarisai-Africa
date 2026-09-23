# Travel Asambe Africa Application

Travel Asambe Africa is an African travel planning application focused on Victoria Falls experiences and trip enquiries.

## Main Product Types

- Activities
- Specials and packages
- Accommodation
- Transfers

Overview cards help users browse products. Booking details and cart actions are available on product detail pages.

## Trip Flow

1. User opens a product detail page.
2. User enters the required booking details.
3. User adds the product to My Trip.
4. The floating My Trip button opens the cart modal.
5. User reviews or removes items.
6. User selects **Continue to enquiry**.
7. User enters contact details and submits the trip enquiry.

## Product Details

- Activities: date, adults, and children
- Specials: date, adults, and children
- Accommodation: check-in, check-out, and guests
- Transfers: transfer date and passengers

These details are stored with each cart item and sent with the enquiry.

## Cart

- Cart state is stored in `localStorage`.
- Duplicate products are prevented by product type and slug.
- Existing products can be updated when their booking details change.
- The cart is a modal, not a separate page.
- The floating cart button is aligned with the main content container on large screens.

## Enquiries

Bulk enquiries collect only:

- First name
- Last name
- Email
- Phone
- Country (optional)
- Message (optional)

Dates and traveller numbers come from the selected cart items, so users do not enter the same information twice.

The enquiry API validates each item, saves the trip enquiry, stores item details, and sends notification and confirmation emails.

## Main Locations

- Product data: `data/`
- Product pages: `app/activities`, `app/specials`, `app/accommodation`, `app/transfers`
- Cart state: `components/trip/TripProvider.tsx`
- Cart modal: `components/trip/TripFloatingButton.tsx`
- Product add button: `components/trip/AddToTripButton.tsx`
- Enquiry form: `components/enquiry/TripEnquiryForm.tsx`
- Enquiry API: `app/api/enquiries/route.ts`
- Trip enquiry service: `lib/enquiry/submitTripEnquiry.ts`

## Run Locally

From the `spotter` directory:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Useful checks:

```bash
npm run lint
npm run build
```
