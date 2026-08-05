"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Check, Send } from "lucide-react";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const topics = [
  "Product inquiry",
  "Build with Mindle (services)",
  "Partnership",
  "Press",
  "Other",
];

export function ContactForm() {
  const params = useSearchParams();
  const [sent, setSent] = React.useState(false);

  // Prefill context from ?product= / ?service=
  const product = params.get("product");
  const service = params.get("service");
  const prefill = product
    ? `I'm interested in ${product.charAt(0).toUpperCase() + product.slice(1)}.`
    : service
      ? `I'd like to talk about a ${service.replace(/-/g, " ")} project.`
      : "";

  const defaultTopic = product
    ? "Product inquiry"
    : service
      ? "Build with Mindle (services)"
      : topics[0];

  const [submitting, setSubmitting] = React.useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const topic = formData.get("topic") as string;
    const message = formData.get("message") as string;

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, topic, message }),
      });
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      setSubmitting(false);
      setSent(true);
    }
  }

  if (sent) {
    return (
      <div className="flex h-full min-h-[380px] flex-col items-center justify-center rounded-3xl border border-border bg-card p-10 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-[color-mix(in_srgb,var(--success)_15%,transparent)] text-[var(--success)]">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-xl font-bold">Message sent</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Thanks for reaching out we read everything and usually reply within
          one business day.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-border bg-card p-7 md:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Name
          </label>
          <Input id="name" name="name" required placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="topic" className="mb-1.5 block text-sm font-medium">
          Topic
        </label>
        <select
          id="topic"
          name="topic"
          defaultValue={defaultTopic}
          className="flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          required
          defaultValue={prefill}
          placeholder="Tell us about your project, question, or idea…"
        />
      </div>

      <Button type="submit" variant="primary" size="lg" disabled={submitting} className="mt-7 w-full">
        {submitting ? "Sending..." : "Send message"} <Send className="h-4 w-4" />
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        We&apos;ll never share your details. Usually we reply within a day.
      </p>
    </form>
  );
}
