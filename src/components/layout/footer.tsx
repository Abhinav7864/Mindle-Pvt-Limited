import Link from "next/link";
import {
  XIcon,
  LinkedInIcon,
  GitHubIcon,
  InstagramIcon,
} from "@/components/ui/social-icons";
import { Logo } from "@/components/ui/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { footerNav } from "@/lib/data/nav";
import { siteConfig } from "@/lib/site";

const socials = [
  { icon: XIcon, href: siteConfig.social.twitter, label: "X (Twitter)" },
  { icon: LinkedInIcon, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: GitHubIcon, href: siteConfig.social.github, label: "GitHub" },
  { icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
];

export function Footer() {
  const year = 2026;
  return (
    <footer className="relative mt-24 border-t border-border bg-[var(--surface-1)]">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-6">
              <p className="text-sm font-medium">Join the newsletter</p>
              <p className="mb-3 text-sm text-muted-foreground">
                Product updates and engineering notes. No spam.
              </p>
              <NewsletterForm className="max-w-sm" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold">{col.title}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
