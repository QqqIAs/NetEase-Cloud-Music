import { create } from 'zustand'
import getArtistsName from '@/utils/getArtistsName'
import getMusicUrl from '@/utils/getMusicUrl'

type Store = {
  id: number
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
  id: 0,
  picUrl: '',
  songName: '',
  artists: '',
  musicUrl: '',
  duration: '0',
  // 是否展示
  show: false,
  // 播放控制
  play: false,
  // 播放时间
  setPlay: (play: boolean) => set(() => ({ play })),
  setShow: (show: boolean) => set(() => ({ show })),
  setInitialState: (props: any ) => set(() => ({
    id: props.id,
    play: true,
    show: true,
    picUrl: props.picUrl,
    songName: props.name,
    artists: getArtistsName(props.artists),
    musicUrl: getMusicUrl(props.id),
    duration: props.duration
  })),
}))

export default useAudioStore;
