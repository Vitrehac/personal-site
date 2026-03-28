"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Section } from "@/components/section";

export function ContactCTASection() {
  const t = useTranslations("home");

  return (
    <Section className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-xl"
      >
        <h2 className="mb-6 font-serif text-3xl tracking-tight md:text-4xl">
          {t("getInTouch")}
        </h2>
        <p className="mb-10 text-lg text-muted-foreground">
          {t("getInTouchText")}
        </p>
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
        >
          {t("getInTouch")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </Section>
  );
}
