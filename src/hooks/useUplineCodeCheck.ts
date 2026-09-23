import { useEffect, useState } from 'react'
import { getStoredAffiliateCode, storeAffiliateCode } from '@/lib/belibeli'

export type CodeCheck = 'checking' | 'ok' | 'rejected'

type Verdict = { code: string; valid: boolean }

/* the server's answers so far on this page load, so hopping between Home
   and Our Products doesn't re-ask about the same code */
const verdicts = new Map<string, boolean>()

function knownVerdict(code: string): boolean | undefined {
  const known = verdicts.get(code)
  if (known !== undefined) return known
  // activated or verified earlier in this tab — already vouched for
  return getStoredAffiliateCode() === code ? true : undefined
}

/**
 * A code in the URL must be one that was actually activated; made-up codes
 * are rejected so nobody can invent their own share link. A code that
 * checks out is remembered for the tab, so it follows the visitor to every
 * page and every buy button.
 */
export function useUplineCodeCheck(code: string | undefined): CodeCheck {
  const [verdict, setVerdict] = useState<Verdict | null>(null)

  const known = !code
    ? true
    : verdict?.code === code
      ? verdict.valid
      : knownVerdict(code)

  useEffect(() => {
    if (!code) return

    if (getStoredAffiliateCode() === code) {
      /* pin it now: activating a different code later swaps the stored one,
         and this page must not fall back to checking */
      verdicts.set(code, true)
      return
    }
    if (verdicts.has(code)) return

    let cancelled = false

    fetch(`/api/affiliate?code=${encodeURIComponent(code)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { ok?: boolean; valid?: boolean } | null) => {
        const valid = data?.ok === true && data.valid === true
        // only a real answer is cached; a failed request may pass next time
        if (data?.ok === true) verdicts.set(code, valid)
        if (cancelled) return
        if (valid) storeAffiliateCode(code)
        setVerdict({ code, valid })
      })
      .catch(() => {
        if (!cancelled) setVerdict({ code, valid: false })
      })

    return () => {
      cancelled = true
    }
  }, [code])

  if (known === undefined) return 'checking'
  return known ? 'ok' : 'rejected'
}
