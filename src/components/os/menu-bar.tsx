"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function MenuBar() {
  const t = useTranslations("home");
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    update();
    const interval = setInterval(update, 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[9999] flex h-8 items-center justify-between border-b border-white/[0.06] bg-neutral-900/50 px-5 backdrop-blur-2xl"
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
    >
      <span className="text-[11px] font-semibold tracking-wider text-white/70">{t("name")}</span>
      <span className="text-[11px] tabular-nums text-white/40">{time}</span>
    </motion.div>
  );
}
