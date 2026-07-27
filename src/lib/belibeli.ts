/** BeliBeli product ids + affiliate link helpers, shared by all pages. */

export const BELIBELI_PRODUCTS = {
  boxBites: "19069023",
  kofe: "18508099",
  buku: "19133918",
} as const;

/** Earnergy's own house code — used when no affiliate link is in play. */
export const DEFAULT_UPLINE_CODE = "5141";

const MAX_CODE_LENGTH = 64;

/** Trim + cap a pasted upline code; falls back to the house code when empty. */
export function normalizeUplineCode(code: string | null | undefined): string {
  const cleaned = (code ?? "").trim().slice(0, MAX_CODE_LENGTH);
  return cleaned.length > 0 ? cleaned : DEFAULT_UPLINE_CODE;
}

/** Product URL on BeliBeli carrying the given (or house) upline code. */
export function belibeliProductUrl(
  productId: string,
  uplineCode?: string | null,
): string {
  const code = normalizeUplineCode(uplineCode);
  return `https://belibeli.online/p/${productId}?uplinecode=${encodeURIComponent(code)}`;
}

/** The affiliate's personal share link on this site, e.g. /products/1234. */
export function affiliateShareUrl(origin: string, uplineCode: string): string {
  return `${origin}/products/${encodeURIComponent(normalizeUplineCode(uplineCode))}`;
}

/* ── short-lived cache of the visitor's own activated code ──────────────
   sessionStorage: survives page navigation, cleared when the tab closes.
   Lets /products redirect to /products/<their code> for the rest of the
   browsing session after they activate on the Join page. */

const STORAGE_KEY = "earnergy.affiliate-code";

export function storeAffiliateCode(code: string): void {
  try {
    const cleaned = code.trim().slice(0, MAX_CODE_LENGTH);
    if (cleaned.length > 0) sessionStorage.setItem(STORAGE_KEY, cleaned);
  } catch {
    // storage unavailable (private mode / blocked) — feature degrades silently
  }
}

export function getStoredAffiliateCode(): string | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const cleaned = raw?.trim().slice(0, MAX_CODE_LENGTH) ?? "";
    return cleaned.length > 0 ? cleaned : null;
  } catch {
    return null;
  }
}
