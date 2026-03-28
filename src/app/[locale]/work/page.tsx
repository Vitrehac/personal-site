import { setRequestLocale, getTranslations } from "next-intl/server";
import { getWorkEntries } from "@/lib/content";
import { Section } from "@/components/section";
import { PageTransition } from "@/components/page-transition";
import { WorkCard } from "@/components/work-card";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props) {
  const t = await getTranslations({ locale: params.locale, namespace: "work" });
  return { title: t("title") };
}

export default function WorkPage({ params }: Props) {
  setRequestLocale(params.locale);
  const entries = getWorkEntries();

  return (
    <PageTransition>
      <Section>
        <div className="mb-12">
          <h1 className="mb-4 font-serif text-4xl tracking-tight md:text-5xl">
            Work
          </h1>
          <p className="text-lg text-muted-foreground">
            Mentorships, collaborations, and roles.
          </p>
        </div>

        {entries.length === 0 ? (
          <p className="text-muted-foreground">No work entries found.</p>
        ) : (
          <div className="space-y-4">
            {entries.map((e) => (
              <WorkCard
                key={e.meta.slug}
                entry={e.meta}
                locale={params.locale}
              />
            ))}
          </div>
        )}
      </Section>
    </PageTransition>
  );
}
