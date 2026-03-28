"use client";

import { Link } from "@/i18n/routing";
import type { ProjectMeta } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface ProjectCardProps {
  project: ProjectMeta;
  locale: string;
}

export function ProjectCard({ project, locale }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <Card
        className={cn(
          "h-full overflow-hidden transition-all duration-300",
          "hover:-translate-y-1 hover:border-primary/45 hover:shadow-lg"
        )}
      >
        {project.coverImage ? (
          <div
            className="aspect-video w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${project.coverImage})` }}
            role="img"
            aria-label={project.title}
          />
        ) : null}
        <CardHeader className="gap-2">
          <CardTitle className="font-serif text-xl">{project.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {formatDate(project.date, locale)}
          </p>
          {project.excerpt ? (
            <CardDescription className="line-clamp-3">
              {project.excerpt}
            </CardDescription>
          ) : null}
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="outline">{project.category}</Badge>
            {project.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
