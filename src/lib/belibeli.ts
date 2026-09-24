/** BeliBeli product ids + affiliate link helpers, shared by all pages. */

export const BELIBELI_PRODUCTS = {
  earnergyBox: "17510456",
  combo: "561547253",
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

/** The affiliate's personal share link: the whole site, e.g. earnergy.online/1234. */
export function affiliateShareUrl(origin: string, uplineCode: string): string {
  return `${origin}/${encodeURIComponent(normalizeUplineCode(uplineCode))}`;
}

/** Pages that carry the code in their URL, so a copied link still credits it. */
const CODE_IN_URL_PATHS = new Set(["/", "/products", "/join", "/contact"]);

/**
 * An internal link that keeps the reseller's code: "/" becomes "/1234",
 * "/join" becomes "/join/1234", and so on. Anything else (in-page anchors,
 * outside links) stays as it is.
 */
export function resellerPath(href: string, uplineCode: string | null | undefined): string {
  if (!uplineCode) return href;
  const hashAt = href.indexOf("#");
  const path = hashAt === -1 ? href : href.slice(0, hashAt);
  const hash = hashAt === -1 ? "" : href.slice(hashAt);
  if (!CODE_IN_URL_PATHS.has(path)) return href;
  const base = path === "/" ? "" : path;
  return `${base}/${encodeURIComponent(uplineCode)}${hash}`;
}

/* ── short-lived cache of the reseller code in play ─────────────────────
   Either the visitor's own code (activated on Home or Join Us) or the code
   of the reseller whose link brought them here. sessionStorage: survives
   page navigation, cleared when the tab closes. Every page reads it, so
   the code shows in the header and rides along on every buy link. */

const STORAGE_KEY = "earnergy.affiliate-code";
const CHANGE_EVENT = "earnergy:affiliate-change";

function emitAffiliateChange(): void {
  try {
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // non-browser environment — nothing is listening anyway
  }
}

export function storeAffiliateCode(code: string): void {
  try {
    const cleaned = code.trim().slice(0, MAX_CODE_LENGTH);
    if (cleaned.length > 0) sessionStorage.setItem(STORAGE_KEY, cleaned);
  } catch {
    // storage unavailable (private mode / blocked) — feature degrades silently
  }
  emitAffiliateChange();
}

export function clearAffiliateCode(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // storage unavailable — nothing to clear
  }
  emitAffiliateChange();
}

/** Lets the buy links react the moment a code is activated on the same page. */
export function subscribeAffiliateCode(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
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
