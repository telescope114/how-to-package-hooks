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
