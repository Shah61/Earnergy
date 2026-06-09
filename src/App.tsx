import { LoadingScreen } from '@/components/loading/LoadingScreen'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { BoxBitesScroll } from '@/sections/box-bites'

export default function App() {
  return (
    <>
      <LoadingScreen />
      <SmoothScroll>
        <BoxBitesScroll />
      </SmoothScroll>
    </>
  )
}
