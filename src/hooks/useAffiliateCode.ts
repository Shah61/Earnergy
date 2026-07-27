import { useSyncExternalStore } from 'react'
import { getStoredAffiliateCode, subscribeAffiliateCode } from '@/lib/belibeli'

/**
 * The upline code this visitor activated on the Join page, or null.
 * Reactive, so buy links update the instant a code is activated — the
 * affiliate form and the product cards sit on the same page.
 */
export function useAffiliateCode(): string | null {
  return useSyncExternalStore(
    subscribeAffiliateCode,
    getStoredAffiliateCode,
    () => null,
  )
}
