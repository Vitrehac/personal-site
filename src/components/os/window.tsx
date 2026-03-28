"use client";

import { motion, useDragControls, AnimatePresence } from "framer-motion";
import { X, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WindowState, WindowId } from "./use-window-manager";

interface WindowProps {
  state: WindowState;
  onClose: (id: WindowId) => void;
  onMinimize: (id: WindowId) => void;
  onFocus: (id: WindowId) => void;
  onDragEnd: (id: WindowId, pos: { x: number; y: number }) => void;
  children: React.ReactNode;
}

export function Window({ state, onClose, onMinimize, onFocus, onDragEnd, children }: WindowProps) {
  const dragControls = useDragControls();
  const isVisible = state.isOpen && !state.isMinimized;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            "absolute flex flex-col overflow-hidden rounded-xl",
            "border border-white/[0.08] bg-neutral-900/92 shadow-2xl shadow-black/50 backdrop-blur-2xl"
          )}
          style={{
            width: state.size.width,
            height: state.size.height,
            zIndex: state.zIndex,
            left: 0,
            top: 0,
            x: state.position.x,
            y: state.position.y,
          }}
          initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          drag
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          dragElastic={0}
          onPointerDown={() => onFocus(state.id)}
          onDragEnd={(_, info) => {
            onDragEnd(state.id, {
              x: state.position.x + info.offset.x,
              y: state.position.y + info.offset.y,
            });
          }}
        >
          <div
            className="flex h-10 shrink-0 cursor-grab items-center justify-between border-b border-white/[0.06] px-4 active:cursor-grabbing"
            onPointerDown={(e) => {
              onFocus(state.id);
              dragControls.start(e);
            }}
            style={{ touchAction: "none" }}
          >
            <span className="select-none text-[11px] font-medium tracking-wider uppercase text-white/40">
              {state.title}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => { e.stopPropagation(); onMinimize(state.id); }}
                className="flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-white/10"
              >
                <Minus className="h-3 w-3 text-white/30" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onClose(state.id); }}
                className="flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-red-500/70"
              >
                <X className="h-3 w-3 text-white/30 hover:text-white" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain p-5 text-[13px] leading-relaxed text-white/75">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
