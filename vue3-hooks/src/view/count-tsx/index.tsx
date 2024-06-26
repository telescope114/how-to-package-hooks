import { defineComponent } from 'vue'
import { useCount } from './hooks.ts'
import { Button } from 'ant-design-vue'

const CountTsx = defineComponent({
  name: 'CountTsx',
  setup() {
    const [count, { increase, increaseTen, decrease, decreaseTen, resetCount }] = useCount(1)
    return () => (
      <div>
        <div>{ count.value }</div>
        <Button onClick={decreaseTen}>-10</Button>
        <Button onClick={decrease}>-1</Button>
        <Button onClick={increase}>+1</Button>
        <Button onClick={increaseTen}>+10</Button>
        <Button onClick={resetCount}>重置</Button>
      </div>
    )
  }
})

export default CountTsx
