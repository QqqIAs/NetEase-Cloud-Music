import React from 'react'

import PlayCount from '@/components/PlayCount/index'
import PlayIcon from '@/components/PlayIcon/index'
import styles from './style.module.less'

interface IProps {
  id: number
  name: string
  playCount: number
  picUrl?: string
}


const SonglistItem: React.FC<IProps> = ({ name, playCount, picUrl }) => {


  return (
    <div className={styles.root}>
      <div className={styles.cover}>
        {picUrl && <img src={picUrl} loading='lazy' />}
        <PlayCount count={playCount} className={styles.playCount} />
        <PlayIcon className={styles.playIcon} />
      </div>
      <div className={styles.name}>{name}</div>
    </div>
  )
}

export default SonglistItem
