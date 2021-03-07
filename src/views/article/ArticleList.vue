<template>
  <div class="article-list">
    <el-card>
      <el-form>
        <el-form-item>
          <el-button type="success" plain @click="$router.push({name: 'AddArticle', params: {type: 'add', id: -1}})"><i class="el-icon-plus"></i>添加文章</el-button>
          <el-button type="danger" plain @click="delManyArticle"><i class="el-icon-minus"></i>删除选中</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" @selection-change="handleSelectionChange" row-key="_id">
        <el-table-column type="selection" width="50" :reserve-selection="true"></el-table-column>
        <el-table-column label="id" prop="_id"></el-table-column>
        <el-table-column label="文章名称" prop="articleName"></el-table-column>
        <el-table-column label="文章分类" prop="articleCategory">
          <template slot-scope="{row}">
            {{row.articleCategory.title}}
          </template>
        </el-table-column>
        <el-table-column label="作者" prop="author"></el-table-column>
        <el-table-column label="浏览次数" prop="views"></el-table-column>
        <el-table-column label="时间" prop="time" width="200"></el-table-column>
        <el-table-column label="评论次数" prop="comment">
          <template slot-scope="{row}">
            {{row.comment.length}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="{row}">
            <el-button size="mini" @click="$router.push({name: 'AddArticle', params: {type: 'edit', id: row._id}})">编辑</el-button>
            <el-button size="mini" type="danger" @click="delArticle(row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script type="text/javascript">
import * as article from '@/api/article/article'
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [] // 全选的值
    }
  },
  created() {
    this.getArticle()
  },
  methods: {
    // 获取文章列表
    getArticle() {
      article.getArticle().then(res => {
        if (res.code === 0) {
          this.tableData = res.data
        }
      })
    },
    // 删除单条文章
    delArticle(id) {
      this.$confirm('确定要删除该文章吗？', '提示', {
        type: 'warning'
      }).then(() => {
        article.delArticle(id).then(res => {
          if (res.code === 0) {
            this.$message.success('删除成功')
            this.getArticle()
          }
        })
      })
    },
    // 删除多条文章
    delManyArticle(id) {
      if (!this.multipleSelection.length) return this.$message.error('请选择需要删除的文章')
      this.$confirm('确定要删除选中文章吗？', '提示', {
        type: 'warning'
      }).then(() => {
        article.delManyArticle({ multipleSelection: this.multipleSelection }).then(res => {
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
