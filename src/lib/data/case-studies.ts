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
      "We built an integrated, offline first iOS app around seven subsystems: a language-locked, anti-hallucination AI mentor (Sarvam-30B), mood-driven verse recommendations, a reel-based spiritual feed, a gamified challenges engine, a 140-mantra library with a haptic Jaap counter, verse-context chat, and 90-day analytics all validated against a device-resident 700-verse datastore.",
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
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
