import useAudioStore from "@/store/useAudioStore"
import styles from './index.module.less'
import { useRef } from "react"

function PlayAudio () {
  const { picUrl, songName, artists, musicUrl, play, duration } = useAudioStore((state) => state)
  const ref = useRef<HTMLAudioElement>(null)



  return (
    <>
      <audio ref={ref} style={{ display: 'none' }} controls src={musicUrl}></audio>
      <div className={styles.root}>
        <img className={styles.img} src={picUrl} alt="" />
        <div className={styles.text}>
        <div className={styles.top}>
          <span className={styles.name}>{songName}</span>
          <span className={styles.artists}>{` - ${artists}`}</span>
        </div>
        <div className={styles.duration} >{duration}</div>
        </div>
        <div style={{ marginLeft: '20px'}} onClick={() => ref.current?.pause()} >暂停</div>
        <div style={{ marginLeft: '20px'}} onClick={() => ref.current?.play()}>开始</div>
      </div>
    </>
  )
}

export default PlayAudio