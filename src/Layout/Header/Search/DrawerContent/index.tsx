import { DeleteOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { useState } from 'react'

function DrawerContent (props) {

  const {hotSongs} = props

  console.log('xx', hotSongs)

  const [forceUpdate, setForceUpdate] = useState(false);

  const searchHistory = JSON.parse(localStorage.getItem('searchHistory')!)

  const deleteHistory = () => {
    localStorage.removeItem('searchHistory')
    // 触发页面渲染
    setForceUpdate(!forceUpdate)
  }

  return (
    <>
      { searchHistory?.length > 0 && <div className={styles.history}>
        <div style={{ marginBottom: '5px' }} ><span style={{ color: '#666666', marginRight: '10px' }}>搜索历史</span><span><DeleteOutlined onClick={deleteHistory} style={{ color: '#666666' }} /></span></div>
        <div className={styles.searchLists}>
          {
            searchHistory?.length > 0 && searchHistory.map((item, index) => {
              return <span key={index} className={styles.searchSpan}>{item}</span>
            })
          }
        </div>
      </div>}
      <div className={styles.hot}>
          <div style={{ marginTop: '20px', marginBottom: '20px', color: '#666666' }}>热搜榜</div>
          {
            hotSongs.length > 0 && hotSongs.map((item, index) => {
              return (
                <div className={styles.root} key={index}>
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