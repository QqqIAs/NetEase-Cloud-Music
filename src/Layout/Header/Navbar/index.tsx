import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from '@/constants/routes'
import styles from './index.module.less'
import { LeftOutlined, RightOutlined, CloseOutlined, ArrowsAltOutlined, MinusOutlined} from '@ant-design/icons'
import { useState } from "react";
import Search from "../Search";

const NAVBAR = {
  [ROUTES.DISCOVERY]: [
    {
      label: '个性推荐',
      route: ROUTES.RECOMMENDATION,
    },
    {
      label: '每日歌曲推荐',
      route: ROUTES.RECOMMEND_DAILY,
    },
    {
      label: '歌单',
      route: ROUTES.SONG_LIST,
    },
    {
      label: '排行榜',
      route: ROUTES.LEADER_BOARD,
    },
    {
      label: '歌手',
      route: ROUTES.SINGERS,
    },
    {
      label: '最新音乐',
      route: ROUTES.LATEST_MUSIC,
    },
  ],
  [ROUTES.VIDEOS]: [
    {
      label: '视频',
      route: ROUTES.VIDEO,
    },
    {
      label: 'MV',
      route: ROUTES.MV,
    },
  ],
  [ROUTES.SEARCH]: [
    {
      label: '',
      route: ROUTES.SEARCH
    }
  ]
}

const leftRound = [
  {
    color: '#ec6a5e',
    ele: <CloseOutlined style={{fontSize: '9px'}}/>
  },
  {
    color: '#f5c04f',
    ele: <MinusOutlined style={{fontSize: '9px'}}/>
  },
  {
    color: '#62c755',
    ele: <ArrowsAltOutlined style={{fontSize: '9px'}}/>
  }
]


const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const matchPathPrefix = Object.keys(NAVBAR).find((key) => pathname.startsWith(key))

  if (!matchPathPrefix) {
    return null
  }

  const items = NAVBAR[matchPathPrefix]

  // const hasMatchRoute = items.find(({ route }) => route === pathname)

  const handleItemClick = (route: string, index: number) => {
    setActiveIndex(index)
    navigate(route)
  }

  return (
    <div className={styles.root}>
      <div style={{ marginRight: '90px'}}>
        {/* 左侧最小化三个按钮 */}
          {
            leftRound.map(({color, ele}) => {
              return <span className={styles.round} style={{ backgroundColor: color, cursor: 'pointer' }} key={color}><span className={styles.content}>
                {ele}</span>
                </span>
            })
          }        
      </div>
      <div style={{ marginRight: '30px'}}>
        {/* 左侧前进返回按钮 */}
         <span><LeftOutlined style={{ marginRight: '10px', fontSize: '14px'}} onClick={() => {navigate(-1)}}/><RightOutlined style={{ fontSize: '14px'}} onClick={() => {navigate(1)}}/></span>
      </div>
      {items.map(({ label, route }, index) => {
        return (
          <li
            style={activeIndex === index ? { color: '#000000'} : undefined}
            onClick={() => handleItemClick(route, index)}
            className={styles.item}
            key={label}
          >
            {label}
          </li>
        )
      })}
      <Search></Search>
    </div>
  )
}

export default Navbar
