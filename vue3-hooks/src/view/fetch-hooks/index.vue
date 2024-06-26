<script setup lang="ts">
import { Button, Table } from 'ant-design-vue'
import { useFetch } from './hooks.ts'
import { watch } from 'vue'
const [
  tableData,
  { request }
] = useFetch()
</script>

<template>
  <div>
    <Button @click="request">fetch</Button>
    <Table
      :data-source="tableData.data"
      :columns="tableData.columns"
      :loading="tableData.loading"
      :row-key="'id'"
    />
  </div>
</template>
