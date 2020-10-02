<template>
  <div class="article-list">
    <el-card>
      <el-form>
        <el-form-item>
          <el-button type="success" plain><i class="el-icon-plus"></i>添加文章</el-button>
          <el-button type="danger" plain><i class="el-icon-minus"></i>删除选中</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData">
        <el-table-column label="id"></el-table-column>
        <el-table-column label="文章名称"></el-table-column>
        <el-table-column label="文章分类"></el-table-column>
        <el-table-column label="作者"></el-table-column>
        <el-table-column label="浏览次数"></el-table-column>
        <el-table-column label="时间"></el-table-column>
        <el-table-column label="评论"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      tableData: []
    }
  },
  components: {

  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
