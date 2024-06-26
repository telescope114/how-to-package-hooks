> @author: 郭瑞峰
>
> @createTime: 2024/06/26
>
> @updateTime: 2024/06/26

### 前言

软考高项下来了，除了作文其他的都挂了，果然一个月看不完700页的东西。

好了，闲话止步于此，咱这篇文章是记录咱在日企学到的新知识：封装hooks，如果你已经会了就跳过吧，毕竟咱这个是新学到的，不记录记录说不过去。

![f8fd0f458df2b2d6e80cba3a9a4ef12b310856cac97517b6d9af70c698826606.png](https://kitaikuyo.one/usr/uploads/2024/06/630186210.png)

### 灵魂发问：为啥封装hooks？

这个是我自己的感受，有不同意见的可以评论区提及

1. 分离复杂状态逻辑，减少页面组件/功能组件代码量

    * 就是说将变量以及变量所涉及的方法进行封装导出

    * 降低后续组件维护时的理解成本

2. 对api接口封装，方便调用

3. 提高复用性

    * 比如说不同页面调用同一套api请求，就可以用hooks封装完成后就直接调用，少些很多逻辑

### 示例：变量以及涉及的逻辑导出

#### react
hooks文件
```ts
import { useState } from "react";

interface UseCountReturn {
  increase: () => void,
  increaseTen: () => void,
  decrease: () => void,
  decreaseTen: () => void,
  resetCount: () => void,
  setCount: (value: (((prevState: number) => number) | number)) => void,
}

// 变量导出
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
      resetCount,
    }
  ]
}

```
react页面文章
```ts
'use client'
import React from "react";
import { useCount } from "@/app/hooks";
import { Button } from "antd";

const Home: React.FC = () => {
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

export default Home
```

#### vue3
hooks文件
```ts
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

```
vue 组合式写法
```html
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

```
vue的jsx/tsx写法
```ts
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

```

#### 关于注释

还有其他作用，就是添加注释，这样只是hooks文件变多了，不影响页面组件/功能组件
![图片.png](https://kitaikuyo.one/usr/uploads/2024/06/100392073.png)
这里加了备注，ide上面就可以清晰看见变量/方法
![图片2.png](https://kitaikuyo.one/usr/uploads/2024/06/2584739048.png)

### 示例：接口处理

#### react

将列表所涉及的东西全部封装到hooks，包括table组件所需的配置文件

```ts
import { useState } from "react";
import type { TableProps } from "antd";

type DataType = {
  id: string,
  name: string,
  age: number,
}

interface TableRequest {
  code: number,
  data: DataType[]
}

export type UseFetchReturn = [
  {
    tableColumns: TableProps<DataType>['columns'],
    loading: boolean,
    table: TableRequest['data']
  },
  {
    request: () => void
  }
]

const tableColumns: TableProps<DataType>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }
]

export const useFetch = (): UseFetchReturn => {
  const [loading, setLoading] = useState<boolean>(false)
  const [table, setTable] = useState<TableRequest['data']>([])
  const request = () => {
    setLoading(true)
    window.setTimeout(() => {
      window.fetch('/fetchHooks.json', { method: 'get' })
        .then(response => response.json())
        .then((data: TableRequest) => {
          setTable(data.data)
        })
        .finally(() => {
          setLoading(false)
        })
    }, 500)
  }
  return [
    { loading, table, tableColumns },
    { request }
  ]
}

```

react的page组件就只需要调用`useFetch`就可以了
```ts
'use client'
import React from "react";
import { Button, Table } from "antd";
import { useFetch } from "@/app/fetchHooks/hooks";

const FetchHooks: React.FC = () => {
  const [
    { table, loading, tableColumns },
    { request }
  ] = useFetch();
  return <div className={'h-full w-full'}>
    <Button onClick={request}>fetch</Button>
    <Table dataSource={table} columns={tableColumns} loading={loading} rowKey={"id"} />
  </div>
}

export default FetchHooks

```

#### vue3
hooks文件
```ts
import { ref, reactive, computed, type ComputedRef } from 'vue'
import type { TableProps } from 'ant-design-vue'

type DataType = {
  id: string,
  name: string,
  age: number,
}

interface TableRequest {
  code: number,
  data: DataType[]
}

type TableDataType = {
  columns: TableProps<DataType>['columns'],
  loading: boolean,
  data: TableRequest['data']
}

export type UseFetchReturn = [
  ComputedRef<TableDataType>,
  {
    request: () => void
  }
]

const tableColumns: TableProps<DataType>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }
]

export const useFetch = (): UseFetchReturn => {
  const tableData = reactive<TableDataType>({
    loading: false,
    data: [],
    columns: tableColumns
  })
  const request = () => {
    tableData.loading = true
    window.setTimeout(() => {
      window.fetch('/fetchHooks.json', { method: 'get' })
        .then(response => response.json())
        .then((data: TableRequest) => {
          tableData.data = data.data
        })
        .finally(() => {
          tableData.loading = false
        })
    }, 500)
  }
  return [
    computed(() => tableData),
    { request }
  ]
}

```
vue3组合式写法
```html
<script setup lang="ts">
import { Button, Table } from 'ant-design-vue'
import { useFetch } from './hooks.ts'
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

```
vue3的jsx/tsx写法
```ts
import { defineComponent, watch } from 'vue'
import { Button, Table } from 'ant-design-vue'
import { useFetch } from './hooks.ts'

const FetchHooksTsx = defineComponent({
  name: 'FetchHooksTsx',
  setup: (props, ctx) => {
    const [
      tableData,
      { request }
    ] = useFetch()
    return () => (
      <div>
        <Button onClick={request}>fetch</Button>
        <Table
          dataSource={tableData.value.data}
          columns={tableData.value.columns}
          loading={tableData.value.loading}
          rowKey="id"
        />
      </div>
    )
  }
})

export default FetchHooksTsx

```

github：[hooks项目示例](https://github.com/telescope114/how-to-package-hooks "hooks项目示例")

![1d4179ef03459c98b7d3082d0346d472cd5d73d812c2549844c7f81ac28fbfcd.png](https://kitaikuyo.one/usr/uploads/2024/06/1681230968.png)
