<template>
  <div class="category-list">
    <el-card>
      <el-form>
        <el-form-item>
          <el-button type="success" plain @click="updateCategory('add')"><i class="el-icon-plus"></i>添加分类</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData">
        <el-table-column label="id" prop="_id" width="250"></el-table-column>
        <el-table-column label="分类名" prop="title"></el-table-column>
        <el-table-column label="最后时间" prop="time" width="200"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="{row}">
            <el-button size="mini" @click="updateCategory('edit', row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="delCategory(row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="form.type === 'add' ? '添加' : '编辑' + '分类名'" :visible.sync="dialog" width="500px">
      <el-form label-width="100px" :model="form" ref="form" :rules="rules">
        <el-form-item label="分类名：" prop="title">
          <el-input placeholder="请输入分类名" style="width: 300px;" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <vm-upload :fileLists="fileLists" @onComplete="onComplete" @handleRemove="handleRemove"></vm-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(form.type)">{{form.type === 'add' ? '添加' : '编辑'}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import * as category from '@/api/category/category'
import { createdRules } from '@/unit/createRule'
export default {
  data() {
    const form = {
      title: '',
      type: 'add',
      categoryImage: ''
    }
    return {
      dialog: false,
      tableData: [],
      fileLists: [],
      form,
      rules: {
        ...createdRules(form)
      }
    }
  },
  created() {
    this.getCategory()
  },
  methods: {
    // 获取分类列表
    getCategory() {
      category.getCategory().then(res => {
        if (res.code === 0) {
          this.tableData = res.data
        }
      })
    },
    // 点击添加编辑
    updateCategory(type, row) {
      console.log(row)
      if (type === 'edit') {
        const { _id, title, categoryImage } = row
        this.form = {
          _id,
          title,
          type
        }
        this.fileLists.push({ url: categoryImage })
      } else {
        this.form = {
          _id: '',
          title: '',
          type
        }
        this.fileLists = []
      }
      this.dialog = true
    },
    // 添加分类
    submitForm(type) {
      console.log('this.$refs.form', this.$refs.form)
      console.log('this.form', this.form)
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.form)
          const method = type === 'add' ? 'addCategory' : 'editCategory'
          category[method](this.form).then(res => {
            if (res.code === 0) {
              this.$message.success(type === 'add' ? '添加成功' : '编辑成功')
              this.getCategory()
              this.dialog = false
            }
          })
        }
      })
    },
    // 删除分类
    delCategory(id) {
      this.$confirm('确定要删除该分类吗？', '提示', {
        type: 'warning'
      }).then(() => {
        console.log(category)
        category.delCategory(id).then(res => {
          if (res.code === 0) {
            this.$message.success('删除成功')
            this.getCategory()
          }
        })
      })
    },
    // 图片上传
    onComplete(result) {
      this.form.categoryImage = result
    },
    // 图片删除
    handleRemove() {
      this.form.categoryImage = ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
