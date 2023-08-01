import { useEffect } from "react";
import * as DiscoveryApi from '@/services/discovery'
import { RightOutlined } from "@ant-design/icons";
import styles from './index.module.less'
import PlayCount from "@/components/PlayCount";
import useAsyncFn from "@/hooks/useAsyncFn";

function RecommendMv () {
  // const [List, setList] = useState<Result[]>()

  const [List, getList] = useAsyncFn(DiscoveryApi.getRecommendMv)
  const { value: lists, loading } = List

  useEffect(() => {
    getList()
  }, [])

  return (
    <>
    <div style={{ marginTop: '50px', marginBottom: '10px', fontSize: '16px', color: '#182026'}}>推荐MV<span><RightOutlined style={{ fontSize: '14px'}}/></span></div>
    <div className={styles.content}>
    {
      loading && lists?.result.map((item) => {
        return (
        <div key={item.id} className={styles.card}>
          <PlayCount count={item.playCount} className={styles.playCount}></PlayCount>
          <span className={styles.text}>{item.copywriter}</span>
          <img className={styles.img} src={item.picUrl} alt="" />
          <div className={styles.song}>{item.name}</div>
          <div className={styles.artist} >{item.artistName}</div>
        </div>
        )
      })
    }
    </div>
    </>
  )
}

export default RecommendMv