<template>
  <div class="add-banner">
    <el-card>
      <el-form label-width="120px" :model="form" :rules="rules" ref="form">
        <el-form-item label="标题名称：" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="广告图片：" prop="url">
          <vm-upload :fileLists="urlList" @onComplete="onComplete" @handleRemove="handleRemove"></vm-upload>
        </el-form-item>
        <el-form-item label="关联文章：" prop="articleId">
          <el-button type="primary" @click="relation">关联文章</el-button>
          <el-table :data="tableData"  border :cell-style="cellStyle" :header-cell-style="headStyle">
             <el-table-column v-for="(item, index) in tableConfig" :key="index" :label="item.label" :width="item.width || ''">
              <template slot-scope="scope">
                <!--插槽：表格每项-->
                <slot v-if="item.slotName" :data="scope" :name="item.slotName"></slot>
                <span v-else>{{scope.row[item.key]}}</span>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="{$index}">
                <el-button type="danger" size="mini" @click="del($index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <div id="btn">
        <el-button>取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-card>
    <vm-relation
      ref="vmRelation"
      :formData="formData"
      :requestConfig="requestConfig"
      :tableConfig="tableConfig"
      @getTableData="getTableData"
      :limitCount="1"
      :linkGoodsList="tableData"
    ></vm-relation>
  </div>
</template>

<script type="text/javascript">
import { getArticle } from '@/api/article/article'
import { saveBanner } from '@/api/banner/banner'
import { createdRules } from '@/unit/createRule'
export default {
  name: 'AddBanner',
  data() {
    const form = {
      url: '', // 图片
      articleId: '', // 文章
      title: '' // 标题
    }
    return {
      formData: {

      },
      requestConfig: getArticle,
      tableConfig: [
        {
          label: '文章id',
          key: '_id'
        },
        {
          label: '文章标题',
          key: 'articleName'
        }
      ],
      form,
      rules: {
        ...createdRules(form)
      },
      urlList: [], // 图片
      tableData: [] // 列表数据
    }
  },
  components: {

  },
  methods: {
    // 保存
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          saveBanner(this.form).then(res => {
            if (res.code === 0) {
              this.$message.success('保存成功')
              this.$router.push({ name: 'BannerList' })
            }
          })
        }
      })
    },
    // 关联
    relation() {
      this.$refs.vmRelation.dialog = true
    },
    // 关联数据
    getTableData(datas) {
      this.tableData = datas
      this.form.articleId = this.tableData[0]._id
    },
    // 删除数据
    del(i) {
      this.tableData.splice(i, 1)
      this.form.articleId = ''
    },
    // 图片上传
    onComplete(result) {
      console.log(result)
      this.form.url = result
    },
    // 图片删除
    handleRemove() {
      this.form.url = ''
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
</style>
