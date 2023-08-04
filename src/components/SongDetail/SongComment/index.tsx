import styles from './index.module.less'
import { getCommentMusic } from '@/services/search'
import useAudioStore from '@/store/useAudioStore'
import { useAntdTable, useUpdateEffect } from 'ahooks'
import { useEffect, useRef, useState } from 'react'
import UserComment from './UserComment'
import { RightOutlined } from '@ant-design/icons'
import { Pagination } from 'antd'

function SongComment () {

  const { id } = useAudioStore((state) => state)
  const ref = useRef(null)

  const latestId = id == 0 ? JSON.parse(localStorage.getItem('musicInitialState')!).id : id;

  const [hotComment, setHotComment] = useState([])

  const { tableProps, pagination } = useAntdTable(
    async ({ current }) => {
      const { comments, hotComments, total }  = await getCommentMusic({
        offset: (current - 1) * 30,
        id: latestId
      });
      setHotComment(hotComments)
      return { list: comments, total };
    },
    { debounceWait: 300, defaultPageSize: 30, refreshDeps: [id] },
  );

  useEffect(() => {
    // 翻页后最新评论置中
    ref.current && ref.current.scrollIntoView()
  }, [pagination.current])

  const [dataSource, setDataSource] = useState(tableProps?.dataSource || [])

  useUpdateEffect(() => {
    setDataSource(tableProps?.dataSource || [])
  }, [tableProps?.dataSource]);


  return (
    <>
      <div className={styles.root}>
        {
          hotComment?.length > 0 && <><div className={styles.good}>
          <div style={{ color: '#323232', fontWeight: 'bold' }}>精彩评论</div>
          {
             hotComment.map((item) => {
              return <UserComment
                avatarUrl={item.user.avatarUrl}
                nickName={item.user.nickname}
                content={item.content}
                time={item.time}
                likedCount={item.likedCount}
              ></UserComment>
            })
          }
        </div>
        <div className={styles.more}><div>更多精彩评论<RightOutlined style={{ marginLeft: '5px', color: '#969696'}} /></div></div>
        </>
        }
        <div>
          <div ref={ref} style={{ color: '#323232', fontWeight: 'bold' }}>{`最新评论 (${tableProps.pagination.total})`}</div>
          {
            dataSource?.length > 0 && dataSource.map((item) => {
              return <UserComment
                avatarUrl={item.user.avatarUrl}
                nickName={item.user.nickname}
                content={item.content}
                time={item.time}
                likedCount={item.likedCount}
              ></UserComment>
            })
          }
        </div>
        <div className={styles.paginationBottom} >
          <Pagination {...pagination}
></Pagination>
        </div>
      </div>
    </>

  )
}

export default SongComment