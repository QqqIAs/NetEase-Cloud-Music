import { DependencyList, useState, useRef, useCallback } from "react";
import useMountedState from "./useMountedState";

export type AsyncFn<Result = any, Args extends any[] = any[]> = [initialState<Result>, (...args: Args) => Promise<Result | null>] 

type initialState<T> = {
  loading: boolean
  error?: undefined
  value?: undefined
} | {
  loading: boolean
  error: Error
  value?: undefined
} | {
  loading: boolean
  error?: undefined
  value: T
}

interface Options<Result> {
  deps: DependencyList
  initialState: initialState<Result>
  successHandler?: (value: Result) => void
  errorHandler?: (err: Error) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useAsyncFn = <Result = any, Args extends any[] = any[]>(fn: (...args: Args) => Promise<Result>, options: Options<Result> = {
  deps: [],
  initialState: {
    loading: false
  }
}): AsyncFn<Result, Args> => {
  const { initialState = { loading: false }, deps = [], successHandler, errorHandler } = options
  const [state, setState] = useState(initialState)
  const lastCallId = useRef(0)

  const isMounted = useMountedState()

  const callback = useCallback((...args: any) => {
    const callID = ++lastCallId.current
    setState({ loading: true })

    return fn(...args).then(res => {
      if(isMounted() && callID === lastCallId.current) {
        successHandler && successHandler(res)
        setState({ value: res, loading: true })
      }
      return res
    }).catch((error: Error) => {
      if(isMounted() && callID === lastCallId.current) {
        errorHandler && errorHandler(error)
        setState({ loading: false, error })
      }
      return null
    })
  }, deps)

  return [state, callback]
}

export default useAsyncFn
