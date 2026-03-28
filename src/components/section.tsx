import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-32",
        className,
      )}
    >
      {children}
    </section>
  );
}
