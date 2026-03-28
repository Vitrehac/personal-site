"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import type { ContentEntry, ProjectMeta } from "@/lib/types";

type Props = {
  projects: ContentEntry<ProjectMeta>[];
  locale: string;
};

export function FeaturedProjectsSection({ projects, locale }: Props) {
  const t = useTranslations("home");

  if (projects.length === 0) return null;

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
          {t("featuredProjects")}
        </motion.h2>
        <Link
          href="/projects"
          className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {t("viewAll")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.div
            key={p.meta.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <ProjectCard project={p.meta} locale={locale} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
