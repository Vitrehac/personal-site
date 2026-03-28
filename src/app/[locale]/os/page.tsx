import { setRequestLocale } from "next-intl/server";
import { getProjects, getWorkEntries, getPhotos, getTimelineEvents } from "@/lib/content";
import { Desktop } from "@/components/os/desktop";

type Props = {
  params: { locale: string };
};

export async function generateMetadata() {
  return {
    title: "OS Mode",
    description: "An interactive desktop experience.",
  };
}

export default function OSPage({ params }: Props) {
  setRequestLocale(params.locale);

  const projects = getProjects().map((p) => p.meta);
  const workEntries = getWorkEntries().map((w) => w.meta);
  const photos = getPhotos().map((p) => p.meta);
  const timelineEvents = getTimelineEvents().map((t) => t.meta);

  return (
    <Desktop
      projects={projects}
      workEntries={workEntries}
      photos={photos}
      timelineEvents={timelineEvents}
      locale={params.locale}
    />
  );
}
