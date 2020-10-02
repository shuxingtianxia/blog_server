<template>
  <div class="user-list">
    <el-card>
      <el-table>
        <el-table-column label="id"></el-table-column>
        <el-table-column label="用户名"></el-table-column>
        <el-table-column label="管理员"></el-table-column>
        <el-table-column label="注册时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button size="mini">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      
    }
  },
  components: {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
</style>
