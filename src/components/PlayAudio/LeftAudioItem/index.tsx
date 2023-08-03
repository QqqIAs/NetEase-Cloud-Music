import styles from './index.module.less'
import formatTime from '@/utils/formatTime'
import getDurationTime from '@/utils/getDurationTime'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Drawer } from 'antd'
import SongDetail from '@/components/SongDetail'
import { useState } from 'react'

function AudioItem (props) {
  
  const {picUrl, songName, artists, duration, currentTime} = props

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(!open);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
        <Drawer rootClassName={styles.drawer} closeIcon={false} placement="bottom" onClose={onClose} open={open}><SongDetail></SongDetail></Drawer>
        <div onClick={showDrawer} style={{ position: 'relative' }}>
          <div className={styles.mask}>
          {
            open ? <>
            <ArrowDownOutlined style={{ color: '#ffffff'}} />
            <ArrowUpOutlined style={{ color: '#ffffff', marginBottom: '5px'}} /></>
          : <>
          <ArrowUpOutlined style={{ color: '#ffffff', marginBottom: '5px'}} />
        <ArrowDownOutlined style={{ color: '#ffffff'}} /></>
          }
          </div>
          <img className={styles.img} src={picUrl} alt="" />
        </div>
        <div className={styles.text}>
          <div className={styles.top}>
            <span className={styles.name}>{songName}&nbsp;</span>
            <span className={styles.artists}>{`- ${artists}`}</span>
          </div>
          <div className={styles.duration} >{`${formatTime(currentTime)}/${getDurationTime(duration)}`}</div>
        </div>
    </>
  )
}

export default AudioItem