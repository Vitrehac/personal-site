"use client";

import { useTranslations } from "next-intl";
import { Mail, ExternalLink, Send } from "lucide-react";
import { Section } from "@/components/section";
import { PageTransition } from "@/components/page-transition";
import { Separator } from "@/components/ui/separator";

const SOCIAL_LINKS = [
  {
    key: "email",
    href: "mailto:hello@example.com",
    icon: Mail,
  },
  {
    key: "linkedin",
    href: "https://linkedin.com/in/yourprofile",
    icon: ExternalLink,
    external: true,
  },
  {
    key: "instagram",
    href: "https://instagram.com/yourprofile",
    icon: ExternalLink,
    external: true,
  },
];

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <PageTransition>
      <Section>
        <div className="max-w-2xl">
          <h1 className="mb-4 font-serif text-4xl tracking-tight md:text-5xl">
            {t("title")}
          </h1>
          <p className="mb-12 text-lg text-muted-foreground">{t("subtitle")}</p>

          <form
            action="mailto:hello@example.com"
            method="POST"
            encType="text/plain"
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                {t("namePlaceholder")}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder={t("namePlaceholder")}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                {t("email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder={t("emailPlaceholder")}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                {t("messagePlaceholder")}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder={t("messagePlaceholder")}
                className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
            >
              <Send className="h-4 w-4" />
              {t("sendMessage")}
            </button>
          </form>

          <Separator className="my-16" />

          <div>
            <h2 className="mb-6 font-serif text-2xl">{t("social")}</h2>
            <div className="flex flex-col gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center gap-4 rounded-xl border border-border p-4 transition-all hover:border-primary/30 hover:bg-muted/50"
                >
                  <link.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                  <span className="text-sm font-medium">{link.key}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </PageTransition>
  );
}
