import { setRequestLocale, getTranslations } from "next-intl/server";
import { getTimelineEvents } from "@/lib/content";
import { Section } from "@/components/section";
import { PageTransition } from "@/components/page-transition";
import { TimelineEntry } from "@/components/timeline-entry";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "timeline",
  });
  return { title: t("title") };
}

export default async function TimelinePage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "timeline" });
  const events = getTimelineEvents();

  return (
    <PageTransition>
      <Section>
        <div className="mb-16">
          <h1 className="mb-4 font-serif text-4xl tracking-tight md:text-5xl">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="space-y-0">
          {events.map((event, i) => (
            <TimelineEntry
              key={event.meta.slug}
              event={event.meta}
              index={i}
              locale={locale}
            />
          ))}
        </div>
      </Section>
    </PageTransition>
  );
}
