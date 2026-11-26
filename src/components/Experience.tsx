"use client";

import { useState } from "react";
import type { Job, Project } from "@/lib/data";
import { Reveal } from "./fx";

function ProjectRow({ p, defaultOpen }: { p: Project; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="group border-b border-line">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start gap-4 py-6 text-left sm:py-7"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-mute">
            <span>{p.period}</span>
            <span className="h-1 w-1 rounded-full bg-accent" />
            <span>{p.team}</span>
          </div>
          <h4
            className={`mt-2 font-display text-xl font-bold leading-tight tracking-tight transition-colors duration-300 sm:text-2xl lg:text-[1.7rem] ${
              open ? "text-accent" : "text-ink group-hover:text-accent"
            }`}
          >
            {p.title}
          </h4>
        </div>
        <span
          aria-hidden
          className={`relative mt-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-[transform,background,border-color] duration-500 ${
            open ? "rotate-45 border-accent bg-accent text-bg" : "border-line text-ink"
          }`}
        >
          <span className="absolute h-px w-4 bg-current" />
          <span className="absolute h-4 w-px bg-current" />
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden" inert={!open}>
          <div className="pb-8">
            {p.summary && (
              <p className="max-w-2xl text-[15px] leading-relaxed text-ink/90">{p.summary}</p>
            )}
            <ul className="mt-4 max-w-3xl space-y-3">
              {p.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-mute sm:text-[15px]">
                  <span className="mt-[0.6em] h-px w-4 shrink-0 bg-accent" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-ink/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience({ jobs }: { jobs: Job[] }) {
  return (
    <div className="space-y-20 lg:space-y-28">
      {jobs.map((job, j) => (
        <div key={job.company} className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal className="lg:sticky lg:top-28">
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {job.period}
              </div>
              <h3 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                {job.company}
              </h3>
              <p className="mt-3 text-mute">
                {job.role}
                <br />
                {job.place}
              </p>
              <p className="mt-6 font-mono text-xs text-mute">
                {String(job.projects.length).padStart(2, "0")} projects
              </p>
            </Reveal>
          </div>
          <div className="border-t border-line lg:col-span-8">
            {job.projects.map((p, i) => (
              <Reveal key={p.title} delay={Math.min(i, 3) * 60}>
                <ProjectRow p={p} defaultOpen={j === 0 && i === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
