"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ProjectMeta, WorkMeta, PhotoMeta, TimelineEvent } from "@/lib/types";
import { useWindowManager } from "./use-window-manager";
import { Window } from "./window";
import { Dock } from "./dock";
import { MenuBar } from "./menu-bar";
import { AboutApp } from "./apps/about-app";
import { ProjectsApp } from "./apps/projects-app";
import { WorkApp } from "./apps/work-app";
import { PhotographyApp } from "./apps/photography-app";
import { TimelineApp } from "./apps/timeline-app";
import { ContactApp } from "./apps/contact-app";
import { TerminalApp } from "./apps/terminal-app";

interface DesktopProps {
  projects: ProjectMeta[];
  workEntries: WorkMeta[];
  photos: PhotoMeta[];
  timelineEvents: TimelineEvent[];
  locale: string;
}

export function Desktop({ projects, workEntries, photos, timelineEvents, locale }: DesktopProps) {
  const { windows, openWindow, closeWindow, minimizeWindow, bringToFront, updatePosition } = useWindowManager();

  const appContent: Record<string, React.ReactNode> = {
    about: <AboutApp />,
    projects: <ProjectsApp projects={projects} locale={locale} />,
    work: <WorkApp entries={workEntries} />,
    photography: <PhotographyApp photos={photos} />,
    timeline: <TimelineApp events={timelineEvents} locale={locale} />,
    contact: <ContactApp />,
    terminal: <TerminalApp />,
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-neutral-950">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-neutral-950 to-violet-950/30" />
        <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-indigo-500/[0.04] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 h-80 w-80 rounded-full bg-violet-500/[0.04] blur-3xl" />
      </div>

      <MenuBar />

      <div className="relative h-full w-full pb-20 pt-8">
        <div className="absolute left-6 top-14 flex flex-col gap-5">
          {([
            { id: "about" as const, label: "About.txt", icon: "i" },
            { id: "projects" as const, label: "Projects", icon: "📁" },
            { id: "terminal" as const, label: "Terminal", icon: ">_" },
          ]).map((item) => (
            <motion.button
              key={item.id}
              className="group flex flex-col items-center gap-1.5 rounded-lg p-2 transition-colors hover:bg-white/[0.06]"
              onDoubleClick={() => openWindow(item.id)}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/[0.06] backdrop-blur-sm">
                <span className="text-lg text-white/50">{item.icon}</span>
              </div>
              <span className="text-[10px] text-white/50 group-hover:text-white/70">{item.label}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {windows.map((win) =>
            win.isOpen && !win.isMinimized ? (
              <Window key={win.id} state={win} onClose={closeWindow} onMinimize={minimizeWindow} onFocus={bringToFront} onDragEnd={updatePosition}>
                {appContent[win.id]}
              </Window>
            ) : null
          )}
        </AnimatePresence>
      </div>

      <Dock windows={windows} onOpen={openWindow} />
    </div>
  );
}
