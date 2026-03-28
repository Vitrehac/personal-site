"use client";

import type { TimelineEvent } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function TimelineApp({ events, locale }: { events: TimelineEvent[]; locale: string }) {
  if (events.length === 0) return <p className="text-white/40">No events yet.</p>;

  return (
    <div>
      <h2 className="mb-5 text-lg font-semibold text-white/90">Timeline</h2>
      <div className="relative space-y-0 border-l border-white/[0.08] pl-6">
        {events.map((e) => (
          <div key={e.slug} className="relative pb-8 last:pb-0">
            <div className="absolute -left-[25px] top-1 h-2 w-2 rounded-full bg-indigo-400/70 ring-2 ring-neutral-900" />
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-white/30">{formatDate(e.date, locale)}</p>
            <h3 className="mb-1 text-sm font-medium text-white/80">{e.title}</h3>
            {e.excerpt && <p className="text-xs leading-relaxed text-white/45">{e.excerpt}</p>}
            <span className="mt-1 inline-block rounded-full border border-white/[0.08] px-2 py-0.5 text-[10px] text-white/30">{e.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
