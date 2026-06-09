import type { ReactNode } from 'react'
import { useLenis } from '@/hooks/useLenis'
import { useAppStore } from '@/stores/useAppStore'

interface SmoothScrollProps {
  children: ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const isLoading = useAppStore((s) => s.isLoading)
  useLenis(!isLoading)
  return <>{children}</>
}
