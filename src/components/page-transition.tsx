"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type PageTransitionProps = {
  children: ReactNode;
  className?: string;
};

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
