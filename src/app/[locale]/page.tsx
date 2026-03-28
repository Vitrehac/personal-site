import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getFeaturedProjects, getTimelineEvents, getPhotos } from "@/lib/content";
import { HeroSection } from "./sections/hero";
import { FeaturedProjectsSection } from "./sections/featured-projects";
import { TimelinePreviewSection } from "./sections/timeline-preview";
import { PhotographyPreviewSection } from "./sections/photography-preview";
import { ContactCTASection } from "./sections/contact-cta";
import { CurrentFocusSection } from "./sections/current-focus";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props) {
  const t = await getTranslations({ locale: params.locale, namespace: "home" });
  return {
    title: t("name") + " — " + t("tagline"),
  };
}

export default function HomePage({ params }: Props) {
  setRequestLocale(params.locale);
  const locale = params.locale;

  const featuredProjects = getFeaturedProjects();
  const timelineEvents = getTimelineEvents().slice(0, 4);
  const photos = getPhotos().slice(0, 4);

  return (
    <>
      <HeroSection />
      <CurrentFocusSection />
      <FeaturedProjectsSection projects={featuredProjects} locale={locale} />
      <TimelinePreviewSection events={timelineEvents} locale={locale} />
      <PhotographyPreviewSection photos={photos} locale={locale} />
      <ContactCTASection />
    </>
  );
}
