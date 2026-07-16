export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  gradient: [string, string];
  image?: string;
}

/**
 * Co-founders of Mindle.
 */
export const team: TeamMember[] = [
  {
    name: "Abhinav Kumar",
    role: "Co-Founder",
    bio: "Full-stack engineer shipping product surfaces end to end, from mobile to cloud.",
    initials: "AK",
    gradient: ["#16a34a", "#06b6d4"],
    image: "/Abhinav.JPG",
  },
  {
    name: "Omkar Pujeri",
    role: "Co-Founder",
    bio: "Owns architecture and engineering — from offline-first data layers to AI inference pipelines.",
    initials: "OP",
    gradient: ["#06b6d4", "#2563eb"],
    image: "/Omkar.jpg",
  },
  {
    name: "Aryan Dev",
    role: "Co-Founder",
    bio: "Builds Mindle's AI systems, including GitaConnect's domain-locked multilingual mentor.",
    initials: "AD",
    gradient: ["#7c3aed", "#ec4899"],
    image: "/Aryan.png",
  },
  {
    name: "Abhijit Balpande",
    role: "Co-Founder",
    bio: "Bridges design and engineering to turn ideas into polished, shippable features.",
    initials: "AB",
    gradient: ["#f59e0b", "#2563eb"],
    image: "/Abhjit.jpeg",
  },
];
