"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

interface TerminalLine {
  type: "input" | "output";
  text: string;
}

export function TerminalApp() {
  const t = useTranslations("home");
  const name = t("name");

  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", text: `Welcome to ${name}'s terminal.` },
    { type: "output", text: 'Type "help" to see available commands.\n' },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const responses: Record<string, string> = {
      help: "Available commands: help, about, projects, contact, whoami, clear",
      about: "Student founder, builder, explorer. Building things that matter.\nType 'projects' to see what I've been working on.",
      projects: "1. Validation Camp — Start IT @CSOB (08/2024)\n   Startup: ExpectUp | Topic: ESG Reporting (B2B)",
      contact: "Email: hello@example.com\nLinkedIn: linkedin.com/in/yourprofile",
      whoami: name,
    };

    const newLines: TerminalLine[] = [...lines, { type: "input", text: `$ ${cmd}` }];

    if (trimmed === "clear") {
      setLines([]);
      return;
    }

    const response = responses[trimmed] || `Command not found: ${trimmed}. Type "help".`;
    newLines.push({ type: "output", text: response });
    setLines(newLines);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    processCommand(input);
    setInput("");
  };

  return (
    <div className="flex h-full flex-col font-mono">
      <div className="flex-1 space-y-0.5 overflow-y-auto">
        {lines.map((line, i) => (
          <div key={i} className={line.type === "input" ? "text-indigo-300/80" : "whitespace-pre-wrap text-white/50"}>
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
        <span className="text-indigo-300/60">$</span>
        <input value={input} onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-white/80 caret-indigo-400 outline-none placeholder:text-white/20"
          placeholder="type a command..." autoFocus
        />
      </form>
    </div>
  );
}
