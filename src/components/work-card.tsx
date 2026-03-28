"use client";

import { Link } from "@/i18n/routing";
import type { WorkMeta } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface WorkCardProps {
  entry: WorkMeta;
  locale: string;
}

export function WorkCard({ entry, locale }: WorkCardProps) {
  const title = entry.role ?? entry.title;
  const subtitle = entry.organization;

  return (
    <Link href={`/work/${entry.slug}`} className="block" data-locale={locale}>
      <div
        className={cn(
          "group flex flex-col gap-2 rounded-lg border-l-4 border-l-transparent px-4 py-4 transition-colors duration-300",
          "hover:border-l-primary hover:bg-muted md:flex-row md:items-center md:justify-between md:gap-8"
        )}
      >
        <div className="min-w-0 flex-1 space-y-0.5">
          <p className="font-medium text-foreground">{title}</p>
          {subtitle ? (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        {entry.period ? (
          <p className="shrink-0 text-sm text-muted-foreground md:text-right">
            {entry.period}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
