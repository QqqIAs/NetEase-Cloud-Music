import styles from './index.module.less'
import getAssetURL from '@/utils/getAssetURl'
import cn from 'classnames'
import { useRef } from 'react'

function SongImg (props) {

  const { picUrl, play } = props

  const latestPicUrl = picUrl || JSON.parse(localStorage.getItem('musicInitialState')!).picUrl

  const transformStyle = {
    transform: 'rotate(-29deg)',
    transformOrigin: '0 0',
  }

  const cdUrl = getAssetURL('play-cd.png')
  const barUrl = getAssetURL('play-bar.png')


  return (
    <>
      <div className={styles.root}>
        <img className={styles.cd} src={cdUrl} alt="" />
        <img style={ play ? undefined : transformStyle } className={styles.bar} src={barUrl} />
        <div className={cn(styles.circle, play ? null : styles.pause)}>
          <img className={styles.img} src={latestPicUrl} alt="" />
        </div>
      </div>
    </>

  )
}

export default SongImg