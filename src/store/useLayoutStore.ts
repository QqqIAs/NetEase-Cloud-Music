import { create } from 'zustand'

type Store = {
  showLyric: boolean
}

const useLayoutStore = create<Store>((set) => ({
  showLyric: false,
  setShowLyric: (v: boolean) => set(() => ({ showLyric: v })),
}))

export default useLayoutStore;
