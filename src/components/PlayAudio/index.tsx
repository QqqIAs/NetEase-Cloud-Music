import useAudioStore from "@/store/useAudioStore"
import { useEffect, useRef, useState } from "react"
import AudioItem from "./LeftAudioItem"
import MiddleAudioItem from "./MiddleAudioItem"
import styles from './index.module.less'
import getAssetURL from "@/utils/getAssetURl"
import { Slider } from 'antd';
import cn from 'classnames'

function PlayAudio () {
  const { picUrl, songName, artists, musicUrl, play, duration, show, setPlay, id, setPlayCurrentTime, lyricJump, playCurrentTime } = useAudioStore((state) => state)
  const ref = useRef<HTMLAudioElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [sliderValue, setSliderValue] = useState(0)

  const iconUrl = getAssetURL('sound.png')

  useEffect(() => {
    if(play) ref.current?.play()
    else ref.current?.pause()
    // 本地存储
    // 判断musicUrl是否勋在是为了防止zustand存储初始化值被存放到本地
    if(musicUrl && musicUrl !== localState?.musicUrl) {
      setSliderValue(0)
      localStorage.setItem('musicInitialState', JSON.stringify({
        id,
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
      <AudioItem picUrl={localState?.picUrl} songName={localState?.songName} artists={localState?.artists} duration={localState?.duration} currentTime={currentTime} ></AudioItem>
    </div>
  </>

  const setVolume = (v) => {
    ref.current!.volume = v/100
  }

    // 时间戳
  const time = duration !== '0' ? duration : JSON.parse(localStorage.getItem('musicInitialState')!).duration

  // 播放时间改变
  if(ref.current) {
    ref.current.ontimeupdate = () => {
      // 全局存储播放时间
      setPlayCurrentTime(ref.current!.currentTime)
      // 左侧播放时间
      setCurrentTime(ref.current!.currentTime)
      // 上方滚动条
      setSliderValue(ref.current!.currentTime / (Number(time)/1000) * 100)
    }
  }

  useEffect(() => {
    // 歌词跳转
    ref.current!.currentTime = playCurrentTime
  }, [lyricJump])

  return (
    <>
      <div style={{ position: 'relative' }}>
      <div className={cn(styles.slider, styles.topper)}>
        <Slider value={sliderValue} tooltip={{ open: false}} onChange={(value) => { ref.current!.currentTime = ((time / 1000) * (value / 100)); setCurrentTime(((time / 1000) * (value / 100))) }} defaultValue={0} />
      </div>
      <div className={styles.root}>
      <audio ref={ref} style={{ display: 'none' }} controls src={musicUrl || localState.musicUrl}></audio>
      {show ? 
        <> <div className={styles.audio}>
            <AudioItem picUrl={picUrl} songName={songName} artists={artists} duration={duration} currentTime={currentTime}></AudioItem>
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
      </div>
    </>
  )
}

export default PlayAudio