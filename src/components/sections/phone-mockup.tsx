import { cn } from "@/lib/utils";

/**
 * Stylized GitaConnect phone mockup showing the real app screenshot.
 */
export function PhoneMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-[290px] select-none rounded-[2.6rem] border border-border bg-card p-2.5 shadow-2xl",
        className
      )}
      aria-hidden="true"
    >
      {/* Notch */}
      <div className="absolute left-1/2 top-4 z-10 h-6 w-28 -translate-x-1/2 rounded-full bg-black/90" />

      <div className="overflow-hidden rounded-[2.1rem] bg-[#f8f5f0] aspect-[9/19.5]">
        <img
          src="/gitaconnect-app.jpg"
          alt="GitaConnect App Interface"
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  );
}
