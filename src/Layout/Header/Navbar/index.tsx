// import { useLocation, } from 'react-router-dom'
// import cn from 'classnames'
import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from '@/constants/routes'
import styles from './index.module.less'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

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
}


const Navbar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const matchPathPrefix = Object.keys(NAVBAR).find((key) => pathname.startsWith(key))

  if (!matchPathPrefix) {
    return null
  }

  const items = NAVBAR[matchPathPrefix]

  // const hasMatchRoute = items.find(({ route }) => route === pathname)

  const handleItemClick = (route: string) => {
    navigate(route)
  }

  return (
    <div className={styles.root}>
      <div style={{ marginRight: '90px'}}>
        {/* 左侧最小化三个按钮 */}
          {
            ['red', 'orange', 'green'].map((color) => {
              return <span className={styles.round} style={{ backgroundColor: color }} key={color}></span>
            })
          }        
      </div>
      <div style={{ marginRight: '30px'}}>
        {/* 左侧前进返回按钮 */}
         <span><LeftOutlined /><RightOutlined /></span>
      </div>
      {items.map(({ label, route }) => {
        return (
          <li
            onClick={() => handleItemClick(route)}
            className={styles.item}
            key={label}
          >
            {label}
          </li>
        )
      })}
    </div>
  )
}

export default Navbar
