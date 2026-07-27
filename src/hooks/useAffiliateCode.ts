import { useSyncExternalStore } from 'react'
import { getStoredAffiliateCode, subscribeAffiliateCode } from '@/lib/belibeli'

/**
 * The code this visitor activated on the Join page, or null.
 * Reactive: headers update the moment a code is activated or cleared,
 * without needing a page reload.
 */
export function useAffiliateCode(): string | null {
  return useSyncExternalStore(
    subscribeAffiliateCode,
    getStoredAffiliateCode,
    () => null,
  )
}
