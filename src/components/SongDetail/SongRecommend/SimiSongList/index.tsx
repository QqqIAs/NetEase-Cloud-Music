import useAudioStore from '@/store/useAudioStore';
import styles from './index.module.less'
import { useEffect, useState } from 'react';
import { getSimiPlaylist } from '@/services/search';
import { formatNum } from '@/utils/formatNum'
import { CaretRightOutlined } from '@ant-design/icons';



function SimiSongList() {

  const [playList, setPlayList] = useState([])

  const { id } = useAudioStore((state) => state)
  
  const latestId = id == 0 ? JSON.parse(localStorage.getItem('musicInitialState')!).id : id;

  useEffect(() => {
    getSimiPlaylist({id: latestId}).then(res => setPlayList(res.playlists))
  }, [latestId])

  return (
    <>
      {
        playList.length > 0 && <div className={styles.root}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>包含这首歌的歌单</div>
          {
            playList.map((item) => {
              return <div className={styles.card}>
                <img className={styles.img} src={item.coverImgUrl} alt="" />
                <div>
                  <span className={styles.name} >{item.name}</span>
                  <div style={{ marginTop: '3px', display: 'flex', alignItems: 'center' }}>
                    <div className={styles.triangle}></div>
                    <span className={styles.count} >{formatNum(item.playCount)}</span>
                  </div>
                </div>
              </div>
            })
          }
        </div>
      }
    </>
  )
}

export default SimiSongList