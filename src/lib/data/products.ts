import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  HeartPulse,
  Clapperboard,
  Trophy,
  Music4,
  MessagesSquare,
  BarChart3,
  CloudOff,
  Languages,
} from "lucide-react";

export type ProductStatus = "live" | "beta" | "coming-soon";

export interface ProductFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProductFAQ {
  q: string;
  a: string;
}

export interface ProductStat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface ProductScreenshot {
  title: string;
  caption: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  platform: string;
  status: ProductStatus;
  featured: boolean;
  gradient: [string, string];
  short: string;
  description: string;
  hero: { headline: string; subhead: string };
  highlights: string[];
  features: ProductFeature[];
  stats?: ProductStat[];
  screenshots: ProductScreenshot[];
  faq: ProductFAQ[];
  cta: { label: string; href: string };
}

export const products: Product[] = [
  {
    slug: "gitaconnect",
    name: "GitaConnect",
    tagline: "AI-powered spiritual companion for the Bhagavad Gita",
    category: "AI · Wellness",
    platform: "iOS",
    status: "beta",
    featured: true,
    gradient: ["#f59e0b", "#7c3aed"],
    short:
      "An integrated mobile app for systematic Gita study, daily practice, and AI-guided spiritual mentorship in 11 Indian languages.",
    description:
      "GitaConnect turns 700 Sanskrit verses into a living, personal practice. A domain-locked AI mentor, mood-driven verse recommendations, a scrollable spiritual feed, gamified challenges, a 140-mantra library with a digital Jaap counter, and 90-day analytics come together in one offline-first platform.",
    hero: {
      headline: "Meet the Gita where you are — emotionally, daily, in your language.",
      subhead:
        "GitaConnect combines a domain-restricted AI mentor, mood-based verse guidance, gamified practice, and spiritual analytics into one beautifully cohesive app grounded entirely in the Bhagavad Gita.",
    },
    highlights: [
      "700-verse device-resident scripture datastore",
      "11 Indian languages with strict language-lock",
      "Anti-hallucination AI verified against scripture",
      "Offline-first — nothing is ever lost",
    ],
    features: [
      {
        icon: Sparkles,
        title: "AI Spiritual Mentor",
        description:
          "Powered by the Sarvam-30B model and a multi-rule prompt framework enforcing language-lock, tone calibration, anti-hallucination, and verse validation against a device-resident datastore.",
      },
      {
        icon: HeartPulse,
        title: "Mood-Based Verse Recommendation",
        description:
          "A three-step emotional check-in with an animated pleasantness slider maps how you feel to the most relevant Gita verse for the day — saved locally and to the cloud.",
      },
      {
        icon: Clapperboard,
        title: "Spiritual Feed",
        description:
          "A vertically scrollable reel stream of studio-crafted videos, each tied to a chapter and verse, with like, share, and an “i” button that opens structured teachings.",
      },
      {
        icon: Trophy,
        title: "Gamified Challenges Engine",
        description:
          "Daily, weekly, and milestone challenges with real-time progress, streak tracking, a Spiritual Level score, and an achievement badge gallery to keep practice consistent.",
      },
      {
        icon: Music4,
        title: "Mantra Library & Digital Jaap Counter",
        description:
          "140 mantras surfaced by day-of-week deity mapping, a music-player-style playback system, and a tap-driven Jaap counter with light-per-rep and heavy-on-mala haptic feedback.",
      },
      {
        icon: MessagesSquare,
        title: "Verse-Context Conversational AI",
        description:
          "Open a chat pre-seeded with the exact chapter and verse you're reading — the mentor addresses that teaching directly, no typing the reference required.",
      },
      {
        icon: BarChart3,
        title: "90-Day Spiritual Analytics",
        description:
          "Time-series dashboards for mood, reading, mantra listening, Jaap counts, and challenges across 7-, 30-, and 90-day windows.",
      },
      {
        icon: Languages,
        title: "Eleven Indian Languages",
        description:
          "English, Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi, Gujarati, Bengali, Punjabi, and Odia — the mentor replies in your chosen tongue every time.",
      },
      {
        icon: CloudOff,
        title: "Offline-First Architecture",
        description:
          "Every action writes to on-device storage instantly and syncs to the cloud via a retry-safe scheduler — full functionality with or without a connection.",
      },
    ],
    stats: [
      { label: "Sanskrit verses", value: 700 },
      { label: "Curated mantras", value: 140 },
      { label: "Indian languages", value: 11 },
      { label: "Analytics window", value: 90, suffix: "-day" },
    ],
    screenshots: [
      { title: "Home & Mantra Library", caption: "Day-based deity mantras with the digital Jaap counter." },
      { title: "AI Spiritual Mentor", caption: "Verse-context chat, language-locked and anti-hallucination." },
      { title: "Mood → Verse", caption: "Animated pleasantness slider maps feeling to scripture." },
      { title: "Spiritual Analytics", caption: "90-day mood, reading, and Jaap trends." },
    ],
    faq: [
      {
        q: "Which languages does the AI mentor support?",
        a: "Eleven Indian languages — English, Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi, Gujarati, Bengali, Punjabi, and Odia. A language-lock constraint ensures the mentor always replies in your chosen language, regardless of input language.",
      },
      {
        q: "How does GitaConnect avoid AI hallucinations?",
        a: "The mentor is restricted to the Bhagavad Gita domain. Every verse it cites is extracted with pattern matching and validated against a device-resident 700-verse datastore before it is ever shown to you.",
      },
      {
        q: "Does it work offline?",
        a: "Yes. GitaConnect is offline-first: all activity is written to on-device storage immediately and synced to the cloud asynchronously through a retry-safe scheduler, so nothing is lost during connectivity gaps.",
      },
      {
        q: "What is the Digital Jaap counter?",
        a: "A full-screen tap counter for mantra repetition. Each tap gives a light haptic pulse; completing a full mala (default 108) triggers a heavier pulse — so you can practise without looking at the screen.",
      },
      {
        q: "Is GitaConnect available now?",
        a: "GitaConnect is currently in Beta on iOS and patent-pending. Join the waitlist to get early access and updates.",
      },
    ],
    cta: { label: "Join the GitaConnect beta", href: "/contact?product=gitaconnect" },
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const featuredProduct = products.find((p) => p.featured) ?? products[0];

/** Serializable subset safe to pass from Server to Client Components. */
export type ProductCardData = Pick<
  Product,
  "slug" | "name" | "tagline" | "short" | "status" | "category" | "platform" | "gradient"
>;

export function toCardData(p: Product): ProductCardData {
  const { slug, name, tagline, short, status, category, platform, gradient } = p;
  return { slug, name, tagline, short, status, category, platform, gradient };
}
