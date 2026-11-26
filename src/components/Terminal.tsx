"use client";

import { useEffect, useRef, useState } from "react";

type Line = { kind: "cmd" | "out" | "ok"; text: string };

const SCRIPT: Line[] = [
  { kind: "cmd", text: "kubectl get developer phuong -o wide" },
  { kind: "out", text: "NAME     ROLE         STATUS    AGE" },
  { kind: "out", text: "phuong   full-stack   Running   4y" },
  { kind: "cmd", text: "argocd app get career" },
  { kind: "out", text: "Services managed:  15+" },
  { kind: "ok", text: "Sync Status:       Synced" },
  { kind: "ok", text: "Health Status:     Healthy" },
  { kind: "cmd", text: "git log --oneline | wc -l   # infra, since 08/2026" },
  { kind: "out", text: "370+" },
];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");
  const [done, setDone] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((res) => timers.push(setTimeout(res, ms)));

    const play = async () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setLines(SCRIPT);
        setDone(true);
        return;
      }
      await wait(1100);
      for (const line of SCRIPT) {
        if (cancelled) return;
        if (line.kind === "cmd") {
          for (let i = 1; i <= line.text.length; i++) {
            if (cancelled) return;
            setTyping(line.text.slice(0, i));
            await wait(22 + Math.random() * 38);
          }
          await wait(320);
          setTyping("");
        } else {
          await wait(110);
        }
        setLines((l) => [...l, line]);
      }
      setDone(true);
    };
    play();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      ref={box}
      className="overflow-hidden rounded-2xl border border-line bg-panel/80 shadow-[0_30px_80px_-30px_rgba(255,90,54,0.35)] backdrop-blur-md"
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-mute lg:text-[13px]">phuong@prod-cluster — zsh</span>
      </div>
      <div
        className="min-h-[17.5rem] whitespace-pre-wrap break-words p-4 font-mono text-[12px] leading-relaxed sm:text-[13px] lg:min-h-[16.5rem] lg:text-sm short:min-h-[15.5rem] short:text-[13px]"
        aria-label="Terminal summary: full-stack developer, 4 years, 15+ services managed, synced and healthy"
      >
        {lines.map((l, i) => (
          <div
            key={i}
            className={
              l.kind === "cmd" ? "text-ink" : l.kind === "ok" ? "text-mint" : "text-mute"
            }
          >
            {l.kind === "cmd" && <span className="text-accent">❯ </span>}
            {l.text}
          </div>
        ))}
        <div className="text-ink">
          <span className="text-accent">❯ </span>
          {typing}
          {(typing || done || lines.length === 0) && <span className="caret" />}
        </div>
      </div>
    </div>
  );
}
