<template>
  <div class="article-list">
    <el-card>
      <el-form label-width="120px">
        <el-form-item label="文章标题：">
          <el-input placeholder="请输入文章标题" style="width: 900px;"></el-input>
        </el-form-item>
        <el-form-item label="文章分类：">
          <el-select v-model="form.articleCategory"  placeholder="请选择文章分类">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键字：">
          <el-tag
            :key="tag"
            v-for="tag in form.tag"
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
        <el-form-item label="文章主图：">
          <vm-upload></vm-upload>
        </el-form-item>
        <el-form-item label="文章简介：">
          <el-input type="textarea" v-model="form.articleIntro" style="width: 900px;"></el-input>
        </el-form-item>
        <el-form-item label="文章内容：">
          <vm-ue ref="ue" :content.sync="form.articleContent" :config="ueconfig" :max="1000"></vm-ue>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">确认提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      form: {
        articleCategory: '',
        tag: [],
        articleIntro: '',
        articleContent: ''
      },
      inputVisible: false,
      inputValue: '',
      ueconfig: {
        initialFrameWidth: 900,
        initialFrameHeight: 300
      }
    }
  },
  components: {

  },
  created() {
    this.initUe()
  },
  methods: {
    // 可编辑标签
    handleClose(tag) {
      this.form.tag.splice(this.form.tag.indexOf(tag), 1)
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
        this.form.tag.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // 初始化UE
    initUe() {
      this.$nextTick(_ => {
        this.$refs.ue.init()
      })
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
