import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MapPin, Clock } from "lucide-react";
import {
  XIcon,
  LinkedInIcon,
  GitHubIcon,
  InstagramIcon,
} from "@/components/ui/social-icons";
import { PageHeader } from "@/components/sections/page-header";
import { ContactForm } from "@/components/sections/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Mindle — product inquiries, services, and partnerships.",
};

const socials = [
  { icon: XIcon, href: siteConfig.social.twitter, label: "X (Twitter)" },
  { icon: LinkedInIcon, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: GitHubIcon, href: siteConfig.social.github, label: "GitHub" },
  { icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s <span className="text-gradient">talk</span>
          </>
        }
        description="Product questions, project ideas, partnerships — we read everything and reply fast."
      />

      <section className="py-20 md:py-24">
        <div className="mx-auto grid w-full max-w-[1280px] gap-8 px-6 md:px-8 lg:grid-cols-[1fr_1.35fr]">
          {/* Info column */}
          <Reveal>
            <div className="flex h-full flex-col gap-4">
              <div className="rounded-3xl border border-border bg-card p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
                  <Mail className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-display text-base font-bold">Email us</h2>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-1 inline-block text-sm font-medium text-primary hover:underline"
                >
                  {siteConfig.email}
                </a>
              </div>

              <div className="rounded-3xl border border-border bg-card p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
                  <MapPin className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-display text-base font-bold">Where we are</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Pune, India · Remote-first
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-card p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
                  <Clock className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-display text-base font-bold">Response time</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Usually within one business day.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-3xl border border-border bg-card p-7">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
                <span className="ml-2 text-sm text-muted-foreground">Follow along</span>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={1}>
            <Suspense
              fallback={
                <div className="h-[480px] animate-pulse rounded-3xl border border-border bg-card" />
              }
            >
              <ContactForm />
            </Suspense>
          </Reveal>
        </div>
      </section>
    </>
  );
}
