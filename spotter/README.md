This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Application Documentation

See [docs/application-overview.md](docs/application-overview.md) for the current product flow, cart behavior, enquiry process, and project locations.

## Production launch checklist

1. Copy `.env.example` to `.env.local` for local work and configure the same
	variables in the production host. Never commit `.env.local` or server keys.
2. Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS domain. The generated
	`/robots.txt` and `/sitemap.xml` use this value.
3. Configure Supabase tables and Row Level Security for `enquiries` and
	`reviews`. Keep the service-role key server-only and review pending entries
	before publishing them.
4. Configure Resend and `ENQUIRY_NOTIFICATION_EMAIL` before enabling enquiry
	submissions. The API validates and rate-limits public submissions.
5. Verify `/robots.txt`, `/sitemap.xml`, page metadata, canonical redirects and
	Search Console ownership after deployment. SEO ranking cannot be guaranteed;
	useful content, accurate internal links and real search performance still
	determine results.

## Learn More

To learn more about Next.js, take a look at the following resources:


You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
