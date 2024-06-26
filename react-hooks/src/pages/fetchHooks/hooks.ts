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