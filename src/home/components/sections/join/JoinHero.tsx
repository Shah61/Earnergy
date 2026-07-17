import type { CSSProperties, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import { JOIN_HERO, JOIN_LEVELS } from "@home/constants/join";
import { revealDelay } from "@home/utils/reveal";

function scrollToSystem(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  document.getElementById("circle-system")?.scrollIntoView({
    behavior: prefersReduced ? "auto" : "smooth",
    block: "start",
  });
}

function PotentialTeaser() {
  return (
    <div
      className="c-r-slide-r relative"
      style={{ "--d": "0.3s" } as CSSProperties}
    >
      <div className="rounded-[28px] border border-neutral-200 bg-neutral-50/70 p-6 md:p-7">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">
          {JOIN_HERO.teaserLabel}
        </p>

        {JOIN_LEVELS.map((level, index) => (
          <div
            key={level.id}
            className="flex items-center gap-3 border-b border-neutral-200/70 py-2.5 last:border-0"
            style={
              {
                "--acc": level.accent,
                "--acc-deep": level.accentDeep,
                "--d": `${0.4 + index * 0.08}s`,
              } as CSSProperties
            }
          >
            <span className="grid size-8 flex-none place-items-center rounded-lg bg-[var(--acc)] font-display text-xs font-extrabold text-white">
              {level.id}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="truncate font-semibold text-black">
                  {level.name}
                </span>
                <span className="font-display font-extrabold text-[var(--acc-deep)]">
                  RM{level.potential.toLocaleString("en-US")}
                </span>
              </div>
              <div className="j-bar mt-1.5">
                <span
                  className="j-bar-fill"
                  style={{ "--w": `${level.bar}%` } as CSSProperties}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="j-sticker" aria-hidden="true">
        <span>
          {JOIN_HERO.sticker.line1}
          <br />
          {JOIN_HERO.sticker.line2}
          <br />
          {JOIN_HERO.sticker.line3}
        </span>
      </div>
    </div>
  );
}

export function JoinHero() {
  return (
    <section className="c-r-scale relative overflow-hidden rounded-[32px] border border-neutral-200 bg-white p-8 shadow-[0_6px_22px_rgba(0,0,0,0.04)] md:p-12">
      <div
        aria-hidden="true"
        className="c-hero-deco pointer-events-none absolute -left-10 -top-10 size-40 rounded-full bg-[#74c157]/12"
        style={
          {
            "--d": "0.1s",
            "--float-dur": "8s",
            "--float-delay": "0.2s",
          } as CSSProperties
        }
      />
      <div
        aria-hidden="true"
        className="c-hero-deco pointer-events-none absolute left-16 -top-6 size-16 rounded-2xl bg-[#74c157]/20"
        style={
          {
            "--d": "0.18s",
            "--float-dur": "6.5s",
            "--float-delay": "0.5s",
          } as CSSProperties
        }
      />
      <div
        aria-hidden="true"
        className="c-hero-deco pointer-events-none absolute -left-2 top-24 size-8 rounded-full bg-[#74c157]/35"
        style={
          {
            "--d": "0.26s",
            "--float-dur": "5.5s",
            "--float-delay": "0.8s",
          } as CSSProperties
        }
      />

      <div className="relative grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <span
            className="c-r-fade mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600"
            style={revealDelay(0)}
          >
            <span className="j-dot size-2 rounded-full bg-[#74c157]" />
            {JOIN_HERO.badge}
          </span>

          <h1
            className="c-r-rise font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-[-0.02em] text-black md:text-5xl"
            style={{ "--d": "0.1s" } as CSSProperties}
          >
            {JOIN_HERO.titleL1}
            <br />
            <span className="text-[#4f9e34]">{JOIN_HERO.titleL2}</span>
            <br />
            {JOIN_HERO.titleL3}
          </h1>

          <p
            className="c-r-fade mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-sm font-bold uppercase tracking-[0.08em] text-neutral-500"
            style={{ "--d": "0.2s" } as CSSProperties}
          >
            {JOIN_HERO.lead.map((word, index) => (
              <span key={word} className="flex items-center gap-2">
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-[#74c157]"
                  />
                )}
                {word}
              </span>
            ))}
          </p>

          <p
            className="c-r-fade mt-5 max-w-md text-base leading-7 text-neutral-600"
            style={{ "--d": "0.28s" } as CSSProperties}
          >
            {JOIN_HERO.description}
          </p>

          <div
            className="c-r-rise mt-8 flex flex-col gap-3 sm:flex-row"
            style={{ "--d": "0.36s" } as CSSProperties}
          >
            <a
              href={JOIN_HERO.primaryCta.href}
              onClick={scrollToSystem}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#74c157] px-6 py-3.5 font-bold text-black shadow-[0_16px_30px_-16px_rgba(79,158,52,0.7)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#67b54c]"
            >
              {JOIN_HERO.primaryCta.label}
              <ArrowDown className="size-4" />
            </a>
            <Link
              to={JOIN_HERO.secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3.5 font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:border-black hover:bg-black hover:text-white"
            >
              {JOIN_HERO.secondaryCta.label}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <PotentialTeaser />
      </div>
    </section>
  );
}
