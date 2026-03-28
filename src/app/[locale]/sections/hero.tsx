"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowDown } from "lucide-react";
import { Section } from "@/components/section";

export function HeroSection() {
  const t = useTranslations("home");

  return (
    <Section className="flex min-h-[85vh] flex-col items-start justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl"
      >
        <p className="mb-4 text-sm tracking-wide uppercase text-muted-foreground">
          {t("greeting")}
        </p>
        <h1 className="mb-6 font-serif text-5xl leading-tight tracking-tight md:text-7xl">
          {t("name")}
        </h1>
        <p className="mb-4 text-2xl font-light text-foreground/90 md:text-3xl">
          {t("tagline")}
        </p>
        <p className="max-w-xl text-lg text-muted-foreground">{t("subtitle")}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-auto pb-8"
      >
        <ArrowDown className="h-5 w-5 animate-bounce text-muted-foreground" />
      </motion.div>
    </Section>
  );
}
