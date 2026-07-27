import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { clearAffiliateCode, getStoredAffiliateCode } from '@/lib/belibeli'
import { BoxBitesHeader } from '@/components/layout/BoxBitesHeader'
import { ProductViewport } from '@/components/layout/ProductViewport'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { destroyLenis, getLenis } from '@/hooks/useLenis'
import { useAppStore } from '@/stores/useAppStore'
import { BoxBitesHello, BoxBitesScroll } from '@/sections/box-bites'

function handleNavigate(href: string) {
  const lenis = getLenis()
  if (!lenis) return
  if (href === '#top') {
    lenis.scrollTo(0)
  } else {
    lenis.scrollTo(href)
  }
}

type CodeCheck = 'checking' | 'ok' | 'rejected'

export default function App() {
  const { uplinecode } = useParams<{ uplinecode: string }>()
  const activeProduct = useAppStore((s) => s.activeProduct)
  const setActiveProduct = useAppStore((s) => s.setActiveProduct)
  const setLoadingComplete = useAppStore((s) => s.setLoadingComplete)

  /* a code in the URL must be one that was actually activated on /join;
     made-up codes are rejected so nobody can invent their own share link */
  const [verdict, setVerdict] = useState<{ code: string; valid: boolean } | null>(
    null,
  )

  const codeCheck: CodeCheck = !uplinecode
    ? 'ok'
    : verdict?.code !== uplinecode
      ? 'checking'
      : verdict.valid
        ? 'ok'
        : 'rejected'

  useEffect(() => {
    if (!uplinecode) return

    let cancelled = false

    fetch(`/api/affiliate?code=${encodeURIComponent(uplinecode)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { ok?: boolean; valid?: boolean } | null) => {
        if (cancelled) return
        const valid = !(data?.ok && data.valid === false)
        // don't let a rejected code sit in the cache and cause a redirect loop
        if (!valid && getStoredAffiliateCode() === uplinecode) clearAffiliateCode()
        setVerdict({ code: uplinecode, valid })
      })
      .catch(() => {
        // endpoint unreachable — fail open rather than break every share link
        if (!cancelled) setVerdict({ code: uplinecode, valid: true })
      })

    return () => {
      cancelled = true
    }
  }, [uplinecode])

  useEffect(() => {
    setLoadingComplete()
  }, [setLoadingComplete])

  /* leaving /products: kill the smooth-scroll hijack and reset the store */
  useEffect(() => {
    return () => {
      destroyLenis()
      document.body.style.overflow = ''
      useAppStore.setState({
        isLoading: false,
        isSceneReady: false,
        scrollProgress: 0,
        activeProduct: 'box-bites',
      })
    }
  }, [])

  /* an unrecognised code drops back to the plain page (house code) */
  if (codeCheck === 'rejected') {
    return <Navigate to="/products" replace />
  }

  /* visitor activated their own code this session: /products silently
     becomes /products/<their code> so the buy buttons credit them */
  const storedCode = getStoredAffiliateCode()
  if (!uplinecode && storedCode) {
    return <Navigate to={`/products/${encodeURIComponent(storedCode)}`} replace />
  }

  /* hold the heavy experience back until the code clears, so a bad link
     never flashes the page before redirecting */
  if (codeCheck === 'checking') {
    return null
  }

  return (
    <>
      <BoxBitesHeader
        visible
        links={[]}
        activeProduct={activeProduct}
        uplineCode={uplinecode}
        onProductChange={setActiveProduct}
        onNavigate={handleNavigate}
      />
      <SmoothScroll>
        <ProductViewport>
          <BoxBitesScroll />
          <BoxBitesHello />
        </ProductViewport>
      </SmoothScroll>
    </>
  )
}
