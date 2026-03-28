"use client";

import { cn } from "@/lib/utils";

export interface FilterBarProps {
  tags: string[];
  activeTag: string | null;
  onTagChange: (tag: string | null) => void;
  allLabel?: string;
}

export function FilterBar({
  tags,
  activeTag,
  onTagChange,
  allLabel = "All",
}: FilterBarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 overflow-x-auto",
        "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      )}
    >
      <button
        type="button"
        onClick={() => onTagChange(null)}
        className={cn(
          "shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors duration-300",
          activeTag === null
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground hover:bg-muted/80"
        )}
      >
        {allLabel}
      </button>
      {tags.map((tag) => {
        const active = activeTag === tag;
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onTagChange(tag)}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors duration-300",
              active
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
