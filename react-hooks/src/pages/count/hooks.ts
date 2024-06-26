import { useState } from 'react'

interface UseCountReturn {
  // 累加1
  increase: () => void,
  // 累加10
  increaseTen: () => void,
  // 减去1
  decrease: () => void,
  // 减去10
  decreaseTen: () => void,
  // 恢复初始值
  resetCount: () => void,
  // 设置值
  setCount: (value: (((prevState: number) => number) | number)) => void
}

/**
 * 计数器
 * @param defaultVal {number}
 * @return {[number, UseCountReturn]}
 */
export const useCount = (defaultVal?: number): [number, UseCountReturn] => {
  const [count, setCount] = useState(defaultVal || 0)
  const increase = () => setCount(val => val + 1)
  const increaseTen = () => setCount(val => val + 10)
  const decrease = () => setCount(val => val - 1)
  const decreaseTen = () => setCount(val => val - 10)
  const resetCount = () => setCount(defaultVal || 0)
  return [
    count,
    {
      setCount,
      increase,
      increaseTen,
      decrease,
      decreaseTen,
      resetCount
    }
  ]
}
