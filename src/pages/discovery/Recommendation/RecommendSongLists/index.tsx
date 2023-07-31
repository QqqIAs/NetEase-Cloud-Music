import { useEffect, useState } from "react";
import * as DiscoveryApi from '@/services/discovery'
import SongLists from "@/components/Songlists/index"
import { RightOutlined } from "@ant-design/icons";

function RecommendSongLists () {

  const [recommendLists, setRecommendLists] = useState<any>()
  
  useEffect(() => {
    DiscoveryApi.getRecommendSongList().then(Res => setRecommendLists(Res.result))
  }, [])

  

  return (
    <>
      <div style={{ marginBottom: '-25px'}}>
      <div style={{ marginBottom: '10px', fontSize: '16px', color: '#182026'}}>推荐歌单<span><RightOutlined style={{ fontSize: '14px'}}/></span></div>
      {
        recommendLists && <SongLists data={recommendLists}></SongLists>
      }
      </div>
    </>
  )
}

export default RecommendSongLists