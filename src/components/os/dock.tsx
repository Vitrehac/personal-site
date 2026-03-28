"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { User, FolderOpen, Briefcase, Camera, Clock, Mail, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WindowId, WindowState } from "./use-window-manager";

interface DockProps {
  windows: WindowState[];
  onOpen: (id: WindowId) => void;
}

const DOCK_ITEMS: { id: WindowId; label: string; icon: typeof User }[] = [
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "work", label: "Work", icon: Briefcase },
  { id: "photography", label: "Photos", icon: Camera },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "terminal", label: "Terminal", icon: Terminal },
];

function DockItem({ item, isOpen, mouseX, onOpen }: {
  item: (typeof DOCK_ITEMS)[number];
  isOpen: boolean;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return 200;
    return Math.abs(val - (rect.left + rect.width / 2));
  });

  const rawSize = useTransform(distance, [0, 120, 200], [56, 44, 44]);
  const size = useSpring(rawSize, { stiffness: 300, damping: 25 });
  const Icon = item.icon;

  return (
    <motion.button
      ref={ref}
      onClick={onOpen}
      className="group relative flex flex-col items-center"
      style={{ width: size, height: size }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        className={cn(
          "flex h-full w-full items-center justify-center rounded-xl",
          "bg-white/[0.08] backdrop-blur-sm border border-white/[0.06]",
          "group-hover:bg-white/[0.14] group-hover:border-white/[0.12] transition-colors"
        )}
        style={{ width: size, height: size }}
      >
        <Icon className="h-5 w-5 text-white/70 transition-colors group-hover:text-white/90" />
      </motion.div>
      <span className="pointer-events-none absolute -top-8 rounded-md bg-neutral-800/90 px-2.5 py-1 text-[10px] font-medium text-white/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
        {item.label}
      </span>
      {isOpen && <div className="absolute -bottom-1.5 h-1 w-1 rounded-full bg-white/50" />}
    </motion.button>
  );
}

export function Dock({ windows, onOpen }: DockProps) {
  const mouseX = useMotionValue(-200);

  return (
    <motion.div
      className="fixed bottom-3 left-1/2 z-[9999] flex items-end gap-2 rounded-2xl border border-white/[0.08] bg-neutral-900/60 px-3 py-2 backdrop-blur-2xl"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ translateX: "-50%" }}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(-200)}
    >
      {DOCK_ITEMS.map((item) => {
        const win = windows.find((w) => w.id === item.id);
        return (
          <DockItem key={item.id} item={item} isOpen={win?.isOpen ?? false} mouseX={mouseX} onOpen={() => onOpen(item.id)} />
        );
      })}
    </motion.div>
  );
}
