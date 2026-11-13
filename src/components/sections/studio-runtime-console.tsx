"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Cpu,
  Layers,
  Smartphone,
  Globe2,
  Check,
  Copy,
  Zap,
  Activity,
  Play,
  RotateCcw,
} from "lucide-react";

interface RuntimeTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  command: string;
  logs: { text: string; type: "info" | "success" | "metric" | "code" }[];
  metrics: { label: string; value: string }[];
}

const runtimeTabs: RuntimeTab[] = [
  {
    id: "saas",
    label: "SaaS Engine",
    icon: Layers,
    tag: "Multi-Tenant",
    command: "$ mindle saas deploy --tenant-isolation strict",
    logs: [
      { text: "✔ Multi-tenant schema initialized with PostgreSQL RLS", type: "success" },
      { text: "✔ Stripe billing webhook listeners & subscriptions active", type: "success" },
      { text: "✔ Organization auth & RBAC provisioned across 4 regions", type: "info" },
      { text: "⚡ P99 API Latency: 18ms · Active Worker Pool: 64 instances", type: "metric" },
    ],
    metrics: [
      { label: "Throughput", value: "14.2k req/s" },
      { label: "Isolation", value: "Strict RLS" },
      { label: "Uptime", value: "99.99%" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile Sync",
    icon: Smartphone,
    tag: "Offline-First",
    command: "$ mindle mobile sync --engine sqlite-local",
    logs: [
      { text: "✔ Device-resident SQLite datastore verified (700 verses / corpus)", type: "success" },
      { text: "✔ Bi-directional cloud queue with retry-safe scheduler ready", type: "success" },
      { text: "✔ Native haptic biofeedback calibration connected", type: "info" },
      { text: "⚡ Local Read Latency: < 0.8ms · Zero network required", type: "metric" },
    ],
    metrics: [
      { label: "Local Read", value: "< 0.8ms" },
      { label: "Sync State", value: "Zero Loss" },
      { label: "Platforms", value: "iOS + Android" },
    ],
  },
  {
    id: "web",
    label: "Web Apps",
    icon: Globe2,
    tag: "Full-Stack",
    command: "$ mindle web build --target nextjs-edge",
    logs: [
      { text: "✔ Next.js 16 SSR + React 19 Turbopack build optimized", type: "success" },
      { text: "✔ Tailwind CSS v4 design tokens & motion spring loaded", type: "success" },
      { text: "✔ Edge cache distributed to 285 globally replicated PoPs", type: "info" },
      { text: "⚡ Lighthouse Score: 100/100 · First Contentful Paint: 0.3s", type: "metric" },
    ],
    metrics: [
      { label: "Speed Score", value: "100/100" },
      { label: "Edge PoPs", value: "280+" },
      { label: "FCP", value: "0.3s" },
    ],
  },
  {
    id: "ai",
    label: "AI Pipelines",
    icon: Cpu,
    tag: "Domain-Lock",
    command: "$ mindle ai verify --model sarvam-rag --grounding strict",
    logs: [
      { text: "✔ Domain-restricted prompt engine attached to verified corpus", type: "success" },
      { text: "✔ Vector similarity search: cosine distance threshold 0.88", type: "success" },
      { text: "✔ Anti-hallucination evaluator: 100% scripture validation", type: "info" },
      { text: "⚡ Multi-lingual lock: 11 Indian languages strictly preserved", type: "metric" },
    ],
    metrics: [
      { label: "Hallucination", value: "0.0%" },
      { label: "Languages", value: "11 Native" },
      { label: "Embeddings", value: "pgvector" },
    ],
  },
];

export function StudioRuntimeConsole() {
  const [activeTabId, setActiveTabId] = useState("saas");
  const [isCopied, setIsCopied] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle through runtime tabs
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTabId((prev) => {
        const idx = runtimeTabs.findIndex((t) => t.id === prev);
        return runtimeTabs[(idx + 1) % runtimeTabs.length].id;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeTab = runtimeTabs.find((t) => t.id === activeTabId) || runtimeTabs[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab.command);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      className="relative w-full max-w-[560px] mx-auto select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Radiant ambient glow */}
      <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-tr from-accent/25 via-amber-500/15 to-purple-600/20 blur-3xl opacity-75" />

      {/* Main Terminal Frame */}
      <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-zinc-950/90 text-zinc-100 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/60 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-mono text-xs text-zinc-400">mindle-runtime · v2.4</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-mono text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          </div>
        </div>

        {/* Runtime Tabs Switcher */}
        <div className="grid grid-cols-4 border-b border-zinc-800/80 bg-zinc-950/40 p-1.5 gap-1">
          {runtimeTabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTabId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTabId(t.id)}
                className={`relative flex items-center justify-center gap-1.5 rounded-xl py-2 px-1 text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-zinc-800 text-zinc-100 shadow-sm"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-accent" : "text-zinc-500"}`} />
                <span className="text-[11px] truncate hidden sm:inline">{t.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="runtimeTabActive"
                    className="absolute inset-0 rounded-xl border border-accent/40 pointer-events-none"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Interactive CLI Command Bar */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/30 px-4 py-2.5 font-mono text-xs text-zinc-300">
          <div className="flex items-center gap-2 truncate">
            <Terminal className="h-3.5 w-3.5 text-accent shrink-0" />
            <span className="truncate text-zinc-200">{activeTab.command}</span>
          </div>
          <button
            onClick={handleCopy}
            className="ml-2 flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-800/80 px-2 py-1 text-[10px] text-zinc-300 hover:bg-zinc-700 transition-colors"
            title="Copy command"
          >
            {isCopied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" />
                <span className="text-emerald-400 font-sans">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span className="font-sans">Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Live Execution Logs Window */}
        <div className="p-4 sm:p-5 font-mono text-xs min-h-[190px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-2.5"
            >
              {activeTab.logs.map((log, i) => (
                <div key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-zinc-600 select-none">0{i + 1}</span>
                  <span
                    className={
                      log.type === "success"
                        ? "text-emerald-400"
                        : log.type === "metric"
                        ? "text-amber-400 font-semibold"
                        : "text-zinc-300"
                    }
                  >
                    {log.text}
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Quick Metrics Strip */}
          <div className="mt-4 pt-3.5 border-t border-zinc-800/80 grid grid-cols-3 gap-2">
            {activeTab.metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-zinc-800/60 bg-zinc-900/60 p-2 text-center">
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider">{m.label}</p>
                <p className="mt-0.5 font-mono font-bold text-xs sm:text-sm text-zinc-100">{m.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal Footer Bar */}
        <div className="flex items-center justify-between border-t border-zinc-800/80 bg-zinc-900/60 px-4 py-2 text-[11px] text-zinc-400 font-mono">
          <div className="flex items-center gap-2">
            <Zap className="h-3 w-3 text-accent" />
            <span>Mindle Product Studio &amp; SaaS Lab</span>
          </div>
          <span className="text-zinc-500">Press tab to inspect</span>
        </div>
      </div>
    </div>
  );
}
