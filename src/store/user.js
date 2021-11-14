import create from 'zustand'
import { devtools } from 'zustand/middleware'

export const useUserStore = create(
  devtools((set) => ({
    user: null,
    isLoading: true,
    setUser: (user) => set({ user }),
    setIsLoading: (isLoading) => set({ isLoading }),
  }))
)
