import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'

type CountOperation = {
  setCount: (val: number) => void,
  increase: () => void,
  increaseTen: () => void,
  decrease: () => void,
  decreaseTen: () => void,
  resetCount: () => void
}

export const useCount = (defaultVal?: number): [ComputedRef<number>, CountOperation] => {
  const count: Ref<number> = ref(defaultVal || 0)
  const setCount = (val: number) => { count.value = val }
  const increase = () => setCount(count.value + 1)
  const increaseTen = () => setCount(count.value + 10)
  const decrease = () => setCount(count.value - 1)
  const decreaseTen = () => setCount(count.value - 10)
  const resetCount = () => setCount(defaultVal || 0)
  return [
    computed(() => count.value),
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
