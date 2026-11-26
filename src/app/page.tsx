import type { CSSProperties } from "react";
import Image from "next/image";
import avatar from "../../public/avatar.jpg";
import Experience from "@/components/Experience";
import HeroCanvas from "@/components/HeroCanvas";
import Nav from "@/components/Nav";
import Terminal from "@/components/Terminal";
import {
  Counter,
  Cursor,
  Magnetic,
  MaskWords,
  Reveal,
  RollText,
  Scramble,
  ScrollSlide,
  ScrollWords,
  SpotlightCard,
  type MaskPart,
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

function SectionHead({ index, label, title }: { index: string; label: string; title: MaskPart[] }) {
  return (
    <Reveal from="fade" className="mb-12 sm:mb-16 short:mb-10">
      <div className="flex items-center gap-4 font-mono text-[13px] uppercase tracking-[0.16em] text-mute">
        <span className="text-accent">{index}</span>
        <span className="draw h-px w-10 bg-accent/70" />
        <span>{label}</span>
      </div>
      {/* sized by width AND height so titles stay proportionate on short laptop screens */}
      <h2 className="mt-5 max-w-5xl text-balance font-display text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-[clamp(3rem,min(5.4vw,9.5svh),4.75rem)]">
        <MaskWords parts={title} />
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
            className={`px-5 font-display text-5xl font-extrabold uppercase tracking-tight sm:px-8 sm:text-7xl lg:text-8xl short:text-7xl ${
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
      {/* rows also slide sideways with the scroll, in opposite directions; -ml hides the left edge */}
      <ScrollSlide speed={reverse ? 0.18 : -0.18} className="-ml-56">
        <div className={`marquee ${reverse ? "reverse" : ""}`}>
          {row(false)}
          {row(true)}
        </div>
      </ScrollSlide>
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
        <section className="relative flex min-h-dvh flex-col justify-end overflow-hidden pb-10 pt-28 sm:pb-14 short:pb-6 short:pt-[4.5rem]">
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
              className="fade-up inline-flex items-center gap-3 rounded-full border border-line bg-panel/60 px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-ink/90 backdrop-blur"
              style={{ "--d": "100ms" } as CSSProperties}
            >
              <span className="pulse-dot h-2 w-2 rounded-full bg-mint" />
              <span className="hidden sm:inline">Synced · Healthy —</span> Open to full-stack roles
            </div>

            {/* capped by viewport height too, so name + intro + CTA fit one laptop screen */}
            <h1 className="mt-7 font-display text-[clamp(2.25rem,min(10.8vw,16svh),9.2rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em] short:mt-5">
              <span className="sr-only">{profile.name}</span>
              <ScrollSlide origin="top" speed={-0.22}>
                <HeroWord text="Le Thanh" />
              </ScrollSlide>
              <ScrollSlide origin="top" speed={0.22}>
                <HeroWord text="Phuong" offset={6} className="text-accent" />
              </ScrollSlide>
            </h1>

            <div className="mt-10 grid items-end gap-10 lg:mt-14 lg:grid-cols-12 short:mt-7">
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
                      <RollText>Get in touch</RollText> <Arrow />
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a
                      href={profile.cv}
                      download
                      className="group inline-flex items-center gap-3 rounded-full border border-line px-7 py-4 font-medium transition-colors hover:border-ink"
                    >
                      <RollText>Download CV</RollText>
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

            <div className="mt-12 hidden items-center justify-between font-mono text-xs uppercase tracking-[0.16em] text-mute sm:flex short:hidden">
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
        <section aria-label="Core technologies" className="space-y-2 border-y border-line py-8 sm:py-12 short:py-8">
          <MarqueeRow />
          <MarqueeRow reverse outline />
        </section>

        {/* ================= ABOUT ================= */}
        <section id="about" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:py-32 short:py-24">
          <SectionHead index="01" label="About" title={["From schema", ["to", "text-accent"], "cluster."]} />
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal from="clip" className="mx-auto w-full max-w-sm lg:col-span-4 lg:max-w-none">
              <figure className="group relative overflow-hidden rounded-2xl border border-line bg-panel">
                <Image
                  src={avatar}
                  alt={`Portrait of ${profile.name}`}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 400px, 384px"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/5 to-transparent"
                />
                <span aria-hidden className="pointer-events-none absolute left-4 top-4 h-5 w-5 border-l-2 border-t-2 border-accent" />
                <span aria-hidden className="pointer-events-none absolute right-4 top-4 h-5 w-5 border-r-2 border-t-2 border-accent" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 font-mono text-xs uppercase tracking-[0.12em]">
                  <span>
                    <span className="block text-ink">{profile.name}</span>
                    <span className="mt-1 block text-mute">{profile.role}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2 text-mint">
                    <span className="pulse-dot h-2 w-2 rounded-full bg-mint" />
                    Online
                  </span>
                </figcaption>
              </figure>
            </Reveal>
            <ScrollWords
              text={profile.statement}
              className="font-display text-2xl font-semibold leading-[1.25] tracking-tight sm:text-4xl lg:col-span-8 lg:text-4xl lg:leading-[1.2] xl:text-[2.6rem] xl:leading-[1.18] short:text-[2.15rem]"
            />
          </div>

          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-24 lg:grid-cols-4 short:mt-16">
            {stats.map((s, i) => (
              <Reveal key={s.label} from="scale" delay={i * 90} className="bg-bg p-6 sm:p-8">
                <div className="font-display text-5xl font-extrabold tracking-tight text-ink sm:text-6xl lg:text-7xl short:text-6xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-3 max-w-[15rem] text-[15px] leading-snug text-mute">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= HIGHLIGHTS ================= */}
        <section id="work" className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32 lg:pb-32 short:pb-24">
          <SectionHead index="02" label="Selected achievements" title={["Work I'm", ["proud", "outline-text"], "of."]} />
          <div className="grid gap-5 md:grid-cols-2">
            {achievements.map((a, i) => {
              const wide = achievements.length % 2 === 1 && i === achievements.length - 1;
              return (
              <Reveal
                key={a.title}
                from={wide ? "up" : i % 2 ? "right" : "left"}
                delay={(i % 2) * 120}
                className={wide ? "md:col-span-2" : ""}
              >
                <SpotlightCard className="h-full overflow-hidden rounded-3xl border border-line bg-panel p-7 sm:p-9">
                  <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em]">
                    <span className="text-mute">0{i + 1} / {a.tag}</span>
                    <span className="flex items-center gap-2 text-mint">
                      <span className="h-1.5 w-1.5 rounded-full bg-mint" /> shipped
                    </span>
                  </div>
                  <div className="mt-10 font-display text-4xl font-extrabold tracking-tight text-accent lg:text-5xl xl:text-6xl">
                    {a.metric}
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold tracking-tight sm:text-2xl">{a.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-mute">{a.body}</p>
                </SpotlightCard>
              </Reveal>
              );
            })}
          </div>
        </section>

        {/* ================= SKILLS ================= */}
        <section id="skills" className="border-y border-line bg-panel/40">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 short:py-24">
            <SectionHead index="03" label="Skills" title={["The", ["stack,", "text-accent"], "top to bottom."]} />
            <div className="border-t border-line">
              {skills.map((g, i) => (
                <Reveal key={g.group} from="left" delay={i * 70}>
                  <div className="grid gap-4 border-b border-line py-7 md:grid-cols-12 md:gap-8 md:py-8">
                    <div className="flex items-baseline gap-4 md:col-span-3">
                      <span className="font-mono text-[13px] text-accent">0{i + 1}</span>
                      <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{g.group}</h3>
                    </div>
                    <ul className="stagger flex flex-wrap gap-2 md:col-span-9">
                      {g.items.map((s, j) => (
                        <li
                          key={s}
                          style={{ "--i": j } as CSSProperties}
                          className="chip cursor-default rounded-full border border-line px-4 py-2 text-sm text-ink/90 lg:text-[15px]"
                        >
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
        <section id="experience" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:py-32 short:py-24">
          <SectionHead index="04" label="Experience" title={["Four years,", ["eleven", "outline-text"], "products."]} />
          <Experience jobs={jobs} />

          <div className="mt-20 grid gap-5 md:grid-cols-2 lg:mt-28 short:mt-20">
            <Reveal from="left">
              <SpotlightCard tilt={3} className="h-full rounded-3xl border border-line bg-panel p-7 sm:p-9">
                <div className="font-mono text-xs uppercase tracking-[0.14em] text-mute">Education</div>
                <h3 className="mt-5 font-display text-2xl font-bold tracking-tight sm:text-3xl">{education.school}</h3>
                <p className="mt-2 text-ink/90 lg:text-lg">{education.degree}</p>
                <p className="mt-4 font-mono text-[13px] text-mute">
                  {education.period} · {education.note}
                </p>
              </SpotlightCard>
            </Reveal>
            <Reveal from="right" delay={120}>
              <SpotlightCard tilt={3} className="h-full rounded-3xl border border-line bg-panel p-7 sm:p-9">
                <div className="font-mono text-xs uppercase tracking-[0.14em] text-mute">Languages</div>
                <dl className="mt-5 space-y-4">
                  {education.languages.map((l) => (
                    <div key={l.name}>
                      <dt className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{l.name}</dt>
                      <dd className="mt-1 text-[15px] leading-relaxed text-mute">{l.level}</dd>
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
          <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:py-32 short:py-24">
            <Reveal from="fade">
              <div className="flex items-center gap-4 font-mono text-[13px] uppercase tracking-[0.16em] text-mute">
                <span className="text-accent">05</span>
                <span className="draw h-px w-10 bg-accent/70" />
                <span>Contact</span>
              </div>
              <h2 className="mt-6 font-display text-[clamp(1.9rem,min(8.6vw,15svh),8rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]">
                <MaskWords parts={["Let's ship", "\n", ["something.", "text-accent"]]} />
              </h2>
            </Reveal>

            <Reveal from="left" delay={150} className="mt-12 sm:mt-16 short:mt-10">
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

            <Reveal delay={250} className="stagger mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {[
                { k: "Phone", v: profile.phone, href: profile.phoneHref },
                { k: "GitHub", v: profile.github, href: profile.githubHref },
                { k: "Location", v: profile.location },
              ].map((c, i) => {
                const order = { "--i": i * 2 } as CSSProperties;
                const inner = (
                  <>
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-mute">{c.k}</span>
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
                    style={order}
                    className="group flex flex-col bg-bg p-6 transition-colors hover:bg-panel sm:p-8"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={c.k} style={order} className="flex flex-col bg-bg p-6 sm:p-8">{inner}</div>
                );
              })}
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-5 py-8 font-mono text-xs uppercase tracking-[0.14em] text-mute sm:flex-row sm:items-center sm:px-8">
          <span>© 2026 {profile.name}</span>
          <span>Built with Next.js · Deployed the GitOps way</span>
          <a href="#top" className="link-sweep pb-1 text-ink">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
