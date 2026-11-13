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
      "Turning 700 Sanskrit verses into a personal, measurable daily practice with a domain-locked AI mentor patent-pending across seven subsystems.",
    problem:
      "Meaningful engagement with the Bhagavad Gita is blocked by language barriers, the need for a teacher, and static, book-like apps that assume you already know which verse to read. No app connected a person's emotional state to the right scripture, or made practice measurable and habit-forming.",
    solution:
      "We built an integrated, offline first iOS app around seven subsystems: a language-locked, anti-hallucination AI mentor, mood-driven verse recommendations, a reel-based spiritual feed, a gamified challenges engine, a 140-mantra library with a haptic Jaap counter, verse-context chat, and 90-day analytics all validated against a device-resident 700-verse datastore.",
    technologies: ["Swift", "SwiftUI", "UIKit", "Domain-Locked LLMs", "Supabase", "Core Graphics", "UserDefaults"],
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
    slug: "panchatantra-ai",
    title: "Panchatantra AI: Adaptive Indian Knowledge Systems for the Next Generation",
    client: "Mindle Labs (EdTech Initiative)",
    category: "AI · EdTech · Kids",
    gradient: ["#10b981", "#3b82f6"],
    summary:
      "Transforming 50+ classical Indian fables into an interactive, AI-narrated learning platform with age-adaptive reasoning, character dialogs, and educator dashboards.",
    problem:
      "Children spend excessive time on passive screen consumption, losing touch with foundational cultural and moral literature. Classical Panchatantra texts are traditionally presented as static, adult-oriented prose that fails to capture modern kids' attention or provoke moral reasoning.",
    solution:
      "We engineered a full-stack educational AI platform featuring dual-tier language adaptation (Ages 4–8 & 9–14), authentic RAG-based story retrieval, an interactive moral dilemma simulator ('What Would You Do?'), audio-synced reading, and COPPA-compliant educator analytics for institutions.",
    technologies: ["Next.js", "Python", "RAG Pipelines", "Lottie", "Supabase", "React Native", "Vector DB"],
    results: [
      { label: "Stories digitized", value: "50" },
      { label: "Age tiers", value: "2" },
      { label: "Child safety", value: "100" },
      { label: "Languages", value: "11" },
    ],
    screenshots: [
      { title: "Story map", caption: "Interactive journey through Panchatantra fables." },
      { title: "Moral reasoning", caption: "Interactive dilemma decisions with AI tutor feedback." },
      { title: "Voice narration", caption: "Multi-sensory karaoke-style audio storytelling." },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
