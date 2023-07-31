import React from 'react'

import SongListItem from './SonglistItem'
import styles from './style.module.less'
import type { SongList } from '@/type/Recommandation'

interface IProps {
  data?: SongList[]
}

const Songlists: React.FC<IProps> = ({ data }) => {
  return (
    <div className={styles.root}>
      {data?.map(({ id, name, playCount, picUrl, coverImgUrl }, index) => {
        return <SongListItem key={index} id={id} name={name} playCount={playCount} picUrl={picUrl || coverImgUrl} />
      })}
    </div>
  )
}

export default Songlists
