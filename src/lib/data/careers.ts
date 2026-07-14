import type { LucideIcon } from "lucide-react";
import { Sparkles, Heart, GraduationCap, Globe2, Coffee, Zap } from "lucide-react";

export interface JobOpening {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export const openings: JobOpening[] = [
  {
    slug: "senior-ai-engineer",
    title: "Senior AI Engineer",
    department: "Engineering",
    location: "Pune / Remote",
    type: "Full-time",
    description:
      "Build grounded, production AI — RAG pipelines, agents, and domain-restricted assistants — across Mindle's product portfolio.",
  },
  {
    slug: "ios-engineer",
    title: "iOS Engineer (Swift / SwiftUI)",
    department: "Engineering",
    location: "Pune / Remote",
    type: "Full-time",
    description:
      "Craft delightful, offline-first mobile experiences with native haptics and animations — starting with GitaConnect.",
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description:
      "Own flows, high-fidelity UI, and our design system across web and mobile products.",
  },
  {
    slug: "fullstack-engineer",
    title: "Full-Stack Engineer",
    department: "Engineering",
    location: "Pune / Remote",
    type: "Full-time",
    description:
      "Ship end to end with TypeScript, Next.js, and Postgres — from typed APIs to polished frontends.",
  },
  {
    slug: "founding-gtm",
    title: "Founding GTM & Growth",
    department: "Growth",
    location: "Remote",
    type: "Full-time",
    description:
      "Take Mindle's products to market — positioning, launches, and building the early growth engine.",
  },
];

export const benefits: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Globe2, title: "Remote-first", description: "Work from anywhere with flexible hours and async-friendly culture." },
  { icon: Zap, title: "Real ownership", description: "Small team, big scope — your work ships and matters." },
  { icon: GraduationCap, title: "Learning budget", description: "Annual budget for courses, books, and conferences." },
  { icon: Heart, title: "Health & wellness", description: "Coverage plus wellness stipends — we practice what GitaConnect preaches." },
  { icon: Sparkles, title: "Latest tools", description: "Best-in-class hardware, software, and AI tooling." },
  { icon: Coffee, title: "Meaningful work", description: "Build products used by real people, grounded in real purpose." },
];

export const hiringProcess: { step: string; title: string; description: string }[] = [
  { step: "01", title: "Intro call", description: "A relaxed conversation about you, us, and what you want to build." },
  { step: "02", title: "Craft interview", description: "A practical, paid take-home or live session focused on real work — no trick questions." },
  { step: "03", title: "Team meet", description: "Meet the people you'll work with and dig into how we operate." },
  { step: "04", title: "Offer", description: "Fast, transparent decisions — usually within a week." },
];

export const culture = [
  "Bias toward shipping",
  "High trust, low process",
  "Craft over quantity",
  "Grounded, honest AI",
  "Products we're proud to own",
];
