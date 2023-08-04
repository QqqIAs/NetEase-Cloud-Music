import { useEffect, useState } from 'react';
import styles from './index.module.less'
import { getSimiSong } from '@/services/search';
import useAudioStore from '@/store/useAudioStore';
import cn from 'classnames'
import getArtistsName from '@/utils/getArtistsName';
import { CaretRightOutlined } from '@ant-design/icons';


function MusicItem () {

  const [song, setSong] = useState([])

  const { id, setInitialState } = useAudioStore((state) => state)
  
  const latestId = id == 0 ? JSON.parse(localStorage.getItem('musicInitialState')!).id : id;

  useEffect(() => {
    getSimiSong({id: latestId}).then(res => setSong(res.songs))
  }, [latestId])

  const handlePlay = (props) => {
    setInitialState({
      id: props.id,
      picUrl: props.album.picUrl,
      name: props.name,
      artists: props.artists,
      duration: props.duration,
    })
  }


  return (
    <>
      <div className={styles.root}>
       {
        song.length > 0 &&  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>
        相似歌曲
         </div> 
       }
      {
         song.length > 0 && song.map(item => {
          return <div className={cn(styles.card)} onClick={() => handlePlay(item)} >
          <div className={styles.play}><CaretRightOutlined style={{ color: '#c3473a', fontSize: '16px' }} /></div>
          <img className={cn(styles.img)} src={item.album.picUrl} alt=""  />
          <div style={{ marginLeft: '12px',overflow: 'hidden' }}>
            <div>{item.name}</div>
            <div className={cn(styles.artists)}>{getArtistsName(item.artists)}</div>
          </div>
        </div>
        })
      }
      </div>
    </>
  )
}

export default MusicItem