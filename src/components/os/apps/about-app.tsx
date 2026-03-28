"use client";

import { useTranslations } from "next-intl";
import { Mail, ExternalLink } from "lucide-react";

export function AboutApp() {
  const t = useTranslations("about");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-3 text-lg font-semibold text-white/90">{t("title")}</h2>
        <p className="leading-relaxed text-white/60">{t("bio")}</p>
      </div>
      <div className="h-px bg-white/[0.06]" />
      <div>
        <h3 className="mb-2 text-sm font-medium text-white/70">{t("philosophy")}</h3>
        <p className="leading-relaxed text-white/50">{t("philosophyText")}</p>
      </div>
      <div className="h-px bg-white/[0.06]" />
      <div>
        <h3 className="mb-3 text-sm font-medium text-white/70">{t("links")}</h3>
        <div className="flex flex-col gap-2">
          {[
            { label: "Email", href: "mailto:hello@example.com", icon: Mail },
            { label: "LinkedIn", href: "https://linkedin.com/in/yourprofile", icon: ExternalLink },
            { label: "Instagram", href: "https://instagram.com/yourprofile", icon: ExternalLink },
          ].map((link) => (
            <a key={link.label} href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-3 rounded-lg border border-white/[0.06] px-3 py-2 transition-colors hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              <link.icon className="h-3.5 w-3.5 text-white/40" />
              <span className="text-xs text-white/60">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
