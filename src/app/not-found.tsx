import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />
      <div className="px-6 text-center">
        <p className="font-display text-7xl font-extrabold tracking-tight text-gradient md:text-8xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-bold">
          This page wandered off
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist — but our products do.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="gradient">
            <Link href="/">Back home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/products">Explore products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
