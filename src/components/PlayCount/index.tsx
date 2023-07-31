import React from 'react'
import cn from 'classnames'

import { formatNum } from '@/utils/formatNum'
import styles from './style.module.less'

interface IProps {
  count: number
  className?: string
}

const PlayCount: React.FC<IProps> = ({ count, className }) => {
  return (
    <div className={cn(styles.root, className)}>
      {formatNum(count)}
    </div>
  )
}

export default PlayCount
