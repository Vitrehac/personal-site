"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section } from "@/components/section";

export function CurrentFocusSection() {
  const t = useTranslations("home");

  return (
    <Section className="bg-muted/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl"
      >
        <h2 className="mb-6 font-serif text-3xl tracking-tight md:text-4xl">
          {t("currentFocus")}
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          {t("currentFocusText")}
        </p>
      </motion.div>
    </Section>
  );
}
