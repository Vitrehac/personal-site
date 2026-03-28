import { setRequestLocale, getTranslations } from "next-intl/server";
import { getProjects, getAllTags } from "@/lib/content";
import { Section } from "@/components/section";
import { PageTransition } from "@/components/page-transition";
import { ProjectsGrid } from "./projects-grid";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "projects",
  });
  return { title: t("title") };
}

export default function ProjectsPage({ params }: Props) {
  setRequestLocale(params.locale);
  const projects = getProjects();
  const tags = getAllTags("projects");

  return (
    <PageTransition>
      <Section>
        <ProjectsGrid
          projects={projects.map((p) => p.meta)}
          tags={tags}
          locale={params.locale}
        />
      </Section>
    </PageTransition>
  );
}
