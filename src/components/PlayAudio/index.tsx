import useAudioStore from "@/store/useAudioStore"
import { useEffect, useRef } from "react"
import AudioItem from "./LeftAudioItem"
import MiddleAudioItem from "./MiddleAudioItem"
import styles from './index.module.less'
import getAssetURL from "@/utils/getAssetURl"
import { Slider } from 'antd';

function PlayAudio () {
  const { picUrl, songName, artists, musicUrl, play, duration, show, setPlay } = useAudioStore((state) => state)
  const ref = useRef<HTMLAudioElement>(null)

  const iconUrl = getAssetURL('sound.png')

  useEffect(() => {
    if(play) ref.current?.play()
    else ref.current?.pause()
    // 本地存储
    // 判断musicUrl是否勋在是为了防止zustand存储初始化值被存放到本地
    if(musicUrl && musicUrl !== localState?.musicUrl) {
      localStorage.setItem('musicInitialState', JSON.stringify({
        musicUrl,
        artists,
        picUrl,
        songName,
        duration,
      }))
    }
  }, [play, musicUrl])

  const localState = JSON.parse(localStorage.getItem('musicInitialState')!)

  const localJSX = <>
    <div className={styles.audio}>
      <AudioItem picUrl={localState?.picUrl} songName={localState?.songName} artists={localState?.artists} duration={localState?.duration}></AudioItem>
    </div>
  </>

  const setVolume = (v) => {
    ref.current!.volume = v/100
  }

  return (
    <div className={styles.root}>
      <audio ref={ref} style={{ display: 'none' }} controls src={musicUrl || localState.musicUrl}></audio>
      {show ? 
        <> <div className={styles.audio}>
            <AudioItem picUrl={picUrl} songName={songName} artists={artists} duration={duration}></AudioItem>
          </div>
        </> : localState ? localJSX : null
      }
      <div className={styles.control}>
        <MiddleAudioItem></MiddleAudioItem>
      </div>
      <div className={styles.right} >
        <img className={styles.soundIcon} src={iconUrl} alt="" />
        <div className={styles.slider}>
          <Slider onChange={(value) => setVolume(value)} defaultValue={100} />
        </div>
      </div>
    </div>
  )
}

export default PlayAudio