import Link from "next/link";
import {
  LinkedInIcon,
  InstagramIcon,
} from "@/components/ui/social-icons";
import { Logo } from "@/components/ui/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { footerNav } from "@/lib/data/nav";
import { siteConfig } from "@/lib/site";

const socials = [
  { icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: LinkedInIcon, href: siteConfig.social.linkedin, label: "LinkedIn" },
];

export function Footer() {
  const year = 2026;
  return (
    <footer className="relative border-t border-white/[.12] bg-[#080808]">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-10 lg:px-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-6">
              <p className="text-sm font-medium">Stay close</p>
              <p className="mb-3 text-sm text-muted-foreground">
                Occasional product updates and studio notes.
              </p>
              <NewsletterForm className="max-w-sm" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-[10px] font-medium uppercase tracking-[.18em] text-white/45">{col.title}</h3>
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
                className="grid h-9 w-9 place-items-center border border-white/[.16] text-muted-foreground transition-colors hover:border-white hover:text-foreground"
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
