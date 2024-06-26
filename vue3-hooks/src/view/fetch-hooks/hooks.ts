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
