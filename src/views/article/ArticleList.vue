<template>
  <div class="article-list">
    <ass-table
      ref="AssTable"
      :searchData="searchData"
      :formConfig="formConfig"
      :tableConfig="tableConfig"
      :requestConfig="requestConfig"
    >
      <template slot="formButton">
        <el-button type="success" plain @click="$router.push({name: 'AddArticle', params: {type: 'add', id: -1}})"><i class="el-icon-plus"></i>添加文章</el-button>
        <el-button type="danger" plain @click="delMany"><i class="el-icon-minus"></i>删除选中</el-button>
      </template>
      <template slot="articleCategory" slot-scope="{data}">
        <span>{{data.row.articleCategory}}</span>
      </template>
      <template slot="handle" slot-scope="{data}">
        <el-button size="mini" @click="$router.push({name: 'AddArticle', params: {type: 'edit', id: data.row._id}})">编辑</el-button>
        <el-button type="danger" size="mini" @click="del(data.row._id)">删除</el-button>
      </template>
    </ass-table>
  </div>
</template>

<script type="text/javascript">
import { getArticle, delArticle, delManyArticle } from '@/api/article/article'
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [], // 全选的值
      searchData: {},
      formConfig: [
        {
          componentType: 'input',
          key: 'userId',
          label: '用户名',
          placeholder: '用户名'
        }
      ],
      tableConfig: [
        {
          label: 'id',
          key: '_id'
        },
        {
          label: '文章名称',
          key: 'articleName'
        },
        {
          label: '文章分类',
          key: 'articleCategory',
          slotName: 'articleCategory'
        },
        {
          label: '作者',
          key: 'author'
        },
        {
          label: '浏览次数',
          key: 'views'
        },
        {
          label: '时间',
          key: 'time'
        },
        {
          label: '评论次数',
          key: 'comment'
        },
        {
          label: '操作',
          width: 110,
          slotName: 'handle'
        }
      ],
      requestConfig: {
        getTableData: getArticle
      }
    }
  },
  created() {
    // this.getArticle()
  },
  methods: {
    // 获取文章列表
    _getArticle() {
      getArticle().then(res => {
        if (res.code === 0) {
          this.tableData = res.data
        }
      })
    },
    // 删除单条文章
    del(id) {
      this.$confirm('确定要删除该文章吗？', '提示', {
        type: 'warning'
      }).then(() => {
        delArticle(id).then(res => {
          if (res.code === 0) {
            this.$message.success('删除成功')
            this.getArticle()
          }
        })
      })
    },
    // 删除多条文章
    delMany(id) {
      if (!this.multipleSelection.length) return this.$message.error('请选择需要删除的文章')
      this.$confirm('确定要删除选中文章吗？', '提示', {
        type: 'warning'
      }).then(() => {
        delManyArticle({ multipleSelection: this.multipleSelection }).then(res => {
          if (res.code === 0) {
            this.$message.success('删除成功')
            this.getArticle()
          }
        })
      })
    },
    // 全选
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
