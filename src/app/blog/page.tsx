import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { BlogGrid } from "@/components/sections/blog-grid";
import { FinalCTA } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes from the Mindle team on AI, design, development, startups, product, and engineering.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title={
          <>
            Notes from the <span className="text-gradient">workshop</span>
          </>
        }
        description="How we build  systems, design decisions, engineering patterns, and startup lessons, written by the people doing the work."
      />

      <section className="py-20 md:py-24">
        <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
          <BlogGrid />
        </div>
      </section>

      <FinalCTA
        title="Want these in your inbox?"
        description="Subscribe to the newsletter in the footer — product updates and engineering notes, no spam."
        primaryLabel="Work With Us"
        secondaryLabel="Explore Products"
      />
    </>
  );
}
