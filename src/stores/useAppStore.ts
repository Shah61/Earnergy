import { create } from 'zustand'

export type ActiveProduct = 'box-bites' | 'kofe'

interface AppState {
  isLoading: boolean
  isSceneReady: boolean
  scrollProgress: number
  activeProduct: ActiveProduct
  setLoadingComplete: () => void
  setSceneReady: (ready: boolean) => void
  setScrollProgress: (progress: number) => void
  setActiveProduct: (product: ActiveProduct) => void
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: false,
  isSceneReady: false,
  scrollProgress: 0,
  activeProduct: 'box-bites',
  setLoadingComplete: () => set({ isLoading: false }),
  setSceneReady: (ready) => set({ isSceneReady: ready }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setActiveProduct: (product) => set({ activeProduct: product }),
}))
