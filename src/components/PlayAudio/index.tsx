import useAudioStore from "@/store/useAudioStore"
import { useEffect, useRef } from "react"
import AudioItem from "./AudioItem"
import styles from './index.module.less'

function PlayAudio () {
  const { picUrl, songName, artists, musicUrl, play, duration, show, setPlay } = useAudioStore((state) => state)
  const ref = useRef<HTMLAudioElement>(null)

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
    <div className={styles.root}>
      <AudioItem picUrl={localState?.picUrl} songName={localState?.songName} artists={localState?.artists} duration={localState?.duration}></AudioItem>
    </div>
  </>

  return (
    <div style={{display: 'flex'}}>
      <audio ref={ref} style={{ display: 'none' }} controls src={musicUrl || localState.musicUrl}></audio>
      {show ? 
        <> <div className={styles.root}>
            <AudioItem picUrl={picUrl} songName={songName} artists={artists} duration={duration}></AudioItem>
          </div>
        </> : localState ? localJSX : null
      }
      <div style={{ marginLeft: '20px', marginTop: '10px'}} onClick={() => { setPlay(false)}} >暂停</div>
      <div style={{ marginLeft: '20px', marginTop: '10px'}} onClick={() => { setPlay(true) }}>开始</div>
    </div>
  )
}

export default PlayAudio