"use client";

import { useTranslations } from "next-intl";
import { Mail, ExternalLink, Send } from "lucide-react";

export function ContactApp() {
  const t = useTranslations("contact");

  return (
    <div className="space-y-5">
      <div>
        <h2 className="mb-2 text-lg font-semibold text-white/90">{t("title")}</h2>
        <p className="text-xs text-white/50">{t("subtitle")}</p>
      </div>
      <form action="mailto:hello@example.com" method="POST" encType="text/plain" className="space-y-3">
        <input name="name" type="text" placeholder={t("namePlaceholder")} className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs text-white/80 placeholder:text-white/25 focus:border-indigo-500/50 focus:outline-none" />
        <input name="email" type="email" placeholder={t("emailPlaceholder")} className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs text-white/80 placeholder:text-white/25 focus:border-indigo-500/50 focus:outline-none" />
        <textarea name="message" rows={3} placeholder={t("messagePlaceholder")} className="w-full resize-none rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs text-white/80 placeholder:text-white/25 focus:border-indigo-500/50 focus:outline-none" />
        <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-indigo-500/80 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-indigo-500">
          <Send className="h-3 w-3" />
          {t("sendMessage")}
        </button>
      </form>
      <div className="h-px bg-white/[0.06]" />
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
  );
}
