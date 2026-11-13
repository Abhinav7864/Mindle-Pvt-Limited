import type { LucideIcon } from "lucide-react";
import {
  BrainCircuit,
  Boxes,
  Layers,
  Globe,
  Smartphone,
  PenTool,
  Cog,
  Cloud,
} from "lucide-react";

export interface Service {
  slug: string;
  name: string;
  icon: LucideIcon;
  short: string;
  what: string;
  process: string[];
  technologies: string[];
  timeline: string;
}

export const services: Service[] = [
  {
    slug: "ai-development",
    name: "AI Development",
    icon: BrainCircuit,
    short: "LLM apps, agents, and ML systems built to ship.",
    what: "We design and build production AI from RAG pipelines and domain-restricted assistants to autonomous agents and custom model integrations that are grounded, safe, and fast.",
    process: ["Discovery & data audit", "Prototype & eval harness", "Model + guardrails", "Productionize & monitor"],
    technologies: ["Python", "PyTorch", "LangChain", "OpenAI / Anthropic", "Vector DBs", "Llama / DeepSeek"],
    timeline: "4–10 weeks",
  },
  {
    slug: "saas-development",
    name: "SaaS Development",
    icon: Boxes,
    short: "Multi-tenant platforms with billing, auth, and scale.",
    what: "End-to-end SaaS: multi-tenant architecture, subscriptions, role-based access, dashboards, and the infrastructure to grow from first customer to scale.",
    process: ["Architecture & schema", "Core platform build", "Billing & auth", "Launch & iterate"],
    technologies: ["Next.js", "PostgreSQL", "Stripe", "Supabase", "Redis", "Vercel"],
    timeline: "8–16 weeks",
  },
  {
    slug: "web-applications",
    name: "Web Applications",
    icon: Globe,
    short: "Fast, accessible, full-stack web applications.",
    what: "Modern, high-performance web applications and platforms built with full-stack TypeScript, typed APIs, resilient databases, and instant page transitions.",
    process: ["Spec & schema design", "Full-stack build", "Testing & QA", "Ship & scale"],
    technologies: ["Next.js", "TypeScript", "React", "Node.js", "Tailwind CSS", "PostgreSQL"],
    timeline: "4–10 weeks",
  },
  {
    slug: "mobile-apps",
    name: "Mobile Apps",
    icon: Smartphone,
    short: "Native-feeling iOS & Android experiences.",
    what: "From concept to the App Store: performant, delightful mobile apps with offline-first data, haptics, and native integrations—the craft behind GitaConnect.",
    process: ["Product & UX", "Native build", "Beta & TestFlight", "Store launch"],
    technologies: ["Swift", "SwiftUI", "React Native", "Expo", "Supabase"],
    timeline: "8–20 weeks",
  },
  {
    slug: "automation",
    name: "Automation",
    icon: Cog,
    short: "Workflows and integrations that save hours.",
    what: "We connect your tools and automate the busywork: internal ops, data pipelines, and AI-assisted workflows that quietly compound over time.",
    process: ["Map workflows", "Design automations", "Build & integrate", "Monitor & refine"],
    technologies: ["n8n", "Zapier", "Temporal", "Webhooks", "Python"],
    timeline: "2–6 weeks",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
