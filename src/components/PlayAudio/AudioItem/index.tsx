import styles from './index.module.less'

function AudioItem (props) {
  
  const {picUrl, songName, artists, duration} = props

  return (
    <>
        <img className={styles.img} src={picUrl} alt="" />
        <div className={styles.text}>
          <div className={styles.top}>
            <span className={styles.name}>{songName}</span>
            <span className={styles.artists}>{` - ${artists}`}</span>
          </div>
          <div className={styles.duration} >{duration}</div>
        </div>
    </>
  )
}

export default AudioItem