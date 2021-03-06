<!-- 这个组件集合了搜索+表格+页码，符合基本功能的可以直接用，更多功能待扩展 -->
<template>
  <div>
    <el-card>
      <!-- 【1】搜索 -->
      <el-form
        class="form-box"
        :model="formData"
        inline
        @submit.native.prevent
        v-if="showFormJudge"
      >
        <el-form-item v-for="item in formConfig" :key="item.key" :label="item.label">
          <!--输入框-->
          <el-input
            v-if="item.componentType==='input'"
            @keydown.enter.native="getTableData"
            v-model="formData[item.key]"
            :placeholder="`请输入${item.placeholder ? item.placeholder : ''}`"
            :style="{width:item.width+'px'}">
          </el-input>
        </el-form-item>
        <el-form-item>
          <slot name="formButton"></slot>
        </el-form-item>
      </el-form>
      <!-- 【2】无切换的表格-->
      <el-table
        :data="tableData"
        border
        :cell-style="cellStyle"
        :header-cell-style="headStyle"
      >
        <el-table-column v-for="(item, index) in tableConfig" :key="index" :label="item.label" :width="item.width || ''">
          <template slot-scope="scope">
            <!--插槽：表格每项-->
            <slot v-if="item.slotName" :data="scope" :name="item.slotName"></slot>
            <span v-else>{{scope.row[item.key]}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!--【3】页码-->
      <el-pagination
        ref="page"
        @size-change="pagination.pageSize=$event"
        @current-change="pagination.currentPage=$event"
        :current-page.sync="pagination.currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size.sync="pagination.pageSize"
        :total="pagination.totalItem"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </el-card>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'index',
  props: {
    searchData: { // 搜索：formData
      type: Object,
      default: () => {}
    },
    formConfig: { // 搜索：form配置
      type: Array,
      default: () => {
        return []
      }
    },
    requestConfig: { // 请求集合
      type: Object,
      default: () => {
      }
    },
    tableConfig: { // 表格：table配置
      type: Array,
      default: () => []
    },
    rowKey: { // 多选需要传的id
      type: String,
      default: ''
    },
    // 获取表格数据接口传参页码的配置
    // 防止接口页码参数不统一使用，如有些接口当前页用page，有些接口用pageNum
    pageConfig: {
      type: Object,
      default: () => {
        return {
          pageSize: 'pageSize', // 每页的数量
          currentPage: 'page' // 当前页码
        }
      }
    }
  },
  data() {
    return {
      formData: { ...this.searchData },
      formOptions: {}, // 搜索：所有下拉框的下拉选项
      tableData: [], // 表格：列表数据
      pagination: {
        currentPage: 1,
        pageSize: 10,
        totalItem: 0
      }
    }
  },
  computed: {
    // 判断查询form区域是否显示
    showFormJudge() {
      const bol = this.formConfig.length > 0 || this.$scopedSlots.formItem || this.$scopedSlots.formButton || this.enableConfig.showExportBtn.show
      return bol
    }
  },
  watch: {
    'pagination.currentPage': function(val) {
      this.getTableData()
    },
    'pagination.pageSize': function(val) {
      this.getTableData()
    },
    searchData: {
      handler(newVal) {
        this.formData = { ...newVal }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.routerpPath = this.$route.fullPath
    // 获取列表数据
    this.getTableData()
  },
  methods: {
    // 获取列表数据
    getTableData() {
      const params = { ...this.formData }
      params[this.pageConfig.currentPage] = this.pagination.currentPage
      params[this.pageConfig.pageSize] = this.pagination.pageSize
      this.requestConfig.getTableData(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.data || []
          this.pagination.totalItem = res.data.count
          // this.$emit('getTableData', this.tableData)
        } else {
          // this.$message.error(res.message)
        }
      })
    },
    // 表格样式
    cellStyle() {
      return 'text-align: center'
    },
    headStyle() {
      return 'text-align: center;background:#f5f7fA;'
    }
  }
}
</script>

<style lang="scss" scoped>
// .form-box /deep/ .el-form-item {
//   margin-bottom: 10px;
// }
</style>
