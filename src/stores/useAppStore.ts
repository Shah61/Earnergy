import { create } from 'zustand'

interface AppState {
  isLoading: boolean
  isSceneReady: boolean
  scrollProgress: number
  setLoadingComplete: () => void
  setSceneReady: (ready: boolean) => void
  setScrollProgress: (progress: number) => void
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: true,
  isSceneReady: false,
  scrollProgress: 0,
  setLoadingComplete: () => set({ isLoading: false }),
  setSceneReady: (ready) => set({ isSceneReady: ready }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
}))
