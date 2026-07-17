import type { CSSProperties } from "react";
import { Share2, ShoppingCart, Store, TrendingUp } from "lucide-react";
import { JOIN_STEPS, JOIN_STEPS_HEAD } from "@home/constants/join";
import { revealDelay } from "@home/utils/reveal";

const STEP_ICONS = {
  shop: ShoppingCart,
  business: Store,
  share: Share2,
  growth: TrendingUp,
} as const;

export function JoinSteps() {
  return (
    <section className="px-1 py-10 md:py-14">
      <div className="mb-10 grid items-start gap-6 md:grid-cols-[minmax(180px,0.9fr)_minmax(0,1.5fr)] md:gap-14">
        <p
          className="c-r-fade font-display text-sm font-bold uppercase tracking-[0.16em] text-black"
          style={revealDelay(0)}
        >
          {JOIN_STEPS_HEAD.tag} <span className="text-[#74c157]">•</span>
        </p>
        <div>
          <h2
            className="c-r-rise font-display text-2xl font-extrabold uppercase leading-tight tracking-[-0.01em] md:text-3xl"
            style={{ "--d": "0.1s" } as CSSProperties}
          >
            <span className="text-black">{JOIN_STEPS_HEAD.statementInk}</span>{" "}
            <span className="text-[#4f9e34]">{JOIN_STEPS_HEAD.statementDim}</span>
          </h2>
          <p
            className="c-r-fade mt-4 max-w-xl text-base leading-7 text-neutral-600"
            style={{ "--d": "0.18s" } as CSSProperties}
          >
            {JOIN_STEPS_HEAD.text}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5">
        {JOIN_STEPS.map((step, index) => {
          const Icon = STEP_ICONS[step.icon];
          return (
            <article
              key={step.no}
              className="c-r-rise group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_6px_22px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1.5 hover:border-[#74c157] hover:shadow-[0_28px_55px_-32px_rgba(79,158,52,0.55)]"
              style={revealDelay(index, 0.12, 0.09)}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-1 -top-3 font-display text-6xl font-extrabold text-neutral-100 transition duration-300 group-hover:text-[#74c157]/25"
              >
                {step.no}
              </span>
              <span className="relative mb-5 grid size-12 place-items-center rounded-2xl bg-[#74c157]/15 text-[#4f9e34] transition duration-300 group-hover:bg-[#74c157] group-hover:text-black">
                <Icon className="size-6" />
              </span>
              <h3 className="relative mb-2 font-display text-lg font-extrabold uppercase tracking-[-0.01em] text-black">
                {step.title}
              </h3>
              <p className="relative text-sm leading-6 text-neutral-600">
                {step.text}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
