"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Section } from "@/components/section";
import { TimelineEntry } from "@/components/timeline-entry";
import type { ContentEntry, TimelineEvent } from "@/lib/types";

type Props = {
  events: ContentEntry<TimelineEvent>[];
  locale: string;
};

export function TimelinePreviewSection({ events, locale }: Props) {
  const t = useTranslations("home");

  if (events.length === 0) return null;

  return (
    <Section>
      <div className="mb-12 flex items-end justify-between">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl tracking-tight md:text-4xl"
        >
          {t("recentTimeline")}
        </motion.h2>
        <Link
          href="/timeline"
          className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {t("viewAll")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="space-y-0">
        {events.map((e, i) => (
          <TimelineEntry
            key={e.meta.slug}
            event={e.meta}
            index={i}
            locale={locale}
          />
        ))}
      </div>
    </Section>
  );
}
