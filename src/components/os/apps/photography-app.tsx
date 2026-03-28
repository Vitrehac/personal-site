"use client";

import type { PhotoMeta } from "@/lib/types";

export function PhotographyApp({ photos }: { photos: PhotoMeta[] }) {
  if (photos.length === 0) return <p className="text-white/40">No photos yet.</p>;

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-white/90">Photography</h2>
      <div className="grid grid-cols-2 gap-2">
        {photos.map((p) => (
          <div key={p.slug} className="group relative aspect-square overflow-hidden rounded-lg bg-white/[0.04]">
            {p.coverImage ? (
              <img src={p.coverImage} alt={p.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-xs text-white/20">{p.title}</span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2">
              <span className="text-[10px] font-medium text-white/80">{p.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
