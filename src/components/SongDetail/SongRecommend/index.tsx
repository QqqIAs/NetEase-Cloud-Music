import styles from './index.module.less'
import MusicItem from './MusicItem'
import SimiSongList from './SimiSongList'


function SongRecommend () {




  return (
    <>
      <div className={styles.root}>
          <SimiSongList></SimiSongList>
          <MusicItem></MusicItem>
      </div>
    </>

  )
}

export default SongRecommend