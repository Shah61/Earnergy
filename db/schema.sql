-- Affiliate upline codes registered via the Join Us page.
-- The api/affiliate.ts function creates this automatically on first request,
-- so running this by hand in the Neon SQL editor is optional — it's here as
-- the single source of truth for what the table looks like.

CREATE TABLE IF NOT EXISTS affiliate_codes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  code TEXT NOT NULL,
  ip_hash TEXT,             -- salted SHA-256 of the client IP (raw IPs are never stored)
  user_agent TEXT,          -- truncated to 256 chars
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Each code is stored once; re-registering is a no-op.
CREATE UNIQUE INDEX IF NOT EXISTS affiliate_codes_code_key
  ON affiliate_codes (code);

-- Serves the per-IP rate-limit lookup.
CREATE INDEX IF NOT EXISTS affiliate_codes_ip_created_idx
  ON affiliate_codes (ip_hash, created_at);
