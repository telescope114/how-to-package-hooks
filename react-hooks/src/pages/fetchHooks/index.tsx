'use client'
import React from "react";
import { Button, Table } from 'antd'
import { useFetch } from './hooks'

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