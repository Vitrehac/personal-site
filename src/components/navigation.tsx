"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/about", key: "about" as const },
  { href: "/projects", key: "projects" as const },
  { href: "/work", key: "work" as const },
  { href: "/photography", key: "photography" as const },
  { href: "/timeline", key: "timeline" as const },
  { href: "/contact", key: "contact" as const },
];

export function Navigation() {
  const t = useTranslations("nav");
  const tHome = useTranslations("home");
  const pathname = usePathname();
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <header className="fixed top-0 z-40 w-full border-b border-border bg-background/80 font-sans backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
        <Link
          href="/"
          className="text-sm font-medium tracking-wide text-foreground transition-colors hover:text-primary"
        >
          {tHome("name")}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ href, key }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "text-sm tracking-wide uppercase transition-colors",
                  isActive(href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-1 md:flex">
          <Link
            href={pathname}
            locale="en"
            className={cn(
              "px-2 py-1 text-xs tracking-wider uppercase transition-colors",
              locale === "en"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            EN
          </Link>
          <span className="text-muted-foreground/40 text-xs">/</span>
          <Link
            href={pathname}
            locale="cs"
            className={cn(
              "px-2 py-1 text-xs tracking-wider uppercase transition-colors",
              locale === "cs"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            CS
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-md p-2 text-foreground ring-ring transition-colors hover:bg-accent/50 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-md md:hidden"
          >
            <motion.ul
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              exit={{ y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex flex-col gap-1 px-6 py-4"
            >
              {NAV_LINKS.map(({ href, key }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block py-2 text-sm tracking-wide uppercase transition-colors",
                      isActive(href)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
              <li className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                <Link
                  href={pathname}
                  locale="en"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "text-xs tracking-wider uppercase",
                    locale === "en"
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  EN
                </Link>
                <span className="text-muted-foreground/40 text-xs">/</span>
                <Link
                  href={pathname}
                  locale="cs"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "text-xs tracking-wider uppercase",
                    locale === "cs"
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  CS
                </Link>
              </li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
