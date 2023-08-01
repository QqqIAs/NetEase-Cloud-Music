import styles from './index.module.less';
import cn from 'classnames'
import getArtistsName from '@/utils/getArtistsName';
import useAudioStore from "@/store/useAudioStore"
import getMusicUrl from '@/utils/getMusicUrl';


function MusicItem(props: any) {
  const { name, picUrl, artists, index, id, duration } = props
  const { setPicUrl, setSongName, setArtists, setMusicUrl, setPlay, setDuration } = useAudioStore((state) => state)

  const hasBorderBottom = [4, 9].indexOf(index) > -1

  const handlerPLay = () => {
    setPicUrl(picUrl)
    setSongName(name)
    setArtists(artists)
    setMusicUrl(getMusicUrl(id))
    setPlay(true)
    setDuration(duration)
  }

  return (
    <div className={cn(styles.root, hasBorderBottom && styles.borderBottom)}>
      <img className={cn(styles.img)} src={picUrl} alt="" onClick={() => handlerPLay()} />
      <span className={cn(styles.number)}>{index !== 9 ? `0${index + 1}` : index + 1}</span>
      <div>
        <div>{name}</div>
        <div className={cn(styles.artists)}>{getArtistsName(artists)}</div>
      </div>
    </div>
  )
}

export default MusicItem