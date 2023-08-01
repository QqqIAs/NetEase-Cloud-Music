import * as DiscoveryApi from '@/services/discovery'
import { useEffect } from "react"
import { RightOutlined } from "@ant-design/icons"
import MusicItem from './MusicItem'
import styles from './index.module.less'
import useAsyncFn from '@/hooks/useAsyncFn'

function LatestMusic() {

  // const [music, setMuisc] = useState<any>()

  const [state, getLatestMusic] = useAsyncFn(DiscoveryApi.getNewSongs)
  const { value: music , loading } = state

  useEffect(() => {
    getLatestMusic()
  }, [])


  return (<>
      <div style={{ marginTop: '50px'}}>
      <div style={{ marginBottom: '10px', fontSize: '16px', color: '#182026'}}>最新音乐<span><RightOutlined style={{ fontSize: '14px'}}/></span></div>
      <div className={styles.content}>
        <div className={styles.block}>
          {
          loading &&  music?.result.slice(0,5).map((item, index) => {
            return <MusicItem duration = {item.song.duration} key={item.name} id={item.id} index = {index} name={item.name} picUrl={item.picUrl} artists={item.song.artists}></MusicItem>
          })
        }
        </div>
        <div className={styles.block}>
          {
          loading &&  music?.result.slice(5).map((item, index) => {
            return <MusicItem duration = {item.song.duration} key={item.name}  id={item.id} index = {index + 5} name={item.name} picUrl={item.picUrl} artists={item.song.artists}></MusicItem>
          })
        }
        </div>
      </div>
      </div>
    </>
  )
}

export default LatestMusic