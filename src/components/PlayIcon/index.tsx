import React from 'react'
import cn from 'classnames'

import styles from './style.module.less'
import { Icon } from '@blueprintjs/core'
interface IProps {
  className?: string
}

const PlayIcon: React.FC<IProps> = ({ className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <Icon icon='play'></Icon>
    </div>
  )
}

export default PlayIcon
