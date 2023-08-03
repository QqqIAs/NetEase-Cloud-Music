import styles from './index.module.less'
import SongImg from './SongImg';
import SongComment from './SongComment';
import SongRecommend from './SongRecommend';
import SongLyric from './SongLyric';
import useAudioStore from '@/store/useAudioStore';


function SongDetail () {

  const { picUrl, songName, artists, musicUrl, play, duration, show, setPlay } = useAudioStore((state) => state)


  return (
    <>
      <div className={styles.root}>
        <div className={styles.top}>
          <div className={styles.img}><SongImg picUrl={picUrl} play={play}></SongImg></div>
          <div className={styles.lyric}><SongLyric></SongLyric></div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.comment}><SongComment></SongComment></div>
          <div className={styles.recommend}><SongRecommend></SongRecommend></div>
        </div>
      </div>
    </>
  )
}

export default SongDetail