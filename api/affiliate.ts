import { createHash, timingSafeEqual } from "node:crypto";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * POST /api/affiliate
 * Body: { "code": "<upline code pasted by the visitor>" }
 *
 * Stores every upline code registered through the Join Us page.
 * No auth by design (public form) — hardened instead with:
 *   - strict method / content-type / origin checks
 *   - input length caps + control-character stripping (no format validation, per business rules)
 *   - parameterized SQL only (no injection surface)
 *   - per-IP rate limiting backed by Postgres (survives cold starts)
 *   - IPs stored only as salted SHA-256 hashes (privacy: raw IPs never persisted)
 *   - opaque error responses (internals only ever reach server logs)
 */

const MAX_CODE_LENGTH = 64;
const MAX_UA_LENGTH = 256;
const RATE_LIMIT_PER_HOUR = 30;
/** Verification runs on every affiliate page view, so it needs more headroom. */
const VERIFY_RATE_LIMIT_PER_HOUR = 240;

const STATIC_ALLOWED_ORIGINS = new Set([
  "https://earnergy.online",
  "https://www.earnergy.online",
  "http://localhost:5173",
  "http://localhost:5175",
  "http://localhost:3000",
]);

function isOriginAllowed(origin: string | undefined): boolean {
  // Non-browser clients (no Origin header) can't be CSRF'd — allow them.
  if (!origin) return true;
  if (STATIC_ALLOWED_ORIGINS.has(origin)) return true;
  // Extra origins (e.g. Vercel preview deploys), comma-separated in env.
  const extra = process.env.ALLOWED_ORIGINS;
  if (extra) {
    for (const allowed of extra.split(",")) {
      const trimmed = allowed.trim();
      if (trimmed.length === 0) continue;
      const a = Buffer.from(trimmed);
      const b = Buffer.from(origin);
      if (a.length === b.length && timingSafeEqual(a, b)) return true;
    }
  }
  return false;
}

function clientIp(req: VercelRequest): string {
  // Vercel sets x-forwarded-for itself; the first entry is the real client.
  const forwarded = req.headers["x-forwarded-for"];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return raw?.split(",")[0]?.trim() || "unknown";
}

function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? "earnergy-static-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

/** Strip control characters and cap length; deliberately no format validation. */
function sanitizeCode(input: unknown): string | null {
  if (typeof input !== "string") return null;
  // eslint-disable-next-line no-control-regex
  const cleaned = input.replace(/[\u0000-\u001f\u007f]/g, "").trim();
  if (cleaned.length === 0 || cleaned.length > MAX_CODE_LENGTH) return null;
  return cleaned;
}

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not configured");
  return neon(url);
}

