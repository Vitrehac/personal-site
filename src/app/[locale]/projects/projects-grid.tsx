"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import type { ProjectMeta } from "@/lib/types";
import { ProjectCard } from "@/components/project-card";
import { FilterBar } from "@/components/filter-bar";

type Props = {
  projects: ProjectMeta[];
  tags: string[];
  locale: string;
};

export function ProjectsGrid({ projects, tags, locale }: Props) {
  const t = useTranslations("projects");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? projects.filter((p) => p.tags?.includes(activeTag))
    : projects;

  return (
    <div>
      <div className="mb-12">
        <h1 className="mb-4 font-serif text-4xl tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
      </div>

      <FilterBar
        tags={tags}
        activeTag={activeTag}
        onTagChange={setActiveTag}
        allLabel={t("filterAll")}
      />

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          {t("noProjects")}
        </p>
      ) : (
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <ProjectCard project={project} locale={locale} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
