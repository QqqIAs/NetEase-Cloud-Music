import { create } from 'zustand'
import getArtistsName from '@/utils/getArtistsName'
import getDurationTime from '@/utils/getDurationTime'

type Store = {
  picUrl: string
  songName: string
  artists: string
  musicUrl: string
  duration: string
  play: boolean
  setPicUrl: (v: string) => void
  setMusicUrl: (v: string) => void
  setArtists: (v: any[]) => void
  setSongName: (v: string) => void
  setPlay: (v: boolean) => void
  setDuration: (v: number) => void
}

const useAudioStore = create<Store>((set) => ({
  picUrl: 'picUrl',
  songName: 'songName',
  artists: 'artists',
  musicUrl: 'musicUrl',
  duration: '0',
  // 播放控制
  play: false,
  setPicUrl: (picUrl: string) => set(() => ({ picUrl })),
  setMusicUrl: (musicUrl: string) => set(() => ({ musicUrl })),
  setArtists: (artists: any) => set(() => ({ artists: getArtistsName(artists) })),
  setSongName: (songName: string) => set(() => ({ songName })),
  setPlay: (play: boolean) => set(() => ({ play })),
  setDuration: (duration: number) => set(() => ({ duration: getDurationTime(duration)}))
}))

export default useAudioStore;
