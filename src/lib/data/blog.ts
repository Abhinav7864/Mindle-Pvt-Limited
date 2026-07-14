export type BlogCategory =
  | "AI"
  | "Design"
  | "Development"
  | "Startup"
  | "Product"
  | "Engineering";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: string;
  date: string; // ISO
  readingTime: string;
  gradient: [string, string];
  featured?: boolean;
}

export const blogCategories: BlogCategory[] = [
  "AI",
  "Design",
  "Development",
  "Startup",
  "Product",
  "Engineering",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "building-anti-hallucination-ai",
    title: "How we built an anti-hallucination AI mentor for GitaConnect",
    excerpt:
      "Domain-locking an LLM to a single canonical text — and validating every citation against a device-resident datastore.",
    category: "AI",
    author: "Aryan Dev",
    date: "2026-05-18",
    readingTime: "8 min",
    gradient: ["#2563eb", "#7c3aed"],
    featured: true,
  },
  {
    slug: "offline-first-mobile-architecture",
    title: "Offline-first, done right: our hybrid persistence pattern",
    excerpt:
      "Write local first, sync to the cloud with a retry-safe scheduler — so users never lose a single tap.",
    category: "Engineering",
    author: "Omkar Pujeri",
    date: "2026-04-30",
    readingTime: "7 min",
    gradient: ["#06b6d4", "#2563eb"],
  },
  {
    slug: "designing-haptic-feedback",
    title: "Designing haptics that feel sacred, not gimmicky",
    excerpt:
      "The three-tier haptic system behind the Digital Jaap counter, and why restraint matters.",
    category: "Design",
    author: "Abhijit Balpande",
    date: "2026-04-12",
    readingTime: "5 min",
    gradient: ["#f59e0b", "#ec4899"],
  },
  {
    slug: "product-first-company",
    title: "Why we're a product-first company (that still does services)",
    excerpt:
      "Services fund the mission. Products are the mission. How we balance both without losing focus.",
    category: "Startup",
    author: "Kamakshi Goyal",
    date: "2026-03-28",
    readingTime: "6 min",
    gradient: ["#7c3aed", "#ec4899"],
  },
  {
    slug: "mood-to-verse-mapping",
    title: "Mapping emotion to scripture: the mood-verse engine",
    excerpt:
      "An animated pleasantness slider, a JSON mapping table, and a one-per-day guarantee.",
    category: "Product",
    author: "Aryan Dev",
    date: "2026-03-10",
    readingTime: "6 min",
    gradient: ["#16a34a", "#06b6d4"],
  },
  {
    slug: "shipping-fast-with-nextjs",
    title: "Shipping premium marketing sites fast with Next.js & Tailwind",
    excerpt:
      "The stack and patterns we reuse to build sites that load instantly and feel expensive.",
    category: "Development",
    author: "Abhinav Kumar",
    date: "2026-02-22",
    readingTime: "5 min",
    gradient: ["#2563eb", "#06b6d4"],
  },
];
