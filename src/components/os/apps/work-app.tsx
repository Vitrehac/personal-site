"use client";

import type { WorkMeta } from "@/lib/types";

export function WorkApp({ entries }: { entries: WorkMeta[] }) {
  if (entries.length === 0) return <p className="text-white/40">No work entries yet.</p>;

  return (
    <div className="space-y-3">
      <h2 className="mb-4 text-lg font-semibold text-white/90">Work</h2>
      {entries.map((e) => (
        <div key={e.slug} className="rounded-lg border border-white/[0.06] p-4 transition-colors hover:border-white/[0.12] hover:bg-white/[0.03]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-medium text-white/85">{e.role ?? e.title}</h3>
              {e.organization && <p className="text-xs text-white/50">@ {e.organization}</p>}
            </div>
            {e.period && <span className="shrink-0 text-xs text-white/30">{e.period}</span>}
          </div>
          {e.excerpt && <p className="mt-2 text-xs leading-relaxed text-white/45">{e.excerpt}</p>}
        </div>
      ))}
    </div>
  );
}
