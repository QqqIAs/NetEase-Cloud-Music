import styles from './index.module.less';
import cn from 'classnames'

function MusicItem(props: any) {
  const { name, picUrl, artists, index } = props

  const hasBorderBottom = [4, 9].indexOf(index) > -1

  return (
    <div className={cn(styles.root, hasBorderBottom && styles.borderBottom)}>
      <img className={cn(styles.img)} src={picUrl} alt="" />
      <span className={cn(styles.number)}>{index !== 9 ? `0${index + 1}` : index + 1}</span>
      <div>
        <div>{name}</div>
        <div className={cn(styles.artists)}>{artists[0].name}</div>
      </div>
    </div>
  )
}

export default MusicItem