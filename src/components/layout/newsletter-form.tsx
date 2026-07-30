"use client";

import * as React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail("");
    setTimeout(() => setDone(false), 3500);
  }

  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-3", className)}>
      <div className="flex gap-2">
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Email address"
          className="h-11"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95"
        >
          {done ? <Check className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
        </button>
      </div>
      {done && (
        <p className="text-xs text-[var(--success)]">
          Thanks  you&apos;re on the list.
        </p>
      )}
    </form>
  );
}
