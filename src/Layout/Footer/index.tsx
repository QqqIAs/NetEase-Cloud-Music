import useAudioStore from "@/store/useAudioStore"
import styles from './index.module.less'
import PlayAudio from "@/components/PlayAudio"

function Footer() {

  return <div className={styles.footer}><PlayAudio></PlayAudio></div>

}

export default Footer