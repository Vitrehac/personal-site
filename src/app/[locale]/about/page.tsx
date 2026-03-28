import { setRequestLocale, getTranslations } from "next-intl/server";
import { Section } from "@/components/section";
import { PageTransition } from "@/components/page-transition";
import { Separator } from "@/components/ui/separator";
import { Mail, ExternalLink } from "lucide-react";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props) {
  const t = await getTranslations({ locale: params.locale, namespace: "about" });
  return { title: t("title") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  const links = [
    {
      label: "Email",
      href: "mailto:hello@example.com",
      icon: Mail,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/yourprofile",
      icon: ExternalLink,
      external: true,
    },
    {
      label: "Instagram",
      href: "https://instagram.com/yourprofile",
      icon: ExternalLink,
      external: true,
    },
  ];

  return (
    <PageTransition>
      <Section>
        <div className="max-w-2xl">
          <h1 className="mb-8 font-serif text-4xl tracking-tight md:text-5xl">
            {t("title")}
          </h1>

          <p className="mb-12 text-xl leading-relaxed text-muted-foreground">
            {t("bio")}
          </p>

          <div className="space-y-16">
            <div>
              <h2 className="mb-4 font-serif text-2xl">{t("philosophy")}</h2>
              <p className="leading-relaxed text-muted-foreground">
                {t("philosophyText")}
              </p>
            </div>

            <Separator />

            <div>
              <h2 className="mb-6 font-serif text-2xl">{t("links")}</h2>
              <div className="flex flex-col gap-4">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center gap-4 rounded-xl border border-border p-4 transition-all hover:border-primary/30 hover:bg-muted/50"
                  >
                    <link.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                    <span className="text-sm font-medium">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </PageTransition>
  );
}
