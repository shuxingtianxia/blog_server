<template>
  <div class="article-list">
    <el-card>
      <el-form label-width="120px" :rules="rules" ref="form" :model="form">
        <el-form-item label="文章标题：" prop="articleName">
          <el-input placeholder="请输入文章标题" v-model="form.articleName" style="width: 900px;"></el-input>
        </el-form-item>
        <el-form-item label="文章分类：" prop="articleCategory">
          <el-select v-model="form.articleCategory"  placeholder="请选择文章分类">
              <el-option :label="item.title" :value="item._id" v-for="item in options" :key="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键字：">
          <el-tag
            :key="tag"
            v-for="tag in form.dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>
        <el-form-item label="文章主图：" prop="articleImgUrl">
          <vm-upload :fileLists="fileLists" @onComplete="onComplete" @handleRemove="handleRemove"></vm-upload>
        </el-form-item>
        <el-form-item label="文章简介：" prop="articleIntro">
          <el-input type="textarea" v-model="form.articleIntro" style="width: 900px;"></el-input>
        </el-form-item>
        <el-form-item label="文章内容：" prop="articleContent">
          <vm-ue ref="ue" :content.sync="form.articleContent" :config="ueconfig" :max="1000"></vm-ue>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveArticle">确认提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script type="text/javascript">
import { createdRules } from '@/unit/createRule'
import * as article from '@/api/article/article'
import * as category from '@/api/category/category'
export default {
  data() {
    const form = {
      articleName: '',
      articleCategory: '',
      dynamicTags: [],
      articleImgUrl: '',
      articleIntro: '',
      articleContent: ''
    }
    return {
      form,
      rules: {
        ...createdRules(form)
      },
      inputVisible: false,
      inputValue: '',
      ueconfig: {
        initialFrameWidth: 900,
        initialFrameHeight: 300
      },
      fileLists: [],
      options: [] // 分类
    }
  },
  created() {
    const { id, type } = this.$route.params
    this.id = id
    this.type = type
    if (type === 'edit') this.articleDetail()
    this.initUe()
    this.getCategory()
  },
  methods: {
    // 获取分类
    getCategory() {
      category.getCategory().then(res => {
        if (res.code === 0) {
          this.options = res.data
        }
      })
    },
    // 获取文章详情
    articleDetail() {
      article.articleDetail({ id: this.id }).then(res => {
        if (res.code === 0) {
          this.form = res.data
          this.initUe()
          this.fileLists.push({ url: res.data.articleImgUrl })
        }
      })
    },
    // 保存文章
    saveArticle() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const method = this.type === 'add' ? 'addArticle' : 'updateArticle'
          article[method](this.form).then(res => {
            if (res.code === 0) {
              this.$message.success('添加成功')
              this.$router.push({ name: 'ArticleList' })
            }
          })
        }
      })
    },
    // 可编辑标签
    handleClose(tag) {
      this.form.dynamicTags.splice(this.form.tag.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.form.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // 初始化UE
    initUe() {
      this.$nextTick(_ => {
        this.$refs.ue.init()
      })
    },
    // 删除图片
    handleRemove() {
      this.form.articleImgUrl = ''
    },
    onComplete(url) {
      this.form.articleImgUrl = url
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tag--light{
  margin-right: 10px;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
