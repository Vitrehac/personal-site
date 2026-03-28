"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const FOOTER_LINKS = [
  { href: "/about", key: "about" as const },
  { href: "/projects", key: "projects" as const },
  { href: "/work", key: "work" as const },
  { href: "/photography", key: "photography" as const },
  { href: "/timeline", key: "timeline" as const },
  { href: "/contact", key: "contact" as const },
];

const SOCIAL = [
  { href: "https://linkedin.com", key: "linkedin" as const },
  { href: "https://instagram.com", key: "instagram" as const },
  { href: "mailto:hello@example.com", key: "email" as const },
];

export function Footer() {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const tHome = useTranslations("home");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border font-sans">
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-20 md:px-8 md:pt-28">
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          <div>
            <p className="mb-4 text-xs font-medium tracking-wide uppercase text-muted-foreground">
              {tFooter("navTitle")}
            </p>
            <ul className="flex flex-col gap-2">
              {FOOTER_LINKS.map(({ href, key }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "text-sm text-muted-foreground transition-colors hover:text-foreground",
                    )}
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium tracking-wide uppercase text-muted-foreground">
              {tFooter("socialTitle")}
            </p>
            <ul className="flex flex-col gap-2">
              {SOCIAL.map(({ href, key }) => (
                <li key={key}>
                  <a
                    href={href}
                    {...(href.startsWith("http")
                      ? {
                          target: "_blank" as const,
                          rel: "noopener noreferrer",
                        }
                      : {})}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {tFooter(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">{tFooter("builtWith")}</p>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <p className="text-xs text-muted-foreground">
            {tFooter("copyright", { year, name: tHome("name") })}
          </p>
        </div>
      </div>
    </footer>
  );
}
