import type { LucideIcon } from "lucide-react";
import {
  Compass,
  Rocket,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Users,
  Code2,
  TrendingUp,
} from "lucide-react";

export const companyStats = [
  { label: "Products in flight", value: 4, suffix: "" },
  { label: "Patent filings", value: 1, suffix: "" },
  { label: "Languages supported", value: 11, suffix: "" },
  { label: "Founded", value: 2024, prefix: "" },
];

export const values: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Rocket, title: "Products over projects", description: "We build things we own and love — services fund the mission, products are the mission." },
  { icon: ShieldCheck, title: "Trust by design", description: "Grounded AI, privacy-first data, and honest engineering. No hallucinations, no dark patterns." },
  { icon: Sparkles, title: "Craft in the details", description: "Micro-interactions, haptics, and typography — the small things are the product." },
  { icon: HeartHandshake, title: "Human-centered AI", description: "Technology should meet people where they are, emotionally and culturally." },
  { icon: Users, title: "Small team, high trust", description: "Tight feedback loops, real ownership, and a bias toward shipping." },
  { icon: TrendingUp, title: "Built for the long game", description: "We optimize for durable products, not short-term wins." },
];

export const mission = {
  mission:
    "To build intelligent software products that make powerful technology feel human, useful, and effortless.",
  vision:
    "To become a product-first company that owns a portfolio of successful SaaS platforms, mobile apps, AI tools, and developer products used around the world.",
  why:
    "Great companies are defined by what they build, not what they bill. Services keep the lights on — but Mindle exists to create products that outlast any single engagement. GitaConnect is the first of many.",
};

export const timeline: { year: string; title: string; description: string; icon: LucideIcon }[] = [
  { year: "2024", title: "Mindle is founded", description: "A product-first AI studio is born with a clear thesis: own the products, don't just build them.", icon: Compass },
  { year: "2024", title: "Services engine online", description: "AI, SaaS, and design engagements begin funding the product roadmap.", icon: Code2 },
  { year: "2025", title: "GitaConnect enters beta", description: "Our flagship AI spiritual companion ships to iOS beta — patent-pending across seven subsystems.", icon: Sparkles },
  { year: "2026", title: "The product portfolio grows", description: "Nova, Pulse, and Loop move from concept toward launch as Mindle scales.", icon: Rocket },
];

export const personas: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Rocket, title: "Founders", description: "Turn an idea into a shippable product with a team that thinks like owners." },
  { icon: Code2, title: "Developers", description: "AI tools and APIs designed to slot into your workflow, not fight it." },
  { icon: Users, title: "Product teams", description: "Design + engineering muscle to move from roadmap to release faster." },
  { icon: TrendingUp, title: "Investors", description: "A product-first company building durable, defensible IP." },
];

export const testimonials: { quote: string; name: string; title: string; initials: string }[] = [
  { quote: "Mindle shipped our AI feature in weeks, not quarters — and it actually works in production.", name: "Ananya R.", title: "Founder, early-stage SaaS", initials: "AR" },
  { quote: "The craft is on another level. It feels like a Linear or Stripe product, but it's ours.", name: "Daniel M.", title: "Head of Product", initials: "DM" },
  { quote: "They think about trust and edge cases the way we wish every vendor did.", name: "Priya S.", title: "Engineering Lead", initials: "PS" },
  { quote: "GitaConnect is genuinely delightful — the haptics and the mentor feel magical.", name: "Rohan K.", title: "Beta user", initials: "RK" },
];

export const logos = [
  "Northwind",
  "Lumen Labs",
  "Vertex",
  "Basecraft",
  "Halcyon",
  "Meridian",
  "Cobalt",
];
