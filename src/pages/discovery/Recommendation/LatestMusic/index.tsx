import * as DiscoveryApi from '@/services/discovery'


import { useState, useEffect } from "react"
import { RightOutlined } from "@ant-design/icons"
import MusicItem from './MusicItem'
import styles from './index.module.less'

function LatestMusic() {

  const [music, setMuisc] = useState<any>()

  useEffect(() => {
    DiscoveryApi.getNewSongs().then(Res => {
      setMuisc(Res.result)
    })
  }, [])

  console.log('xxx', music)

  return (<>
      <div style={{ marginTop: '20px'}}>
      <div style={{ marginBottom: '10px', fontSize: '16px', color: '#182026'}}>最新音乐<span><RightOutlined style={{ fontSize: '14px'}}/></span></div>
      <div className={styles.content}>
        <div className={styles.block}>
          {
          music &&  music.slice(0,5).map((item, index) => {
            return <MusicItem key={item.name} index = {index} name={item.name} picUrl={item.picUrl} artists={item.song.artists}></MusicItem>
          })
        }
        </div>
        <div className={styles.block}>
          {
          music &&  music.slice(5).map((item, index) => {
            return <MusicItem key={item.name} index = {index + 5} name={item.name} picUrl={item.picUrl} artists={item.song.artists}></MusicItem>
          })
        }
        </div>
      </div>
      </div>
    </>
  )
}

export default LatestMusic