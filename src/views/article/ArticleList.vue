<template>
  <div class="article-list">
    <vm-ue ref="ue" :content.sync="form.purchaseNotes" :config="ueconfig" :max="1000"></vm-ue>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      form: {
        purchaseNotes: ''
      },
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
