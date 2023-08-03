import { DeleteOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useLayoutStore from '@/store/useLayoutStore'

function DrawerContent (props) {

  const navigate = useNavigate()

  const {hotSongs} = props

  const [forceUpdate, setForceUpdate] = useState(false);
  const { setShowLyric } = useLayoutStore((state) => state)


  const searchHistory = JSON.parse(localStorage.getItem('searchHistory')!)

  const deleteHistory = () => {
    localStorage.removeItem('searchHistory')
    // 触发页面渲染
    setForceUpdate(!forceUpdate)
  }

  const handleSearch = (value) => {
        // 存储本地
        const searchHistory = JSON.parse(localStorage.getItem('searchHistory')!) || []
        if(!searchHistory.includes(value)) {
          searchHistory.unshift(value)
          localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
        }

        
        //若有遮罩层，关闭遮罩层
        setShowLyric(false)
    
        // 执行搜索
        navigate(`/search?keywords=${value}`)
  }

  return (
    <>
      { searchHistory?.length > 0 && <div className={styles.history}>
        <div style={{ marginBottom: '5px' }} ><span style={{ color: '#666666', marginRight: '10px' }}>搜索历史</span><span><DeleteOutlined onClick={deleteHistory} style={{ color: '#666666' }} /></span></div>
        <div className={styles.searchLists}>
          {
            searchHistory?.length > 0 && searchHistory.map((item, index) => {
              return <span key={index} onClick={() =>  handleSearch(item)} className={styles.searchSpan}>{item}</span>
            })
          }
        </div>
      </div>}
      <div className={styles.hot}>
          <div style={{ marginTop: '20px', marginBottom: '20px', color: '#666666' }}>热搜榜</div>
          {
            hotSongs.length > 0 && hotSongs.map((item, index) => {
              return (
                <div className={styles.root} key={index} onClick={() => handleSearch(item.searchWord)}>
                  <div style={{ color: index > 2 ? '#bfbfbf' : '#eb4d44', position: 'relative', left: '-3px', fontSize: '16px' }}>{index+1}</div>
                  <div className={styles.hotCard}>
                    <div>
                        <span className={styles.songName}>{item.searchWord}</span>
                        <span className={styles.score}>{item.score}</span>
                        <span className={styles.iconHot}>{item.iconType === 1 ? 'HOT' : ''}</span>
                      </div>
                      {
                        item.content && <div className={styles.content}>{item.content}</div>
                      }
                    </div>
                </div>
              )
            }) 
          }
      </div>
    </>
  )
}

export default DrawerContent