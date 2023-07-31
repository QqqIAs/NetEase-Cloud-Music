import LatestMusic from './LatestMusic/index'
import Banner from './Banner/index'
import styles from './index.module.less'
import RecommendSongLists from './RecommendSongLists'

function Recommendation() {
  return <div className={styles.content}>
    <Banner></Banner>
    <RecommendSongLists></RecommendSongLists>
    <LatestMusic></LatestMusic>
  </div>
}

export default Recommendation