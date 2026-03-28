"use client";

import type { ProjectMeta } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function ProjectsApp({ projects, locale }: { projects: ProjectMeta[]; locale: string }) {
  if (projects.length === 0) return <p className="text-white/40">No projects yet.</p>;

  return (
    <div className="space-y-3">
      <h2 className="mb-4 text-lg font-semibold text-white/90">Projects</h2>
      {projects.map((p) => (
        <div key={p.slug} className="rounded-lg border border-white/[0.06] p-4 transition-colors hover:border-white/[0.12] hover:bg-white/[0.03]">
          <h3 className="mb-1 font-medium text-white/85">{p.title}</h3>
          <p className="mb-2 text-xs text-white/40">{formatDate(p.date, locale)}{p.location && ` · ${p.location}`}</p>
          {p.excerpt && <p className="text-xs leading-relaxed text-white/50">{p.excerpt}</p>}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.category && <span className="rounded-full border border-white/[0.08] px-2 py-0.5 text-[10px] text-white/40">{p.category}</span>}
            {p.tags?.map((tag) => <span key={tag} className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/40">{tag}</span>)}
          </div>
        </div>
      ))}
    </div>
  );
}
