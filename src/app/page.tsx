import type { CSSProperties, ReactNode } from "react";
import Experience from "@/components/Experience";
import HeroCanvas from "@/components/HeroCanvas";
import Nav from "@/components/Nav";
import Terminal from "@/components/Terminal";
import {
  Counter,
  Cursor,
  Magnetic,
  Reveal,
  Scramble,
  ScrollWords,
  SpotlightCard,
} from "@/components/fx";
import {
  achievements,
  education,
  jobs,
  marquee,
  profile,
  skills,
  stats,
} from "@/lib/data";

function HeroWord({ text, offset = 0, className = "" }: { text: string; offset?: number; className?: string }) {
  return (
    <span className={`hero-line ${className}`} aria-hidden>
      {text.split("").map((ch, i) => (
        <span key={i} className="hero-letter" style={{ "--i": i + offset } as CSSProperties}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

function SectionHead({ index, label, title }: { index: string; label: string; title: ReactNode }) {
  return (
    <Reveal className="mb-12 sm:mb-16">
      <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-mute">
        <span className="text-accent">{index}</span>
        <span className="h-px w-10 bg-line" />
        <span>{label}</span>
      </div>
      <h2 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-7xl">
        {title}
      </h2>
    </Reveal>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
      <path d="M2 12 12 2M4.5 2H12v7.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function MarqueeRow({ reverse = false, outline = false }: { reverse?: boolean; outline?: boolean }) {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {marquee.map((m) => (
        <span key={m} className="flex items-center">
          <span
            className={`px-5 font-display text-5xl font-extrabold uppercase tracking-tight sm:px-8 sm:text-7xl lg:text-8xl ${
              outline ? "outline-text" : "text-ink"
            }`}
          >
            {m}
          </span>
          <span className="text-2xl text-accent sm:text-4xl">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden">
      <div className={`marquee ${reverse ? "reverse" : ""}`}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <div className="grain" aria-hidden />
      <Cursor />
      <Nav />

      <main id="top">
        {/* ================= HERO ================= */}
        <section className="relative flex min-h-dvh flex-col justify-end overflow-hidden pb-10 pt-28 sm:pb-14">
          <HeroCanvas />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_75%_20%,rgba(255,90,54,0.16),transparent_70%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-bg to-transparent"
          />

          <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
            <div
              className="fade-up inline-flex items-center gap-3 rounded-full border border-line bg-panel/60 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/90 backdrop-blur"
              style={{ "--d": "100ms" } as CSSProperties}
            >
              <span className="pulse-dot h-2 w-2 rounded-full bg-mint" />
              <span className="hidden sm:inline">Synced · Healthy —</span> Open to full-stack roles
            </div>

            <h1 className="mt-7 font-display text-[clamp(2rem,10.8vw,9.2rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em]">
              <span className="sr-only">{profile.name}</span>
              <HeroWord text="Le Thanh" />
              <HeroWord text="Phuong" offset={6} className="text-accent" />
            </h1>

            <div className="mt-10 grid items-end gap-10 lg:mt-14 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p
                  className="fade-up font-mono text-sm text-mint sm:text-base"
                  style={{ "--d": "900ms" } as CSSProperties}
                >
                  <span className="text-mute">{"// "}</span>
                  <Scramble phrases={profile.roles} />
                </p>
                <p
                  className="fade-up mt-4 max-w-xl text-lg leading-relaxed text-ink/85 sm:text-xl"
                  style={{ "--d": "1050ms" } as CSSProperties}
                >
                  {profile.intro}
                </p>
                <div
                  className="fade-up mt-8 flex flex-wrap items-center gap-4"
                  style={{ "--d": "1200ms" } as CSSProperties}
                >
                  <Magnetic>
                    <a
                      href="#contact"
                      className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 font-medium text-bg transition-colors hover:bg-ink"
                    >
                      Get in touch <Arrow />
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a
                      href={profile.cv}
                      download
                      className="group inline-flex items-center gap-3 rounded-full border border-line px-7 py-4 font-medium transition-colors hover:border-ink"
                    >
                      Download CV
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">
                        <path d="M7 1v9M3 6.5 7 10.5l4-4M1.5 13h11" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                    </a>
                  </Magnetic>
                </div>
              </div>
              <div
                className="fade-up lg:col-span-5"
                style={{ "--d": "1350ms" } as CSSProperties}
              >
                <Terminal />
              </div>
            </div>

            <div className="mt-12 hidden items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-mute sm:flex">
              <span>{profile.location}</span>
              <span className="flex items-center gap-3">
                Scroll
                <span className="relative h-8 w-px overflow-hidden bg-line">
                  <span className="absolute inset-x-0 top-0 h-3 animate-[scrollhint_1.8s_ease-in-out_infinite] bg-accent" />
                </span>
              </span>
            </div>
          </div>
        </section>

        {/* ================= MARQUEE ================= */}
        <section aria-label="Core technologies" className="space-y-2 border-y border-line py-8 sm:py-12">
          <MarqueeRow />
          <MarqueeRow reverse outline />
        </section>

        {/* ================= ABOUT ================= */}
        <section id="about" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
          <SectionHead index="01" label="About" title={<>From schema <span className="text-accent">to</span> cluster.</>} />
          <ScrollWords
            text={profile.statement}
            className="max-w-5xl font-display text-2xl font-semibold leading-[1.25] tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.18]"
          />

          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-24 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90} className="bg-bg p-6 sm:p-8">
                <div className="font-display text-5xl font-extrabold tracking-tight text-ink sm:text-6xl lg:text-7xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-3 max-w-[14rem] text-sm leading-snug text-mute">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= HIGHLIGHTS ================= */}
        <section id="work" className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32 lg:pb-40">
          <SectionHead index="02" label="Selected achievements" title={<>Work I&apos;m <span className="outline-text">proud</span> of.</>} />
          <div className="grid gap-5 md:grid-cols-2">
            {achievements.map((a, i) => (
              <Reveal
                key={a.title}
                delay={(i % 2) * 120}
                className={achievements.length % 2 === 1 && i === achievements.length - 1 ? "md:col-span-2" : ""}
              >
                <SpotlightCard className="h-full overflow-hidden rounded-3xl border border-line bg-panel p-7 sm:p-9">
                  <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em]">
                    <span className="text-mute">0{i + 1} / {a.tag}</span>
                    <span className="flex items-center gap-2 text-mint">
                      <span className="h-1.5 w-1.5 rounded-full bg-mint" /> shipped
                    </span>
                  </div>
                  <div className="mt-10 font-display text-4xl font-extrabold tracking-tight text-accent lg:text-5xl xl:text-6xl">
                    {a.metric}
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold tracking-tight sm:text-2xl">{a.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mute">{a.body}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= SKILLS ================= */}
        <section id="skills" className="border-y border-line bg-panel/40">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
            <SectionHead index="03" label="Skills" title={<>The <span className="text-accent">stack</span>, top to bottom.</>} />
            <div className="border-t border-line">
              {skills.map((g, i) => (
                <Reveal key={g.group} delay={i * 60}>
                  <div className="grid gap-4 border-b border-line py-7 md:grid-cols-12 md:gap-8 md:py-9">
                    <div className="flex items-baseline gap-4 md:col-span-3">
                      <span className="font-mono text-xs text-accent">0{i + 1}</span>
                      <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{g.group}</h3>
                    </div>
                    <ul className="flex flex-wrap gap-2 md:col-span-9">
                      {g.items.map((s) => (
                        <li key={s} className="chip cursor-default rounded-full border border-line px-4 py-2 text-sm text-ink/85">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= EXPERIENCE ================= */}
        <section id="experience" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
          <SectionHead index="04" label="Experience" title={<>Four years, <span className="outline-text">eleven</span> products.</>} />
          <Experience jobs={jobs} />

          <div className="mt-20 grid gap-5 md:grid-cols-2 lg:mt-28">
            <Reveal>
              <SpotlightCard tilt={3} className="h-full rounded-3xl border border-line bg-panel p-7 sm:p-9">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">Education</div>
                <h3 className="mt-5 font-display text-2xl font-bold tracking-tight sm:text-3xl">{education.school}</h3>
                <p className="mt-2 text-ink/85">{education.degree}</p>
                <p className="mt-4 font-mono text-xs text-mute">
                  {education.period} · {education.note}
                </p>
              </SpotlightCard>
            </Reveal>
            <Reveal delay={120}>
              <SpotlightCard tilt={3} className="h-full rounded-3xl border border-line bg-panel p-7 sm:p-9">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">Languages</div>
                <dl className="mt-5 space-y-4">
                  {education.languages.map((l) => (
                    <div key={l.name}>
                      <dt className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{l.name}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-mute">{l.level}</dd>
                    </div>
                  ))}
                </dl>
              </SpotlightCard>
            </Reveal>
          </div>
        </section>

        {/* ================= CONTACT ================= */}
        <section id="contact" className="relative overflow-hidden border-t border-line">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_110%,rgba(255,90,54,0.28),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
            <Reveal>
              <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-mute">
                <span className="text-accent">05</span>
                <span className="h-px w-10 bg-line" />
                <span>Contact</span>
              </div>
              <h2 className="mt-6 font-display text-[clamp(1.9rem,8.6vw,8rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]">
                Let&apos;s ship
                <br />
                <span className="text-accent">something.</span>
              </h2>
            </Reveal>

            <Reveal delay={150} className="mt-12 sm:mt-16">
              <Magnetic strength={0.15}>
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex max-w-full items-center gap-3 break-all font-display text-[clamp(0.85rem,4.2vw,2.25rem)] font-bold tracking-tight"
                >
                  <span className="link-sweep pb-1">{profile.email}</span>
                  <span className="shrink-0 text-accent"><Arrow /></span>
                </a>
              </Magnetic>
            </Reveal>

            <Reveal delay={250} className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {[
                { k: "Phone", v: profile.phone, href: profile.phoneHref },
                { k: "GitHub", v: profile.github, href: profile.githubHref },
                { k: "Location", v: profile.location },
              ].map((c) => {
                const inner = (
                  <>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">{c.k}</span>
                    <span className="mt-2 flex items-center gap-2 text-lg font-medium">
                      {c.v}
                      {c.href && <Arrow />}
                    </span>
                  </>
                );
                return c.href ? (
                  <a
                    key={c.k}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex flex-col bg-bg p-6 transition-colors hover:bg-panel sm:p-8"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={c.k} className="flex flex-col bg-bg p-6 sm:p-8">{inner}</div>
                );
              })}
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-5 py-8 font-mono text-[11px] uppercase tracking-[0.18em] text-mute sm:flex-row sm:items-center sm:px-8">
          <span>© 2026 {profile.name}</span>
          <span>Built with Next.js · Deployed the GitOps way</span>
          <a href="#top" className="link-sweep pb-1 text-ink">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
