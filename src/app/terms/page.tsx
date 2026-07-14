import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service" />
      <section className="py-16">
        <div className="prose-sm mx-auto w-full max-w-3xl px-6 leading-relaxed text-muted-foreground md:px-8 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground">
          <p>
            This is placeholder terms content for {siteConfig.legalName}. Replace it
            with your reviewed terms before launch.
          </p>
          <h2>Use of this site</h2>
          <p>
            Content on this site is provided for information about Mindle and its
            products. All trademarks and product names are property of their owners.
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
