"use client";

import { useEffect, useRef, useState } from "react";
import { RollText } from "./fx";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Highlights" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    LINKS.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`slide-down fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? "border-b border-line bg-bg/70 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className="font-display text-lg font-extrabold tracking-tight"
            aria-label="Le Thanh Phuong — back to top"
          >
            LTP<span className="text-accent">.</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`link-sweep pb-1 font-mono text-[13px] uppercase tracking-[0.14em] transition-colors ${
                  active === l.href ? "text-ink" : "text-mute hover:text-ink"
                }`}
              >
                <RollText>{l.label}</RollText>
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="relative flex h-11 w-11 items-center justify-center md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span
              className={`absolute h-0.5 w-6 bg-ink transition-transform duration-300 ${
                open ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 bg-ink transition-transform duration-300 ${
                open ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>
        <div
          ref={bar}
          className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent"
        />
      </header>

      {/* mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-bg/95 px-8 backdrop-blur-xl transition-[opacity,visibility] duration-500 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2" aria-label="Mobile">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 py-2 font-display text-4xl font-extrabold tracking-tight transition-[transform,opacity] duration-500 sm:text-5xl"
              style={{
                transitionDelay: open ? `${80 + i * 60}ms` : "0ms",
                transform: open ? "none" : "translateY(24px)",
                opacity: open ? 1 : 0,
              }}
            >
              <span className="font-mono text-xs font-normal text-accent">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
