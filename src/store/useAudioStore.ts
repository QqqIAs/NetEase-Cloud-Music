import { create } from 'zustand'
import getArtistsName from '@/utils/getArtistsName'
import getDurationTime from '@/utils/getDurationTime'
import getMusicUrl from '@/utils/getMusicUrl'

type Store = {
  picUrl: string
  songName: string
  artists: string
  musicUrl: string
  duration: string
  show: boolean
  play: boolean
  setPlay: (v: boolean) => void
  setShow: (v: boolean) => void
  setInitialState: (props: any) => void
}

const useAudioStore = create<Store>((set) => ({
  picUrl: 'picUrl',
  songName: 'songName',
  artists: 'artists',
  musicUrl: 'musicUrl',
  duration: '0',
  // 是否展示
  show: false,
  // 播放控制
  play: false,
  setPlay: (play: boolean) => set(() => ({ play })),
  setShow: (show: boolean) => set(() => ({ show })),
  setInitialState: (props: any) => set(() => ({
    play: true,
    show: true,
    picUrl: props.picUrl,
    songName: props.name,
    artists: getArtistsName(props.artists),
    musicUrl: getMusicUrl(props.id),
    duration: getDurationTime(props.duration)
  })),
}))

export default useAudioStore;
