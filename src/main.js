import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ELEMENT from 'element-ui'
// 封装组件
import vmUe from '@/components/Ue'
import vmUpload from '@/components/Upload'
import assTable from '@/components/AssTable'
import vmRelation from '@/components/Relation'

// 引入富文本编辑器的文件
import '../public/static/ue/ueditor.config'
import '../public/static/ue/ueditor.all'
import '../public/static/ue/lang/zh-cn/zh-cn'
import '../public/static/ue/ueditor.parse.min'

import '@/permission' // 权限

// 富文本编辑器
Vue.component('vm-ue', vmUe)
// 七牛云
Vue.component('vm-upload', vmUpload)
// 列表
Vue.component('ass-table', assTable)
// 弹框列表
Vue.component('vm-relation', vmRelation)

if (process.env.NODE_ENV === 'development') {
  require('element-ui/lib/theme-chalk/index.css')
}

Vue.use(ELEMENT)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
