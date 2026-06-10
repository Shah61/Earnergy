import { useEffect, type ReactNode } from 'react'
import { scrollToTop, useLenis } from '@/hooks/useLenis'
import { useAppStore } from '@/stores/useAppStore'

interface SmoothScrollProps {
  children: ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const isLoading = useAppStore((s) => s.isLoading)
  useLenis(!isLoading)

  useEffect(() => {
    scrollToTop()
  }, [])

  useEffect(() => {
    if (!isLoading) scrollToTop()
  }, [isLoading])

  return <>{children}</>
}
