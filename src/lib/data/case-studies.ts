export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  category: string;
  gradient: [string, string];
  summary: string;
  problem: string;
  solution: string;
  technologies: string[];
  results: { label: string; value: string }[];
  screenshots: { title: string; caption: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "gitaconnect",
    title: "GitaConnect: an AI spiritual companion, grounded in scripture",
    client: "Mindle (in-house product)",
    category: "AI · Mobile",
    gradient: ["#f59e0b", "#7c3aed"],
    summary:
      "Turning 700 Sanskrit verses into a personal, measurable daily practice with a domain-locked AI mentor — patent-pending across seven subsystems.",
    problem:
      "Meaningful engagement with the Bhagavad Gita is blocked by language barriers, the need for a teacher, and static, book-like apps that assume you already know which verse to read. No app connected a person's emotional state to the right scripture, or made practice measurable and habit-forming.",
    solution:
      "We built an integrated, offline-first iOS app around seven subsystems: a language-locked, anti-hallucination AI mentor (Sarvam-30B), mood-driven verse recommendations, a reel-based spiritual feed, a gamified challenges engine, a 140-mantra library with a haptic Jaap counter, verse-context chat, and 90-day analytics — all validated against a device-resident 700-verse datastore.",
    technologies: ["Swift", "SwiftUI", "UIKit", "Sarvam-30B", "Supabase", "Core Graphics", "UserDefaults"],
    results: [
      { label: "Verses digitized", value: "700" },
      { label: "Languages", value: "11" },
      { label: "Mantras", value: "140" },
      { label: "Patent subsystems", value: "7" },
    ],
    screenshots: [
      { title: "AI mentor", caption: "Verse-context, language-locked chat." },
      { title: "Mood → verse", caption: "Animated pleasantness slider." },
      { title: "Jaap counter", caption: "Haptic biofeedback per repetition." },
    ],
  },
  {
    slug: "northwind-ai-search",
    title: "Northwind: cutting support volume 40% with grounded AI search",
    client: "Northwind (B2B SaaS)",
    category: "AI · SaaS",
    gradient: ["#2563eb", "#06b6d4"],
    summary:
      "A retrieval-augmented answer engine that reads Northwind's docs and resolves customer questions with cited sources.",
    problem:
      "Northwind's support team was overwhelmed by repetitive questions already answered in their documentation, while customers struggled to find answers through traditional keyword search.",
    solution:
      "We built a RAG pipeline with a grounded answer engine and citation UI, embedded across their help center and in-app. Guardrails ensured answers were traceable to source documents, with graceful escalation to human agents.",
    technologies: ["Next.js", "Python", "Vector DB", "OpenAI", "PostgreSQL"],
    results: [
      { label: "Support tickets", value: "-40%" },
      { label: "Time to answer", value: "-72%" },
      { label: "Deflection rate", value: "61%" },
      { label: "CSAT", value: "+18pts" },
    ],
    screenshots: [
      { title: "Answer engine", caption: "Cited, grounded responses in the help center." },
      { title: "Analytics", caption: "Deflection and satisfaction over time." },
    ],
  },
  {
    slug: "vertex-platform",
    title: "Vertex: from prototype to scalable multi-tenant SaaS",
    client: "Vertex (early-stage startup)",
    category: "SaaS · Cloud",
    gradient: ["#7c3aed", "#ec4899"],
    summary:
      "Rebuilding a fragile MVP into a production-grade, multi-tenant platform ready for its first enterprise customers.",
    problem:
      "Vertex had product-market fit but an MVP that couldn't scale — no multi-tenancy, brittle auth, and no billing. Enterprise deals were stalling on security and reliability concerns.",
    solution:
      "We re-architected the platform around clean multi-tenant boundaries, role-based access, Stripe billing, and an observable, CI/CD-driven cloud setup — without pausing feature delivery.",
    technologies: ["Next.js", "PostgreSQL", "Stripe", "Terraform", "AWS", "GitHub Actions"],
    results: [
      { label: "Uptime", value: "99.9%" },
      { label: "Enterprise deals", value: "+3" },
      { label: "Deploy frequency", value: "10x" },
      { label: "Onboarding time", value: "-65%" },
    ],
    screenshots: [
      { title: "Admin console", caption: "Multi-tenant management and roles." },
      { title: "Billing", caption: "Self-serve subscriptions with Stripe." },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
