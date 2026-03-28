import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPhoto, getAllSlugs } from "@/lib/content";
import { Section } from "@/components/section";
import { PageTransition } from "@/components/page-transition";
import { MdxContent } from "@/components/mdx-content";
import Link from "next/link";

type Props = {
  params: { locale: string; slug: string };
};

export function generateStaticParams() {
  return getAllSlugs("photography").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const photo = getPhoto(params.slug);
  if (!photo) return { title: "Not Found" };
  return { title: photo.meta.title };
}

export default function PhotoPage({ params }: Props) {
  const { locale, slug } = params;
  setRequestLocale(locale);

  const entry = getPhoto(slug);
  if (!entry) notFound();

  const { meta, content } = entry;

  return (
    <PageTransition>
      <Section>
        <Link
          href={`/${locale}/photography`}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Photography
        </Link>

        <div className="max-w-4xl">
          <h1 className="mb-6 font-serif text-4xl tracking-tight">
            {meta.title}
          </h1>
          {meta.coverImage && (
            <div className="mb-8 overflow-hidden rounded-xl">
              <img
                src={meta.coverImage}
                alt={meta.title}
                className="w-full object-cover"
              />
            </div>
          )}
          <MdxContent source={content} />
        </div>
      </Section>
    </PageTransition>
  );
}
