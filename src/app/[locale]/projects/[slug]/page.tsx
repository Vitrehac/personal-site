import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProject, getAllSlugs, getProjects } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { Section } from "@/components/section";
import { PageTransition } from "@/components/page-transition";
import { MdxContent } from "@/components/mdx-content";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProjectCard } from "@/components/project-card";
import Link from "next/link";

type Props = {
  params: { locale: string; slug: string };
};

export function generateStaticParams() {
  return getAllSlugs("projects").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) return { title: "Not Found" };
  return {
    title: project.meta.title,
    description: project.meta.excerpt,
  };
}

export default function ProjectPage({ params }: Props) {
  const { locale, slug } = params;
  setRequestLocale(locale);

  const entry = getProject(slug);
  if (!entry) notFound();

  const { meta, content } = entry;

  const related = getProjects()
    .filter(
      (p) =>
        p.meta.slug !== slug &&
        p.meta.tags?.some((t) => meta.tags?.includes(t))
    )
    .slice(0, 2);

  return (
    <PageTransition>
      <Section>
        <Link
          href={`/${locale}/projects`}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Projects
        </Link>

        <div className="max-w-3xl">
          <div className="mb-8">
            <h1 className="mb-4 font-serif text-4xl tracking-tight md:text-5xl">
              {meta.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>{formatDate(meta.date, locale)}</span>
              {meta.location && <span>{meta.location}</span>}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {meta.category && (
                <Badge variant="outline">{meta.category}</Badge>
              )}
              {meta.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            {meta.startup && (
              <p className="mt-4 text-muted-foreground">
                Startup: {meta.startup}
              </p>
            )}
            {meta.topic && (
              <p className="text-muted-foreground">Topic: {meta.topic}</p>
            )}
          </div>

          {meta.coverImage && (
            <div className="mb-12 overflow-hidden rounded-xl">
              <img
                src={meta.coverImage}
                alt={meta.title}
                className="w-full object-cover"
              />
            </div>
          )}

          <MdxContent source={content} />
        </div>

        {related.length > 0 && (
          <>
            <Separator className="my-16" />
            <div>
              <h2 className="mb-8 font-serif text-2xl">Related Projects</h2>
              <div className="grid gap-8 md:grid-cols-2">
                {related.map((p) => (
                  <ProjectCard
                    key={p.meta.slug}
                    project={p.meta}
                    locale={locale}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </Section>
    </PageTransition>
  );
}
