import styles from './index.module.less';
import cn from 'classnames'
import getArtistsName from '@/utils/getArtistsName';
import useAudioStore from "@/store/useAudioStore"
import getMusicUrl from '@/utils/getMusicUrl';
import getAssetURL from '@/utils/getAssetURl';


function MusicItem(props: any) {
  const { name, picUrl, artists, index, id, duration } = props
  const { setInitialState, play, musicUrl } = useAudioStore((state) => state)

  const isMemoryUrl = musicUrl || JSON.parse(localStorage.getItem('musicInitialState')!).musicUrl

  const hasBorderBottom = [4, 9].indexOf(index) > -1

  const Url = getMusicUrl(id)

  const handlerPLay = () => {
    setInitialState(props)
  }

  const IconUrl = play ? getAssetURL('play.png') : getAssetURL('pause.png');

  return (
    <div className={cn(styles.root, hasBorderBottom && styles.borderBottom)}>
      <img className={cn(styles.img)} src={picUrl} alt="" onClick={() => handlerPLay()} />
      { isMemoryUrl === Url ? <img className={styles.icon} src={IconUrl} alt="" /> :  <span className={cn(styles.number)}>{index !== 9 ? `0${index + 1}` : index + 1}</span>
 }
      <div style={{ overflow: 'hidden' }}>
        <div>{name}</div>
        <div className={cn(styles.artists)}>{getArtistsName(artists)}</div>
      </div>
    </div>
  )
}

export default MusicItem