import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <section className="py-16">
        <div className="prose-sm mx-auto w-full max-w-3xl px-6 leading-relaxed text-muted-foreground md:px-8 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground">
          <p>
            This is placeholder privacy policy content for {siteConfig.legalName}.
            Replace it with your reviewed policy before launch.
          </p>
          <h2>What we collect</h2>
          <p>
            Contact form submissions (name, email, message) and newsletter email
            addresses, used solely to respond to you and send updates you asked for.
          </p>
          <h2>What we don&apos;t do</h2>
          <p>
            We don&apos;t sell your data, and we don&apos;t track you across the web.
          </p>
          <h2>Contact</h2>
          <p>
            Questions? Email{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-primary">
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
