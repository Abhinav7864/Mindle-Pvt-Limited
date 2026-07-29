import { products } from "@/lib/data/products";
import { services } from "@/lib/data/services";

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export const mainNav: NavLink[] = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
];

/** Mega-menu columns for Products. */
export const productMenu = products.map((p) => ({
  label: p.name,
  href: `/products/${p.slug}`,
  description: p.tagline,
  status: p.status,
}));

/** Mega-menu columns for Services (first 6 for the menu). */
export const serviceMenu = services.map((s) => ({
  label: s.name,
  href: `/services#${s.slug}`,
  description: s.short,
}));

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Products",
    links: [
      ...products.map((p) => ({
        label: p.name,
        href: `/products/${p.slug}`,
      })),
      { label: "All products", href: "/products" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "AI Development", href: "/services#ai-development" },
      { label: "SaaS Development", href: "/services#saas-development" },
      { label: "Mobile Apps", href: "/services#mobile-apps" },
      { label: "UI/UX Design", href: "/services#ui-ux-design" },
      { label: "All services", href: "/services" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];
