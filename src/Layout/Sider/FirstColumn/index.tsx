import { VideoCameraOutlined, TeamOutlined, AntCloudOutlined, SoundOutlined, AppleOutlined, ArrowDownOutlined, HeartOutlined, StarOutlined  } from '@ant-design/icons'
import styles from './index.module.less'
import getAssetURL from '@/utils/getAssetURl'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function FirstColumn () {
  const [activeIndex, setActiveIndex] = useState(0)

  const discoveryUrl = getAssetURL('icon.svg')
  const navigate = useNavigate()

  const activeStyle = {
    backgroundColor: '#e1e1e1',
    color: '#c3473a',
  }

  const column = [
    {
      label: '发现音乐',
      ele: <img className={styles.findmusic} src={discoveryUrl} alt="" />,
      route: '/discovery/recommendation'
    },
    {
      label: '视频',
      ele: <VideoCameraOutlined></VideoCameraOutlined>,
      route: '/videos/video'
    },
    {
      label: '播客',
      ele: <SoundOutlined></SoundOutlined>
    },
    {
      label: '私人漫游',
      ele: <AntCloudOutlined></AntCloudOutlined>
    },
    {
      label: '关注',
      ele: <TeamOutlined></TeamOutlined>
    }
  ]

  const column2 = [
    {
      label: '我喜欢的音乐',
      ele: <HeartOutlined />
     },
    {
      label: 'iTunes音乐',
      ele: <AppleOutlined />
    },
    {
      label: '下载管理',
      ele: <ArrowDownOutlined />
    },
    {
      label: '我的收藏',
      ele: <StarOutlined />
    },
  ]

  const handelCLick = (route: string | undefined, index: number) => {
    setActiveIndex(index)
    if(route) {
      navigate(route)
    }
  }

  return (
    <>
      <ul style={{ padding: 0}}>
        {column.map((item, index) => {
          return <li 
              style={activeIndex === index ? activeStyle : undefined} 
              onClick={() => {handelCLick(item.route, index)}} 
              className={styles.list} 
              key={item.label}>
            <span className={styles.img}>{item.ele}</span>
            {item.label}</li>
        })}
      </ul>
      <div className={styles.title}>我的音乐</div>
      <ul style={{ padding: 0, margin: 0}}>
        {column2.map((item, index) => {
          return <li 
              style={activeIndex === index + 5 ? activeStyle : undefined} 
              onClick={() => {handelCLick(item?.route, index + 5 )}} 
              className={styles.list} 
              key={item.label}>
            <span className={styles.img}>{item.ele}</span>
            {item.label}</li>
        })}
      </ul>
    </>
  )
}

export default FirstColumn