/** Idempotent schema setup, run once per warm lambda instance. */
let schemaReady: Promise<void> | null = null;
function ensureSchema(sql: NeonQueryFunction<false, false>): Promise<void> {
  schemaReady ??= (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS affiliate_codes (
        id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        code TEXT NOT NULL,
        ip_hash TEXT,
        user_agent TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `;
    await sql`
      CREATE UNIQUE INDEX IF NOT EXISTS affiliate_codes_code_key
        ON affiliate_codes (code)
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS affiliate_codes_ip_created_idx
        ON affiliate_codes (ip_hash, created_at)
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS rate_limits (
        bucket TEXT PRIMARY KEY,
        hits INT NOT NULL DEFAULT 0,
        expires_at TIMESTAMPTZ NOT NULL
      )
    `;
  })().catch((error) => {
    schemaReady = null; // allow retry on next request
    throw error;
  });
  return schemaReady;
}

/**
 * Fixed-window counter, incremented atomically in one statement so concurrent
 * lambda instances can't race past the limit. Returns true when allowed.
 */
async function consumeRateLimit(
  sql: NeonQueryFunction<false, false>,
  bucket: string,
  limit: number,
  windowSeconds: number,
): Promise<boolean> {
  const [{ hits }] = (await sql`
    INSERT INTO rate_limits (bucket, hits, expires_at)
    VALUES (${bucket}, 1, now() + make_interval(secs => ${windowSeconds}))
    ON CONFLICT (bucket) DO UPDATE SET
      hits = CASE
        WHEN rate_limits.expires_at < now() THEN 1
        ELSE rate_limits.hits + 1
      END,
      expires_at = CASE
        WHEN rate_limits.expires_at < now()
          THEN now() + make_interval(secs => ${windowSeconds})
        ELSE rate_limits.expires_at
      END
    RETURNING hits
  `) as [{ hits: number }];
  return hits <= limit;
}

/** GET /api/affiliate?code=xxx → { ok, valid } — is this a registered code? */
async function handleVerify(req: VercelRequest, res: VercelResponse) {
  const code = sanitizeCode(
    Array.isArray(req.query.code) ? req.query.code[0] : req.query.code,
  );
  if (code === null) {
    return res.status(400).json({ ok: false, error: "Missing code" });
  }

  try {
    const sql = getSql();
    await ensureSchema(sql);

    const ipHash = hashIp(clientIp(req));
    const allowed = await consumeRateLimit(
      sql,
      `verify:${ipHash}`,
      VERIFY_RATE_LIMIT_PER_HOUR,
      3600,
    );
    if (!allowed) {
      res.setHeader("Retry-After", "3600");
      return res.status(429).json({ ok: false, error: "Too many requests" });
    }

    const rows = (await sql`
      SELECT 1 FROM affiliate_codes WHERE code = ${code} LIMIT 1
    `) as unknown[];

    return res.status(200).json({ ok: true, valid: rows.length > 0 });
  } catch (error) {
    console.error("affiliate verify error:", error);
    return res.status(500).json({ ok: false, error: "Something went wrong" });
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "GET") {
    return handleVerify(req, res);
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const origin = Array.isArray(req.headers.origin)
    ? req.headers.origin[0]
    : req.headers.origin;
  if (!isOriginAllowed(origin)) {
    return res.status(403).json({ ok: false, error: "Forbidden" });
  }

  const contentType = req.headers["content-type"] ?? "";
  if (!contentType.includes("application/json")) {
    return res.status(415).json({ ok: false, error: "Expected application/json" });
  }

  let body: unknown = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, error: "Invalid JSON body" });
    }
  }
  const code = sanitizeCode(
    body !== null && typeof body === "object"
      ? (body as Record<string, unknown>).code
      : null,
  );
  if (code === null) {
    return res.status(400).json({
      ok: false,
      error: `Please enter a code (up to ${MAX_CODE_LENGTH} characters)`,
    });
  }

  const ipHash = hashIp(clientIp(req));
  const userAgentHeader = req.headers["user-agent"];
  const userAgent =
    (Array.isArray(userAgentHeader) ? userAgentHeader[0] : userAgentHeader)
      ?.slice(0, MAX_UA_LENGTH) ?? null;

  try {
    const sql = getSql();
    await ensureSchema(sql);

    // Counted in rate_limits (not affiliate_codes) so that duplicate
    // submissions — which insert no row — still consume quota.
    const allowed = await consumeRateLimit(
      sql,
      `submit:${ipHash}`,
      RATE_LIMIT_PER_HOUR,
      3600,
    );
    if (!allowed) {
      res.setHeader("Retry-After", "3600");
      return res
        .status(429)
        .json({ ok: false, error: "Too many submissions — try again later" });
    }

    // Re-registering an existing code is treated as success (idempotent).
    await sql`
      INSERT INTO affiliate_codes (code, ip_hash, user_agent)
      VALUES (${code}, ${ipHash}, ${userAgent})
      ON CONFLICT (code) DO NOTHING
    `;

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("affiliate endpoint error:", error);
    return res.status(500).json({ ok: false, error: "Something went wrong" });
  }
}
