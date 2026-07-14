# Mindle Website — Implementation Plan

## Goal
Build the official website for **Mindle**, a product-first AI/software startup, matching the quality of Stripe / Linear / Vercel / Notion. **GitaConnect** is the flagship product (real data from the patent draft). Mindle's services are shown as secondary.

## Tech Stack (per brief)
- **Next.js 15** (App Router) + **React** + **TypeScript**
- **Tailwind CSS** + **Framer Motion** (animations) + **Lucide** (icons)
- **shadcn/ui-style** components, hand-built (cva + tailwind-merge) to avoid interactive CLI prompts
- **next-themes** for dark mode
- Radix primitives for accordion / tabs / dialog (accessibility)

## Design System
- Fonts: **Inter** (body) + **Geist/Manrope** (display) via `next/font`
- Colors: white bg, near-black text (#111827), **electric blue** accent, **purple** secondary, green/orange states, neutral grays. Full dark-mode palette.
- 8-pt spacing, 12–20px radius, 12-col grid, 1280–1440 container, generous whitespace
- Components: Button, Card, Badge, Chip, Accordion, Tabs, Modal, Stat/AnimatedCounter, Newsletter form, Code block, Testimonial, Pricing card, Timeline, Mega Menu

## Site Structure (pages)
- `/` **Home** — hero (animated gradient/futuristic), product spotlight (GitaConnect), product grid, services strip, metrics counters, personas, testimonials, final CTA
- `/products` — premium product cards (Logo, name, description, status: Live/Beta/Coming Soon)
- `/products/[slug]` — dynamic product pages; **GitaConnect fully built** (hero, 7 features, screenshots placeholders, FAQ, CTA) + 2–3 "Coming Soon" products to show vision
- `/services` — AI Dev, SaaS, Full-Stack, Web, Mobile, UI/UX, Automation, Cloud (what/process/tech/timeline/CTA)
- `/case-studies` — GitaConnect case study (problem/solution/tech/results)
- `/about` — mission, vision, values, journey timeline, **real team (6 members)**, why Mindle
- `/careers` — open positions, culture, benefits, hiring process
- `/blog` — post grid with categories (AI, Design, Dev, Startup, Product, Engineering)
- `/contact` — form, email, social, CTA
- SEO: metadata + Open Graph + Twitter cards, `sitemap.ts`, `robots.ts`, semantic HTML

## Layout
- Sticky **Navbar** with mega menu (Products/Services), primary CTA, theme toggle
- Animated **Mobile nav** (slide-in)
- **Footer**: quick links, products, services, resources, company, newsletter, social, legal

## Data (editable files in `/lib/data`)
- `products.ts` — GitaConnect (real) + placeholders (all easy to edit)
- `services.ts`, `team.ts`, `caseStudies.ts`, `blog.ts`, `careers.ts`, `nav.ts`

## Build order
1. Scaffold Next.js (non-interactive) + install deps
2. Design system: Tailwind config, fonts, theme provider, globals, dark mode
3. UI primitives (shadcn-style)
4. Navbar + mega menu + mobile nav + footer
5. Data files
6. Home page sections
7. Products list + GitaConnect product page (+ placeholders)
8. Services, Case Studies, About (real team), Careers, Blog, Contact
9. SEO (metadata, sitemap, robots, OG)
10. `npm run build` to verify it compiles; start dev server

## Notes / defaults I'm assuming (tell me to change any)
- GitaConnect status = **Beta** (patent-pending, iOS). Adjustable in one line.
- 2–3 placeholder "Coming Soon" products to sell the product-first vision.
- Placeholder screenshots (styled mockups) since no image assets provided.
- Project created directly in `E:\Mindle Pvt Limited`.
