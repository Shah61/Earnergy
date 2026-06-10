import { LoadingScreen } from '@/components/loading/LoadingScreen'
import { BoxBitesHeader } from '@/components/layout/BoxBitesHeader'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { getLenis } from '@/hooks/useLenis'
import { useAppStore } from '@/stores/useAppStore'
import { BoxBitesHello, BoxBitesScroll } from '@/sections/box-bites'

const HEADER_LINKS = [
  { label: 'Story', href: '#bb-exp' },
  { label: 'Ingredients', href: '#bb-sz' },
  { label: 'Nutrition', href: '#bb-tz' },
  { label: 'Why Hoodia', href: '#bb-nodeHoodia' },
]

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

  return (
    <>
      <LoadingScreen />
      <BoxBitesHeader
        visible={!isLoading}
        links={HEADER_LINKS}
        onNavigate={handleNavigate}
      />
      <SmoothScroll>
        <BoxBitesScroll />
        <BoxBitesHello />
      </SmoothScroll>
    </>
  )
}
