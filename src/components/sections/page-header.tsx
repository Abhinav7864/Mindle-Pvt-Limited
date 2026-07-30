import * as React from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border pb-16 pt-36 md:pb-20 md:pt-44",
        className
      )}
    >
      <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_70%_70%_at_50%_0%,black,transparent)]" />
      <div className="absolute left-1/2 top-[-14rem] -z-10 h-[28rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-2xl" />
      <div className="mx-auto w-full max-w-[1280px] px-6 text-center md:px-8">
        <Reveal className="flex flex-col items-center gap-5">

          <h1 className="mx-auto max-w-3xl font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl md:leading-[1.06]">
            {title}
          </h1>
          {description && (
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
