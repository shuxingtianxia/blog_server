<template>
  <div class='relation'>
    <el-dialog :visible.sync="dialog" :close-on-click-modal="false">
      <vm-table :tableData2='tableData2' :tableConfig="tableConfig">
        <template slot-scope="scope">
          <el-button :disabled="scope.data.disable" @click="relevance(scope.data)" type="primary" size="mini">关联商品</el-button>
        </template>
      </vm-table>
      <el-pagination
        ref="page"
        @current-change="pagination.currentPage=$event"
        :current-page.sync="pagination.currentPage"
        :total="pagination.totalItem"
        layout="total, prev, pager, next, jumper">
      </el-pagination>
      <h4>已关联商品</h4>
      <vm-table :tableData2='tableData' :tableConfig="tableConfig">
        <template slot-scope="scope">
          <el-button @click="cancelRelevance(scope.data.id)" type="primary" size="mini">取消关联</el-button>
        </template>
      </vm-table>
      <div slot="footer">
        <el-button @click="dialog = false">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type='text/javascript'>
import vmTable from './table'
export default {
  props: {
    linkGoodsList: { // 已有的数据
      type: Array,
      default: () => []
    },
    requestConfig: { // 请求
      type: Function
    },
    pageConfig: {
      type: Object,
      default: () => {
        return {
          size: 'size', // 每页的数量
          currentPage: 'page' // 当前页码
        }
      }
    },
    tableConfig: { // 表格：table配置
      type: Array,
      default: () => []
    },
    limitCount: { // 关联数量
      type: Number
    }
  },
  name: 'index',
  data() {
    return {
      dialog: false,
      formData: { ...this.searchData },
      pagination: {
        currentPage: 1,
        size: 10,
        totalItem: 0
      },
      tableData: [],
      tableData2: []
    }
  },
  components: {
    vmTable
  },
  created() {
    this.getTableData()
  },
  watch: {
    'pagination.currentPage': function(val) {
      this.getTableData()
    },
    'pagination.size': function(val) {
      this.getTableData()
    },
    searchData: {
      handler(newVal) {
        this.formData = { ...newVal }
      },
      immediate: true,
      deep: true
    },
    linkGoodsList(newVal) {
      this.tableData = []
      const newArr = JSON.parse(JSON.stringify(newVal))
      newArr.forEach(item => {
        this.tableData.push(item)
      })
      this.filterRelevance(this.tableData2)
    }
  },
  methods: {
    // 获取列表数据
    getTableData() {
      const params = { ...this.formData }
      params[this.pageConfig.currentPage] = this.pagination.currentPage
      params[this.pageConfig.size] = this.pagination.size
      this.requestConfig(params).then(res => {
        if (res.code === 0) {
          const data = res.data
          this.pagination.currentPage = data.page
          this.pagination.totalItem = data.count
          this.tableData2 = data.data
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 点击确定
    save() {
      if (this.tableData.length === 0) return this.$message.info('请选择关联的商品')
      const tableData = JSON.parse(JSON.stringify(this.tableData))
      this.$emit('getTableData', tableData)
      this.dialog = false
    },
    // 关联商品
    relevance(data) {
      let bool = ''
      if (this.tableData.length === 0) {
        bool = true
      } else {
        if (this.limitCount && this.tableData.length === this.limitCount) {
          bool = false
          return
        }
        bool = this.tableData.every(item => item.id !== data.id)
      }
      if (bool) {
        this.tableData.push(data)
      }
      this.filterRelevance(this.tableData2)
    },
    // 过滤是否关联
    filterRelevance(data) {
      console.log(this.tableData)
      const ProductCodes = this.tableData.map(item => {
        return item.id
      })
      data.forEach(item => {
        if (ProductCodes.indexOf(item.id) !== -1) {
          this.$set(item, 'disable', true)
        } else {
          this.$set(item, 'disable', false)
        }
      })
    },
    // 取消关联
    cancelRelevance(id) {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].id === id) {
          this.tableData.splice(i, 1)
          this.filterRelevance(this.tableData2)
          return
        }
      }
    },
    // 分页
    handleCurrentChange(val) {
      this.backgroudGoods.page = val
      this.getGoods()
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
