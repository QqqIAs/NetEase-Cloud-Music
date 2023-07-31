import { useState, useEffect, useMemo } from "react";
import * as DiscoveryApi from '@/services/discovery'
import { BannerType, TARGET_TYPE } from "@/type/Recommandation";
import useInterval from "@/hooks/useInterval";
import BannerItem from "./BannerItem";
import styles from './index.module.less'
import cn from 'classnames'

function Banner() {

  const [currentMid, setCurrentMid] = useState(0)

  const [state, setState] = useState<BannerType[]>()

  useEffect(() => {
    DiscoveryApi.getBanner().then(res => setState(res.banners))
  }, [])

  useInterval(() => {
    if (!state!.length) {
      return
    }
    setCurrentMid((currentMid + 1) % state!.length)
  }, 3000)

  const bannersClassName = useMemo(() => {
    const len = state?.length
    const left = (currentMid - 1 + len!) % len!
    const right = (currentMid + 1) % len!
    return {
      [currentMid]: styles.middle,
      [left]: styles.left,
      [right]: styles.right,
    }
  }, [currentMid, state])

  const handleMidChange = (index: number) => {
    setCurrentMid(index)
  }


  return (
    <>
      {state && <div className={styles.root}>
      <div className={styles.banners}>
        {state.map(({ imageUrl, typeTitle, targetId, targetType }, index) => {
          const className = bannersClassName[index] || styles.hidden
          const isMusicType = targetType === TARGET_TYPE.MUSIC
          return (
            <BannerItem
              key={imageUrl}
              typeTitle={typeTitle}
              imageUrl={imageUrl}
              className={cn(className, isMusicType && styles.enabled)}
            />
          )
        })}
      </div>
      <div className={styles.dots}>
        {state.map(({ imageUrl }, index) => {
          return (
            <div
              key={imageUrl}
              className={cn(styles.dot, index === currentMid ? styles.active : '')}
              onMouseOver={() => handleMidChange(index)}
            ></div>
          )
        })}
      </div>
    </div>}
    </>
  )
}

export default Banner