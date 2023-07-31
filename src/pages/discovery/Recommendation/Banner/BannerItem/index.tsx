import cn from 'classnames'

import styles from './index.module.less'



function BannerItem(props: any) {
  const {typeTitle, imageUrl, className, onClick} = props

  return (
    <div className={cn(styles.root, className)} onClick={onClick}>
      <img src={imageUrl} loading='lazy' />
      <div className={styles.type}>{typeTitle}</div>
    </div>
  )

}

export default BannerItem