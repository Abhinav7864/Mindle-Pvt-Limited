export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  gradient: [string, string];
}

/**
 * Team seeded from the GitaConnect inventor list. Roles are placeholders —
 * edit freely to match real titles.
 */
export const team: TeamMember[] = [
  {
    name: "Kamakshi Goyal",
    role: "Founder & CEO",
    bio: "Sets Mindle's product-first vision and leads the company toward owning a portfolio of AI products.",
    initials: "KG",
    gradient: ["#2563eb", "#7c3aed"],
  },
  {
    name: "Dr. Murtuza Dholkawala",
    role: "Chief Mentor & Advisor",
    bio: "Guides research direction and academic rigour across Mindle's AI initiatives.",
    initials: "MD",
    gradient: ["#f59e0b", "#ec4899"],
  },
  {
    name: "Omkar Pujeri",
    role: "Co-founder & CTO",
    bio: "Owns architecture and engineering — from offline-first data layers to AI inference pipelines.",
    initials: "OP",
    gradient: ["#06b6d4", "#2563eb"],
  },
  {
    name: "Aryan Dev",
    role: "Co-founder & Head of AI",
    bio: "Builds Mindle's AI systems, including GitaConnect's domain-locked multilingual mentor.",
    initials: "AD",
    gradient: ["#7c3aed", "#ec4899"],
  },
  {
    name: "Abhinav Kumar",
    role: "Founding Engineer",
    bio: "Full-stack engineer shipping product surfaces end to end, from mobile to cloud.",
    initials: "AK",
    gradient: ["#16a34a", "#06b6d4"],
  },
  {
    name: "Abhijit Balpande",
    role: "Founding Engineer, Product",
    bio: "Bridges design and engineering to turn ideas into polished, shippable features.",
    initials: "AB",
    gradient: ["#f59e0b", "#2563eb"],
  },
];
