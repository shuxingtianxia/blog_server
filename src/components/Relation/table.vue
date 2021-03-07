<template>
   <div class="table">
    <el-table :data='tableData2' border :cell-style="cellStyle" :header-cell-style="headStyle">
      <el-table-column v-for="(item, index) in tableConfig" :key="index" :label="item.label" :width="item.width || ''">
        <template slot-scope="scope">
          <!--插槽：表格每项-->
          <slot v-if="item.slotName" :data="scope" :name="item.slotName"></slot>
          <span v-else>{{scope.row[item.key]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <slot :data="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script type='text/javascript'>
export default {
  props: {
    tableConfig: {
      type: Array,
      default: () => []
    },
    tableData2: {
      type: Array,
      default: () => []
    }
  },
  name: 'vmTable',
  data() {
    return {}
  },
  methods: {
    cellStyle() {
      return 'text-align: center'
    },
    headStyle() {
      return 'text-align: center;background:#f5f7fA;'
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
