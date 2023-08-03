import styles from './index.module.less'
import formatTime from '@/utils/formatTime'
import getDurationTime from '@/utils/getDurationTime'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Drawer } from 'antd'
import SongDetail from '@/components/SongDetail'
import { useEffect, useState } from 'react'
import useLayoutStore from '@/store/useLayoutStore'

function AudioItem (props) {
  
  const {picUrl, songName, artists, duration, currentTime} = props
  const { showLyric,setShowLyric } = useLayoutStore((state) => state)

  const showDrawer = () => {
    setShowLyric(!showLyric)
  };

  const onClose = () => {
    setShowLyric(false)
  };

  return (
    <>
        <Drawer rootClassName={styles.drawer} closeIcon={false} placement="bottom" onClose={onClose} open={showLyric}><SongDetail></SongDetail></Drawer>
        <div onClick={showDrawer} style={{ position: 'relative' }}>
          <div className={styles.mask}>
          {
            showLyric ? <>
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