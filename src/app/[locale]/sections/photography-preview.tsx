"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Section } from "@/components/section";
import { PhotoCard } from "@/components/photo-card";
import type { ContentEntry, PhotoMeta } from "@/lib/types";

type Props = {
  photos: ContentEntry<PhotoMeta>[];
  locale: string;
};

export function PhotographyPreviewSection({ photos, locale }: Props) {
  const t = useTranslations("home");

  if (photos.length === 0) return null;

  return (
    <Section className="bg-muted/30">
      <div className="mb-12 flex items-end justify-between">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl tracking-tight md:text-4xl"
        >
          {t("photographyPreview")}
        </motion.h2>
        <Link
          href="/photography"
          className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {t("viewAll")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {photos.map((p, i) => (
          <motion.div
            key={p.meta.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <PhotoCard photo={p.meta} locale={locale} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
