import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { getStoredAffiliateCode } from '@/lib/belibeli'
import { BoxBitesHeader } from '@/components/layout/BoxBitesHeader'
import { InvalidCodeScreen } from '@/components/layout/InvalidCodeScreen'
import { ProductViewport } from '@/components/layout/ProductViewport'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { destroyLenis, getLenis } from '@/hooks/useLenis'
import { useUplineCodeCheck } from '@/hooks/useUplineCodeCheck'
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

export default function App() {
  const { uplinecode } = useParams<{ uplinecode: string }>()
  const activeProduct = useAppStore((s) => s.activeProduct)
  const setActiveProduct = useAppStore((s) => s.setActiveProduct)
  const setLoadingComplete = useAppStore((s) => s.setLoadingComplete)

  const codeCheck = useUplineCodeCheck(uplinecode)

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

  /* a code nobody activated: say so plainly instead of quietly redirecting */
  if (codeCheck === 'rejected' && uplinecode) {
    return <InvalidCodeScreen code={uplinecode} />
  }

  /* a code is in play this session (their own, or the reseller whose link
     brought them): /products silently becomes /products/<code> so the buy
     buttons credit it */
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
