"use client";

import { useState, useCallback } from "react";

export type WindowId =
  | "about"
  | "projects"
  | "work"
  | "photography"
  | "timeline"
  | "contact"
  | "terminal";

export interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

const DEFAULT_WINDOWS: WindowState[] = [
  { id: "about", title: "About", isOpen: false, isMinimized: false, zIndex: 0, position: { x: 80, y: 60 }, size: { width: 520, height: 460 } },
  { id: "projects", title: "Projects", isOpen: false, isMinimized: false, zIndex: 0, position: { x: 160, y: 80 }, size: { width: 640, height: 500 } },
  { id: "work", title: "Work", isOpen: false, isMinimized: false, zIndex: 0, position: { x: 200, y: 100 }, size: { width: 560, height: 440 } },
  { id: "photography", title: "Photography", isOpen: false, isMinimized: false, zIndex: 0, position: { x: 120, y: 50 }, size: { width: 680, height: 520 } },
  { id: "timeline", title: "Timeline", isOpen: false, isMinimized: false, zIndex: 0, position: { x: 240, y: 70 }, size: { width: 520, height: 560 } },
  { id: "contact", title: "Contact", isOpen: false, isMinimized: false, zIndex: 0, position: { x: 300, y: 120 }, size: { width: 440, height: 380 } },
  { id: "terminal", title: "Terminal", isOpen: false, isMinimized: false, zIndex: 0, position: { x: 180, y: 140 }, size: { width: 560, height: 380 } },
];

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>(DEFAULT_WINDOWS);
  const [topZ, setTopZ] = useState(1);

  const bringToFront = useCallback(
    (id: WindowId) => {
      setTopZ((z) => z + 1);
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, zIndex: topZ + 1 } : w))
      );
    },
    [topZ]
  );

  const openWindow = useCallback(
    (id: WindowId) => {
      setTopZ((z) => z + 1);
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? { ...w, isOpen: true, isMinimized: false, zIndex: topZ + 1 }
            : w
        )
      );
    },
    [topZ]
  );

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w))
    );
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  }, []);

  const updatePosition = useCallback(
    (id: WindowId, position: { x: number; y: number }) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, position } : w))
      );
    },
    []
  );

  return { windows, openWindow, closeWindow, minimizeWindow, bringToFront, updatePosition };
}
