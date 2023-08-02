import { useRef } from "react"

import useAudioStore from "@/store/useAudioStore"
import { Slider } from "antd"

function SongList() {
  const ref = useRef<HTMLAudioElement>(null)

  const picUrl = useAudioStore((state) => state.picUrl)
  const { songName, artists, musicUrl, play } = useAudioStore((state) => state)
  const setPicUrl = useAudioStore((state) => state.setPicUrl)

  return <div><audio style={{ display: 'none'}} ref={ref} controls src="https://music.163.com/song/media/outer/url?id=2068154585.mp3"></audio>
  <div onClick={() => {console.log(ref.current?.pause()) }}>暂停</div>
  <div onClick={() => {ref.current?.play()}}>开始</div>
  <div onClick={() => {setPicUrl('123')}}>设立url</div>
  <div>{songName}</div>
  <div>{picUrl}</div>
  <div>{artists}</div>
  <div>{musicUrl}</div>
  <div>{JSON.stringify(play)}</div>
  <Slider defaultValue={30} />
  </div>

}

export default SongList