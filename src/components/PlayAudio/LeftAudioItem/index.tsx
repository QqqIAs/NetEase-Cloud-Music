import styles from './index.module.less'
import formatTime from '@/utils/formatTime'
import getDurationTime from '@/utils/getDurationTime'

function AudioItem (props) {
  
  const {picUrl, songName, artists, duration, currentTime} = props

  return (
    <>
        <img className={styles.img} src={picUrl} alt="" />
        <div className={styles.text}>
          <div className={styles.top}>
            <span className={styles.name}>{songName}&nbsp;</span>
            <span className={styles.artists}>{`- ${artists}`}</span>
          </div>
          <div className={styles.duration} >{`${formatTime(currentTime)}/${getDurationTime(duration)}`}</div>
        </div>
    </>
  )
}

export default AudioItem