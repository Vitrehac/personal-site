import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getWorkEntry, getAllSlugs } from "@/lib/content";
import { Section } from "@/components/section";
import { PageTransition } from "@/components/page-transition";
import { MdxContent } from "@/components/mdx-content";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type Props = {
  params: { locale: string; slug: string };
};

export function generateStaticParams() {
  return getAllSlugs("work").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const entry = getWorkEntry(params.slug);
  if (!entry) return { title: "Not Found" };
  return {
    title: entry.meta.title,
    description: entry.meta.excerpt,
  };
}

export default function WorkEntryPage({ params }: Props) {
  const { locale, slug } = params;
  setRequestLocale(locale);

  const entry = getWorkEntry(slug);
  if (!entry) notFound();

  const { meta, content } = entry;

  return (
    <PageTransition>
      <Section>
        <Link
          href={`/${locale}/work`}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Work
        </Link>

        <div className="max-w-3xl">
          <h1 className="mb-4 font-serif text-4xl tracking-tight md:text-5xl">
            {meta.title}
          </h1>
          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {meta.role && <span>{meta.role}</span>}
            {meta.organization && <span>@ {meta.organization}</span>}
            {meta.period && <span>{meta.period}</span>}
          </div>
          {meta.tags && (
            <div className="mb-8 flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <MdxContent source={content} />
        </div>
      </Section>
    </PageTransition>
  );
}
