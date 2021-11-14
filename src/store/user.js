import create from 'zustand'
import { devtools } from 'zustand/middleware'

export const useUserStore = create(
  devtools((set) => ({
    user: null,
    isLoading: false,
    setUser: (user) => set({ user }),
    setIsLoading: (isLoading) => set({ isLoading }),
  }))
)
