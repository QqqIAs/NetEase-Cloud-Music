import useAudioStore from "@/store/useAudioStore"
import { CaretRightOutlined, HeartOutlined, PauseOutlined, ShareAltOutlined, StepBackwardOutlined, StepForwardOutlined } from "@ant-design/icons"
import styles from './index.module.less'


function MiddleAudioItem () {

  const { play, setPlay } = useAudioStore((state) => state)


  return (
    <>
            <div className={styles.prev}>
        <HeartOutlined style={{ color: '#545454', marginRight:'25px' }}/>
        <StepBackwardOutlined />
      </div>
      <div className={styles.pause} onClick={() => setPlay(!play)}>
        {play ? <PauseOutlined style={{color: '#fcfcfc'}}/> : <CaretRightOutlined style={{color: '#fcfcfc'}} />}
      </div>
      <div className={styles.next} >
        <StepForwardOutlined />
        <ShareAltOutlined style={{ color: '#545454', marginLeft:'25px' }}/>
      </div>
    </>
  )
}

export default MiddleAudioItem