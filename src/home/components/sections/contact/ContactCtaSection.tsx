import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { CONTACT_CTA } from "@home/constants/contact";

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
        <circle
          key={i}
          cx={flip ? 100 : 0}
          cy={100}
          r={20 + i * 14}
        />
      ))}
    </svg>
  );
}

export function ContactCtaSection() {
  return (
    <section className="c-r-scale relative overflow-hidden rounded-[32px] bg-[#74c157] p-8 text-black shadow-sm md:p-16">
      <CtaArcs />
      <CtaArcs flip />

      <div className="relative mx-auto flex w-full flex-col items-center gap-6 text-center">
        <h2
          className="c-r-rise max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-4xl"
          style={{ "--d": "0.1s" } as CSSProperties}
        >
          {CONTACT_CTA.title} <br className="hidden sm:block" />
          {CONTACT_CTA.titleLine2}
        </h2>

        <p
          className="c-r-fade max-w-4xl text-base leading-7 text-black/70"
          style={{ "--d": "0.2s" } as CSSProperties}
        >
          {CONTACT_CTA.description}
        </p>

        <div
          className="c-r-rise mt-2 flex w-full max-w-xl flex-col items-center justify-between gap-3 rounded-full bg-white p-2 shadow-sm sm:flex-row sm:pl-6"
          style={{ "--d": "0.32s" } as CSSProperties}
        >
          <span className="text-sm font-semibold text-black">
            {CONTACT_CTA.prompt}
          </span>

          <a
            href={CONTACT_CTA.buttonHref}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-white hover:text-black sm:w-auto"
          >
            {CONTACT_CTA.buttonLabel}
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
