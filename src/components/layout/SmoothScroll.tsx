import { useEffect, type ReactNode } from 'react'
import { scrollToTop } from '@/hooks/useLenis'

interface SmoothScrollProps {
  children: ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    scrollToTop()
  }, [])

  return <>{children}</>
}
