import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Copy, Link2 } from "lucide-react";
import { JOIN_AFFILIATE_FORM } from "@home/constants/join";
import { affiliateShareUrl, storeAffiliateCode } from "@/lib/belibeli";

type Status = "idle" | "submitting" | "success";

type AffiliateCodeFormProps = {
  /** id for the input, unique per page so the label stays linked */
  inputId: string;
};

/* the code console: paste a BeliBeli code, get your own share link back.
   Styled for a dark panel — used on Home and on Join Us. */
export function AffiliateCodeForm({ inputId }: AffiliateCodeFormProps) {
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
      setError("Please paste your code first.");
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

  if (status === "success") {
    return (
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
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor={inputId}
        className="mb-3 block font-display text-sm font-bold uppercase tracking-[0.12em] text-white"
      >
        {JOIN_AFFILIATE_FORM.label}
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <input
          id={inputId}
          name={inputId}
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
  );
}
