import { useEffect } from 'react'
import { LoadingScreen } from '@/components/loading/LoadingScreen'
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

export default function App() {
  const isLoading = useAppStore((s) => s.isLoading)
  const activeProduct = useAppStore((s) => s.activeProduct)
  const setActiveProduct = useAppStore((s) => s.setActiveProduct)

  /* leaving /products: kill the smooth-scroll hijack and reset the store so
     the experience (loader included) starts fresh on the next visit */
  useEffect(() => {
    return () => {
      destroyLenis()
      document.body.style.overflow = ''
      useAppStore.setState({
        isLoading: true,
        isSceneReady: false,
        scrollProgress: 0,
        activeProduct: 'box-bites',
      })
    }
  }, [])

  return (
    <>
      <LoadingScreen />
      <BoxBitesHeader
        visible={!isLoading}
        links={[]}
        activeProduct={activeProduct}
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
