"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const finePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------- Reveal on scroll ---------- */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/* ---------- Magnetic wrapper ---------- */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span
      ref={ref}
      className={`inline-block transition-transform duration-300 ease-out ${className}`}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse" || reduced()) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate(${x}px, ${y}px)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
    >
      {children}
    </span>
  );
}

/* ---------- Spotlight + tilt card ---------- */
export function SpotlightCard({
  children,
  className = "",
  tilt = 5,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`spot ${className}`}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
        if (!reduced()) {
          el.style.setProperty("--rx", `${(0.5 - py) * tilt}deg`);
          el.style.setProperty("--ry", `${(px - 0.5) * tilt}deg`);
        }
      }}
      onPointerLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      }}
    >
      {children}
    </div>
  );
}

/* ---------- Count-up number ---------- */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1600;
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 4);
          el.textContent = `${Math.round(value * eased)}${suffix}`;
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, suffix]);
  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

/* ---------- Scramble text cycling through phrases ---------- */
const GLYPHS = "!<>-_\\/[]{}—=+*^?#01";

export function Scramble({ phrases, interval = 2800 }: { phrases: string[]; interval?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || phrases.length < 2) return;
    let idx = 0;
    let raf = 0;
    const run = (from: string, to: string) => {
      const len = Math.max(from.length, to.length);
      const queue = Array.from({ length: len }, (_, i) => {
        const start = Math.floor(Math.random() * 18);
        return {
          from: from[i] ?? "",
          to: to[i] ?? "",
          start,
          end: start + 10 + Math.floor(Math.random() * 18),
        };
      });
      let frame = 0;
      const step = () => {
        let out = "";
        let done = 0;
        for (const q of queue) {
          if (frame >= q.end) {
            done++;
            out += q.to;
          } else if (frame >= q.start) {
            out += q.to === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          } else {
            out += q.from;
          }
        }
        el.textContent = out;
        frame++;
        if (done < queue.length) raf = requestAnimationFrame(step);
      };
      cancelAnimationFrame(raf);
      step();
    };
    const timer = setInterval(() => {
      const next = (idx + 1) % phrases.length;
      run(phrases[idx], phrases[next]);
      idx = next;
    }, interval);
    return () => {
      clearInterval(timer);
      cancelAnimationFrame(raf);
    };
  }, [phrases, interval]);
  return (
    <span ref={ref} aria-label={phrases.join(", ")}>
      {phrases[0]}
    </span>
  );
}

/* ---------- Words that light up as you scroll ---------- */
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("span[data-w]"));
    if (reduced()) {
      spans.forEach((s) => (s.style.opacity = "1"));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.88;
      const end = vh * 0.3;
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height * 0.6)));
      const lit = p * spans.length;
      spans.forEach((s, i) => {
        const o = Math.min(1, Math.max(0.14, lit - i + 0.14));
        s.style.opacity = String(o);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} data-w style={{ opacity: 0.14, transition: "opacity 0.2s linear" }}>
          {w}{" "}
        </span>
      ))}
    </p>
  );
}

/* ---------- Cursor follower (desktop only) ---------- */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(mq.matches && !reduced());
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = ring.current;
    if (!enabled || !el) return;
    let x = -100, y = -100, tx = -100, ty = -100, scale = 1, ts = 1, raf = 0;
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = e.target as Element | null;
      ts = target?.closest("a, button, [data-cursor]") ? 2.4 : 1;
      el.style.opacity = "1";
    };
    const leave = () => (el.style.opacity = "0");
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      scale += (ts - scale) * 0.15;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div
      ref={ring}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] h-7 w-7 rounded-full border border-accent opacity-0 mix-blend-difference transition-opacity duration-300"
    />
  );
}

export { finePointer };
