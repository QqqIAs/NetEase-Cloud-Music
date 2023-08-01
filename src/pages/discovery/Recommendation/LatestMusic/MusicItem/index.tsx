import styles from './index.module.less';
import cn from 'classnames'
import { useCallback } from 'react';

function MusicItem(props: any) {
  const { name, picUrl, artists, index } = props

  const hasBorderBottom = [4, 9].indexOf(index) > -1

  const getArtistName = useCallback(() => {
    let str = ''
    if(artists.length > 0) {
      artists.forEach((item, index) => {
        if(index !== 0)
        str+=`/ ${item.name}`
        else str+=item.name
      })
    }
    return str
  }, [artists])

  return (
    <div className={cn(styles.root, hasBorderBottom && styles.borderBottom)}>
      <img className={cn(styles.img)} src={picUrl} alt="" />
      <span className={cn(styles.number)}>{index !== 9 ? `0${index + 1}` : index + 1}</span>
      <div>
        <div>{name}</div>
        <div className={cn(styles.artists)}>{getArtistName()}</div>
      </div>
    </div>
  )
}

export default MusicItem