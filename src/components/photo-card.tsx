"use client";

import { Link } from "@/i18n/routing";
import type { PhotoMeta } from "@/lib/types";

export interface PhotoCardProps {
  photo: PhotoMeta;
  locale: string;
  onClick?: () => void;
}

export function PhotoCard({ photo, locale, onClick }: PhotoCardProps) {
  const cover = photo.coverImage;

  const inner = (
    <>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
        {cover ? (
          <img
            src={cover}
            alt={photo.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div
            className="flex min-h-[12rem] w-full items-center justify-center bg-muted px-3 text-center text-sm font-medium text-foreground"
            lang={locale}
          >
            {photo.title}
          </div>
        )}
        {cover ? (
          <div
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pb-3 pt-10"
            lang={locale}
          >
            <p className="text-sm font-medium text-white">{photo.title}</p>
          </div>
        ) : null}
      </div>
    </>
  );

  const className =
    "group block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {inner}
      </button>
    );
  }

  return (
    <Link href={`/photography/${photo.slug}`} className={className}>
      {inner}
    </Link>
  );
}
