import { KeyRound } from "lucide-react";
import { AffiliateCodeForm } from "@home/components/ui/AffiliateCodeForm";
import { RESELLER_CODE_SECTION } from "@home/constants/reseller";

/* the same code console as Join Us, one scroll from the top: a reseller
   pastes their BeliBeli code and walks away with the whole site as their
   own share link */
export function ResellerCodeSection() {
  return (
    <section className="reseller-code" aria-labelledby="reseller-code-title">
      <div className="wrap">
        <div className="r2 relative overflow-clip rounded-[32px] bg-neutral-950 p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] md:p-10 lg:p-12">
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

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#74c157]/40 bg-[#74c157]/10 px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.1em] text-[#74c157] sm:tracking-[0.16em]">
                <KeyRound aria-hidden="true" className="size-3.5" />
                {RESELLER_CODE_SECTION.tag}
              </span>
              <h2
                id="reseller-code-title"
                className="font-display text-2xl font-extrabold leading-tight tracking-[-0.01em] text-white md:text-[2rem]"
              >
                <span className="text-[#74c157]">{RESELLER_CODE_SECTION.titleLead}</span>{" "}
                {RESELLER_CODE_SECTION.title}
              </h2>
              <p className="mt-4 font-display text-sm font-bold uppercase tracking-[0.16em] text-neutral-400 md:text-base">
                {RESELLER_CODE_SECTION.taglineDim}{" "}
                <span className="text-white">{RESELLER_CODE_SECTION.taglineInk}</span>
              </p>
            </div>

            <div className="border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
              <AffiliateCodeForm inputId="reseller-code" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
