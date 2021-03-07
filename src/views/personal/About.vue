<template>
  <div class="about">
    <el-card>
      <el-form>
        <el-form-item>
          <el-button type="success" plain  @click="$router.push({name: 'AddPersonal', params: {type: 'add', id: -1}})"><i class="el-icon-plus"></i>添加简介</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData">
        <el-table-column label="id" prop="_id"></el-table-column>
        <el-table-column label="个人简介" prop="intro"></el-table-column>
        <el-table-column label="头像">
          <template slot-scope="{row}">
            <img :src="row.avatar" alt="" style="width: 80px; height: 80px">
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="{row}">
            <el-button size="mini" @click="$router.push({name: 'AddPersonal', params: {type: 'edit', id: row._id}})">编辑</el-button>
            <el-button type="danger" size="mini" @click="delAbout(row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script type="text/javascript">
import * as about from '@/api/about/about'
export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getAbout()
  },
  methods: {
    // 获取列表
    getAbout() {
      about.getAbout().then(res => {
        if (res.code === 0) {
          this.tableData = res.data
        }
      })
    },
    // 删除
    delAbout(id) {
      this.$confirm('确定要删除该数据吗？', '提示', {
        type: 'warning'
      }).then(() => {
        about.delAbout({ id }).then(res => {
          if (res.code === 0) {
            this.$message.success('删除成功')
            this.getAbout()
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
