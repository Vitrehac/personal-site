"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import type { TimelineEvent } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface TimelineEntryProps {
  event: TimelineEvent;
  index: number;
  locale: string;
}

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

export function TimelineEntry({ event, index, locale }: TimelineEntryProps) {
  const titleClassLinked =
    "text-lg font-semibold text-foreground transition-colors hover:text-primary";

  const titleNode = event.link ? (
    isExternalHref(event.link) ? (
      <a
        href={event.link}
        className={titleClassLinked}
        target="_blank"
        rel="noopener noreferrer"
      >
        {event.title}
      </a>
    ) : (
      <Link href={event.link} className={titleClassLinked}>
        {event.title}
      </Link>
    )
  ) : (
    <span className="text-lg font-semibold text-foreground">{event.title}</span>
  );

  return (
    <div className="flex gap-6 md:gap-10">
      <div className="w-24 shrink-0 pt-1 text-right text-sm text-muted-foreground md:w-32">
        {formatDate(event.date, locale)}
      </div>
      <div className="relative flex-1 border-l-2 border-border pb-12 pl-8 md:pl-10">
        <div className="absolute left-0 top-2 h-3 w-3 -translate-x-[calc(50%+1px)] rounded-full bg-primary ring-4 ring-background" />
        <motion.div
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="space-y-2">
            {titleNode}
            <div>
              <Badge variant="outline">{event.category}</Badge>
            </div>
            {event.excerpt ? (
              <p className="text-sm text-muted-foreground">{event.excerpt}</p>
            ) : null}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
