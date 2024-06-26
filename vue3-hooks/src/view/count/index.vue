<script setup lang="ts">
import { useCount } from './hooks.ts'
import { Button } from 'ant-design-vue'
const [
  count,
  { increase, increaseTen, decrease, decreaseTen, resetCount }
] = useCount(1)
</script>

<template>
  <div>
    <div>{{ count }}</div>
    <Button @click="decreaseTen">-10</Button>
    <Button @click="decrease">-1</Button>
    <Button @click="increase">+1</Button>
    <Button @click="increaseTen">+10</Button>
    <Button @click="resetCount">重制</Button>
  </div>
</template>
