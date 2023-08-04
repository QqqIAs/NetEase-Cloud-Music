import { HeartOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import dayjs from 'dayjs'

function UserComment (props) {
  const { avatarUrl, nickName, content, time, likedCount } = props

  const latetime = dayjs(time).format('M月D日 HH:mm')

  return (
    <>
      <div className={styles.root}>
        <div>
          <img className={styles.img} src={avatarUrl} alt="" />
        </div>
        <div className={styles.right}>
            <div>
              <span className={styles.nickName}>{`${nickName}:`}</span>
              <span className={styles.content}>{content}</span>
            </div>
            <div className={styles.bottom} >
              <span className={styles.time}>{latetime}</span>
              <span className={styles.count}><HeartOutlined style={{ marginRight: '5px' }} />{likedCount}</span>
            </div>
        </div>
      </div>
    </>
  )
}

export default UserComment