import type { CSSProperties } from "react";
import { ArrowRight, KeyRound, Mail, ShoppingBag, TrendingUp } from "lucide-react";
import { JOIN_AFFILIATE_HEAD, JOIN_AFFILIATE_STEPS } from "@home/constants/join";
import { AffiliateCodeForm } from "@home/components/ui/AffiliateCodeForm";
import { revealDelay } from "@home/utils/reveal";

const STEP_ICONS = {
  buy: ShoppingBag,
  mail: Mail,
  track: TrendingUp,
  paste: KeyRound,
} as const;

function StepConnector() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center py-1 xl:py-0"
    >
      <span className="grid size-9 shrink-0 rotate-90 place-items-center rounded-full border border-[#74c157]/40 bg-[#74c157]/10 text-[#74c157] xl:rotate-0">
        <ArrowRight className="size-4" />
      </span>
    </div>
  );
}

export function JoinAffiliate() {
  return (
    <section id="affiliate" className="px-1 py-10 md:py-14">
      <div className="mb-10 grid items-start gap-6 md:grid-cols-[minmax(180px,0.9fr)_minmax(0,1.5fr)] md:gap-14">
        <p
          className="c-r-fade font-display text-sm font-bold uppercase tracking-[0.16em] text-black"
          style={revealDelay(0)}
        >
          {JOIN_AFFILIATE_HEAD.tag} <span className="text-[#74c157]">•</span>
        </p>
        <div>
          <h2
            className="c-r-rise font-display text-2xl font-extrabold uppercase leading-tight tracking-[-0.01em] md:text-3xl"
            style={{ "--d": "0.1s" } as CSSProperties}
          >
            <span className="text-black">{JOIN_AFFILIATE_HEAD.statementInk}</span>{" "}
            <span className="text-[#4f9e34]">{JOIN_AFFILIATE_HEAD.statementDim}</span>
          </h2>
          <p
            className="c-r-fade mt-4 max-w-xl text-base leading-7 text-neutral-600"
            style={{ "--d": "0.18s" } as CSSProperties}
          >
            {JOIN_AFFILIATE_HEAD.text}
          </p>
        </div>
      </div>

      {/* dark journey panel: steps + code field in one console */}
      <div
        className="c-r-scale relative overflow-clip rounded-[32px] bg-neutral-950 p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] md:p-10"
        style={{ "--d": "0.2s" } as CSSProperties}
      >
        {/* ambient glows + dot grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-[#74c157]/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -right-20 size-80 rounded-full bg-[#4f9e34]/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        <div className="relative grid gap-2 xl:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] xl:items-stretch xl:gap-3">
          {JOIN_AFFILIATE_STEPS.map((step, index) => {
            const Icon = STEP_ICONS[step.icon];
            return [
              index > 0 ? <StepConnector key={`sep-${step.no}`} /> : null,
              <article
                key={step.no}
                className="c-r-rise group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#74c157]/60 hover:bg-white/[0.07]"
                style={revealDelay(index, 0.26, 0.1)}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-5 font-display text-7xl font-extrabold text-white/5 transition duration-300 group-hover:text-[#74c157]/20"
                >
                  {step.no}
                </span>

                <div className="relative mb-5 flex items-center gap-3">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#74c157] to-[#4f9e34] text-black shadow-[0_10px_24px_-8px_rgba(116,193,87,0.7)] transition duration-300 group-hover:scale-110">
                    <Icon className="size-6" />
                  </span>
                  <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#74c157]">
                    Step {step.no}
                  </span>
                </div>

                <h3 className="relative mb-2 font-display text-lg font-extrabold uppercase tracking-[-0.01em] text-white">
                  {step.title}
                </h3>
                <p className="relative text-sm leading-6 text-neutral-400">
                  {step.text}
                </p>
              </article>,
            ];
          })}
        </div>

        {/* the code console */}
        <div className="relative mt-8 border-t border-white/10 pt-8">
          <AffiliateCodeForm inputId="affiliate-code" />
        </div>
      </div>
    </section>
  );
}
