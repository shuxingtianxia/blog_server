<template>
  <div class="add-personal">
    <el-card>
      <el-form label-width="120px" ref="form" :model="form" :rules="rules">
        <el-form-item label="个人图片：" prop="avatar">
          <vm-upload :fileLists="fileLists" @onComplete="onComplete" @handleRemove="handleRemove"></vm-upload>
        </el-form-item>
        <el-form-item label="个人简介：" prop="intro">
          <el-input type="textarea" v-model="form.intro" style="width: 900px" rows="3"></el-input>
        </el-form-item>
        <el-form-item label="简介内容：" prop="content">
          <vm-ue ref="ue" :content.sync="form.content" :config="ueconfig" :max="1000"></vm-ue>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addAbout">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script type="text/javascript">
import * as about from '@/api/about/about'
import { createdRules } from '@/unit/createRule'
export default {
  data() {
    const form = {
      intro: '',
      content: '',
      avatar: ''
    }
    return {
      form,
      rules: {
        ...createdRules(form)
      },
      fileLists: [],
      ueconfig: {
        initialFrameWidth: 900,
        initialFrameHeight: 300
      }
    }
  },
  created() {
    const { id, type } = this.$route.params
    this.id = id
    this.type = type
    if (type === 'edit') this.aboutDetail()
    this.initUe()
  },
  methods: {
    // 关于我详情
    aboutDetail() {
      about.aboutDetail({id: this.id}).then(res => {
        if (res.code === 0) {
          this.form = res.data
          this.fileLists.push({url: res.data.avatar})
          this.initUe()
        }
      })
    },
    // 添加关于我
    addAbout() {
      const method = this.type === 'add' ? 'addAbout' : 'editAbout'
      about[method](this.form).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          this.$router.push({name: 'About'})
        }
      })
    },
    // 删除图片
    handleRemove() {
      this.form.avatar = ''
    },
    // 上传图片
    onComplete(url) {
      this.form.avatar = url
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
</style>
