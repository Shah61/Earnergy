import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { JOIN_CTA } from "@home/constants/join";

function CtaArcs({ flip }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`c-cta-arc pointer-events-none absolute -bottom-8 size-56 text-black/12 ${flip ? "-right-8" : "-left-8"}`}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{ "--d": flip ? "0.18s" : "0.08s" } as CSSProperties}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <circle key={i} cx={flip ? 100 : 0} cy={100} r={20 + i * 14} />
      ))}
    </svg>
  );
}

export function JoinCta() {
  return (
    <section className="c-r-scale relative overflow-hidden rounded-[32px] bg-[#74c157] p-8 text-black shadow-sm md:p-16">
      <CtaArcs />
      <CtaArcs flip />

      <div className="relative mx-auto flex w-full flex-col items-center gap-6 text-center">
        <span
          className="c-r-fade inline-flex items-center gap-2 rounded-full bg-black/10 px-3 py-1 text-xs font-semibold"
          style={{ "--d": "0.04s" } as CSSProperties}
        >
          {JOIN_CTA.badge}
        </span>

        <h2
          className="c-r-rise max-w-4xl font-display text-3xl font-extrabold uppercase leading-tight tracking-[-0.02em] md:text-4xl"
          style={{ "--d": "0.1s" } as CSSProperties}
        >
          {JOIN_CTA.title}
          <br className="hidden sm:block" /> {JOIN_CTA.titleLine2}
        </h2>

        <p
          className="c-r-fade max-w-3xl text-base leading-7 text-black/70"
          style={{ "--d": "0.2s" } as CSSProperties}
        >
          {JOIN_CTA.description}
        </p>

        <div
          className="c-r-rise mt-2 flex w-full max-w-xl flex-col items-center justify-between gap-3 rounded-full bg-white p-2 shadow-sm sm:flex-row sm:pl-6"
          style={{ "--d": "0.32s" } as CSSProperties}
        >
          <span className="text-sm font-semibold text-black">
            {JOIN_CTA.prompt}
          </span>
          <Link
            to={JOIN_CTA.buttonHref}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-black px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] text-white transition duration-300 hover:bg-[#74c157] hover:text-black sm:w-auto"
          >
            {JOIN_CTA.buttonLabel}
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <Link
          to={JOIN_CTA.secondaryHref}
          className="c-r-fade text-sm font-semibold text-black/60 underline underline-offset-4 transition hover:text-black"
          style={{ "--d": "0.4s" } as CSSProperties}
        >
          {JOIN_CTA.secondaryLabel}
        </Link>
      </div>
    </section>
  );
}
