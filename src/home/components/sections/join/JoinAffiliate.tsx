import { useRef, useState, type CSSProperties, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  Copy,
  KeyRound,
  Link2,
  Mail,
  ShoppingBag,
} from "lucide-react";
import {
  JOIN_AFFILIATE_FORM,
  JOIN_AFFILIATE_HEAD,
  JOIN_AFFILIATE_STEPS,
} from "@home/constants/join";
import { affiliateShareUrl, storeAffiliateCode } from "@/lib/belibeli";
import { revealDelay } from "@home/utils/reveal";

const STEP_ICONS = {
  buy: ShoppingBag,
  mail: Mail,
  paste: KeyRound,
} as const;

type Status = "idle" | "submitting" | "success";

function StepConnector() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center py-1 lg:py-0"
    >
      <span className="grid size-9 shrink-0 rotate-90 place-items-center rounded-full border border-[#74c157]/40 bg-[#74c157]/10 text-[#74c157] lg:rotate-0">
        <ArrowRight className="size-4" />
      </span>
    </div>
  );
}

export function JoinAffiliate() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const copyResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const trimmed = code.trim();
    if (trimmed.length === 0) {
      setError("Please paste your upline code first.");
      return;
    }

    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/affiliate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: trimmed }),
      });
      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || !data?.ok) {
        setStatus("idle");
        setError(data?.error ?? JOIN_AFFILIATE_FORM.errorGeneric);
        return;
      }

      storeAffiliateCode(trimmed);
      setShareUrl(affiliateShareUrl(window.location.origin, trimmed));
      setStatus("success");
    } catch {
      setStatus("idle");
      setError(JOIN_AFFILIATE_FORM.errorGeneric);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      if (copyResetRef.current) clearTimeout(copyResetRef.current);
      copyResetRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable (e.g. non-secure context) — leave the link selectable
    }
  }

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
        className="c-r-scale relative overflow-hidden rounded-[32px] bg-neutral-950 p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] md:p-10"
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

        <div className="relative grid gap-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch lg:gap-4">
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
          {status === "success" ? (
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#74c157] text-black">
                  <Check className="size-5" />
                </span>
                <h3 className="font-display text-lg font-extrabold uppercase tracking-[-0.01em] text-white md:text-xl">
                  {JOIN_AFFILIATE_FORM.successTitle}
                </h3>
              </div>
              <p className="mb-5 max-w-2xl text-sm leading-6 text-neutral-400">
                {JOIN_AFFILIATE_FORM.successText}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-2xl border border-[#74c157]/60 bg-[#74c157]/15 px-4 py-3.5">
                  <Link2 className="size-4 shrink-0 text-[#74c157]" />
                  <span className="truncate font-mono text-sm font-semibold text-white">
                    {shareUrl}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#74c157] px-6 py-3.5 text-sm font-bold text-black transition duration-300 hover:bg-white"
                >
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  {copied ? JOIN_AFFILIATE_FORM.copied : JOIN_AFFILIATE_FORM.copy}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="affiliate-code"
                className="mb-3 block font-display text-sm font-bold uppercase tracking-[0.12em] text-white"
              >
                {JOIN_AFFILIATE_FORM.label}
              </label>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <input
                  id="affiliate-code"
                  name="affiliate-code"
                  type="text"
                  autoComplete="off"
                  spellCheck={false}
                  maxLength={64}
                  value={code}
                  onChange={(event) => {
                    setCode(event.target.value);
                    if (error) setError(null);
                  }}
                  placeholder={JOIN_AFFILIATE_FORM.placeholder}
                  className="min-w-0 flex-1 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3.5 font-mono text-sm font-semibold text-white outline-none transition duration-300 placeholder:font-sans placeholder:font-normal placeholder:text-neutral-500 focus:border-[#74c157] focus:ring-2 focus:ring-[#74c157]/30"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#74c157] px-6 py-3.5 text-sm font-bold text-black transition duration-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting"
                    ? JOIN_AFFILIATE_FORM.buttonBusy
                    : JOIN_AFFILIATE_FORM.button}
                  <ArrowRight className="size-4" />
                </button>
              </div>
              {error ? (
                <p role="alert" className="mt-3 text-sm font-medium text-red-400">
                  {error}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
