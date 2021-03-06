<template>
  <div class="add-banner">
    <el-card>
      <el-form label-width="120px">
        <el-form-item label="标题名称：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="广告图片：">
          <vm-upload></vm-upload>
        </el-form-item>
        <el-form-item label="关联文章：">
          <el-button type="primary">关联文章</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "AddBanner",
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
