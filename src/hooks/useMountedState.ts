// 判断组件是否挂载

import { useCallback, useEffect, useRef } from "react";


function useMountedState(): () => boolean {
  const mountRef = useRef<boolean>(false);
  const get = useCallback(() => mountRef.current, [])
  
  useEffect(() => {
    mountRef.current = true

    return () => {
      mountRef.current = false
    }
  })

  return get
}

export default useMountedState