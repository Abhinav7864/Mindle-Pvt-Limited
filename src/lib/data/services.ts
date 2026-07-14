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
    what: "We design and build production AI — from RAG pipelines and domain-restricted assistants to autonomous agents and custom model integrations that are grounded, safe, and fast.",
    process: ["Discovery & data audit", "Prototype & eval harness", "Model + guardrails", "Productionize & monitor"],
    technologies: ["Python", "PyTorch", "LangChain", "OpenAI / Anthropic", "Vector DBs", "Sarvam"],
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
    slug: "full-stack-development",
    name: "Full-Stack Development",
    icon: Layers,
    short: "Robust front-to-back product engineering.",
    what: "We build the whole stack — typed APIs, resilient databases, and polished frontends — with an engineering culture that values tests, reviews, and observability.",
    process: ["Spec & API design", "Frontend + backend", "Testing & QA", "CI/CD & handoff"],
    technologies: ["TypeScript", "Node.js", "React", "GraphQL", "Prisma", "Docker"],
    timeline: "6–14 weeks",
  },
  {
    slug: "web-applications",
    name: "Web Applications",
    icon: Globe,
    short: "Fast, accessible, SEO-ready web apps.",
    what: "Marketing sites and web apps that load instantly, rank well, and convert — built with modern frameworks and a sharp eye for craft.",
    process: ["Design system", "Build & animate", "Performance pass", "Ship & measure"],
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Astro", "Cloudflare"],
    timeline: "3–8 weeks",
  },
  {
    slug: "mobile-apps",
    name: "Mobile Apps",
    icon: Smartphone,
    short: "Native-feeling iOS & Android experiences.",
    what: "From concept to the App Store: performant, delightful mobile apps with offline-first data, haptics, and native integrations — the craft behind GitaConnect.",
    process: ["Product & UX", "Native build", "Beta & TestFlight", "Store launch"],
    technologies: ["Swift", "SwiftUI", "React Native", "Expo", "Supabase"],
    timeline: "8–20 weeks",
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    icon: PenTool,
    short: "Interfaces that feel premium and obvious.",
    what: "Research-led product design: flows, wireframes, high-fidelity UI, prototypes, and design systems that engineering can build directly from.",
    process: ["Research & flows", "Wireframes", "Hi-fi UI", "Design system"],
    technologies: ["Figma", "Framer", "Design tokens", "Prototyping"],
    timeline: "2–6 weeks",
  },
  {
    slug: "automation",
    name: "Automation",
    icon: Cog,
    short: "Workflows and integrations that save hours.",
    what: "We connect your tools and automate the busywork — internal ops, data pipelines, and AI-assisted workflows that quietly compound over time.",
    process: ["Map workflows", "Design automations", "Build & integrate", "Monitor & refine"],
    technologies: ["n8n", "Zapier", "Temporal", "Webhooks", "Python"],
    timeline: "2–6 weeks",
  },
  {
    slug: "cloud-solutions",
    name: "Cloud Solutions",
    icon: Cloud,
    short: "Secure, observable, cost-aware infrastructure.",
    what: "Cloud architecture done right: IaC, CI/CD, observability, and security — infrastructure that scales without surprises on your bill.",
    process: ["Infra audit", "Architecture", "IaC & pipelines", "Observability"],
    technologies: ["AWS", "Vercel", "Terraform", "Docker", "GitHub Actions"],
    timeline: "3–8 weeks",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
