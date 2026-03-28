import { setRequestLocale, getTranslations } from "next-intl/server";
import { getPhotos } from "@/lib/content";
import { Section } from "@/components/section";
import { PageTransition } from "@/components/page-transition";
import { PhotoCard } from "@/components/photo-card";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "photography",
  });
  return { title: t("title") };
}

export default async function PhotographyPage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "photography" });
  const photos = getPhotos();

  return (
    <PageTransition>
      <Section>
        <div className="mb-12">
          <h1 className="mb-4 font-serif text-4xl tracking-tight md:text-5xl">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        {photos.length === 0 ? (
          <p className="text-muted-foreground">{t("noPhotos")}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo) => (
              <PhotoCard
                key={photo.meta.slug}
                photo={photo.meta}
                locale={locale}
              />
            ))}
          </div>
        )}
      </Section>
    </PageTransition>
  );
}
