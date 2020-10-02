<template>
  <div class="category-list">
    <el-card>
      <el-form>
        <el-form-item>
          <el-button type="success" plain><i class="el-icon-plus"></i>添加分类</el-button>
        </el-form-item>
      </el-form>
      <el-table>
        <el-table-column label="id"></el-table-column>
        <el-table-column label="分类名"></el-table-column>
        <el-table-column label="最后时间"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button>编辑</el-button>
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="添加分类名" :visible.sync="dialog">
      <el-form label-width="100px" :model="form" ref="form">
        <el-form-item label="分类名："
          prop="category"
          :rules="[
            { required: true, message: '分类名为空', trigger: 'blur'},
          ]"
          >
          <el-input placeholder="请输入分类名" style="width: 300px;" v-model="form.category"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      dialog: false,
      form: {
        category: ''
      }
    }
  },
  components: {

  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if(valid) {

        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
