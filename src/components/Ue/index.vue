<template>
  <div class="UEtor">
    <script :id="id" type="text/plain"></script>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    defaultMsg: {
      type: String
    },
    // 配置
    config: {
      type: Object,
      default: function() {
        return {
          initialFrameWidth: 600,
          initialFrameHeight: 200
        }
      }
    },
    max: {
      type: Number,
      default: 10000
    }
  },
  data() {
    return {
      editor: null,
      id: 'UE_ID' + Math.round(Math.random() * 100000)
    }
  },
  mounted() {
    const _this = this
    // eslint-disable-next-line
    _this.editor = UE.getEditor(this.id, _this.config) // 初始化
  },
  methods: {
    // 初始化
    init() {
      this.$nextTick(_ => {
        const _this = this
        // 初始化UE
        // _this.editor = UE.getEditor('editor', _this.config)
        // 初始化内容
        this.editor.ready(function() {
          // const content = _this.content.replace(/(.|\n)*<body data-target="flag">/, '')
          this.setContent(_this.content)
        })
        // 内容改变时，触发更新事件，改变数据
        this.editor.addListener('contentChange', function() {
          const contents = `${this.getContent()}`
          const count = this.getContentLength(true)
          if (count > _this.max) {
            const content = this.getContentTxt()
            this.setContent(content.substring(0, _this.max))
            this.focus(true)
            _this.$message.error('已超出最大字数')
          }
          _this.$emit('update:content', contents)
        })
      })
    },
    ueditor() {
    }
  },
  destroyed() {
    this.editor.destroy()
  }
}
</script>

<style lang="scss" scoped>
</style>
