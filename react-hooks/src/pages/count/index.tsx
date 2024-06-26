'use client'
import React from 'react'
import { useCount } from './hooks.ts'
import { Button } from 'antd'

const Count: React.FC = () => {
  const [
    count,
    { increase, increaseTen, decrease, decreaseTen, resetCount }
  ] = useCount(1)
  return <main className={'h-full w-full'}>
    <div>{ count }</div>
    <Button onClick={decreaseTen}>-10</Button>
    <Button onClick={decrease}>-1</Button>
    <Button onClick={increase}>+1</Button>
    <Button onClick={increaseTen}>+10</Button>
    <Button onClick={resetCount}>reset</Button>
  </main>
}

export default Count
