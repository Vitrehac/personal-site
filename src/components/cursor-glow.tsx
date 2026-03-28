"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 28 });
  const springY = useSpring(y, { stiffness: 280, damping: 28 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setVisible(true);
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const hide = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-50 h-[300px] w-[300px] rounded-full"
      style={{
        marginLeft: -150,
        marginTop: -150,
        left: springX,
        top: springY,
        background:
          "radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)",
      }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    />
  );
}
