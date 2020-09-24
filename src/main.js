import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ELEMENT from 'element-ui'

// 引入富文本编辑器的文件
import '../public/static/ue/ueditor.config'
import '../public/static/ue/ueditor.all'
import '../public/static/ue/lang/zh-cn/zh-cn'
import '../public/static/ue/ueditor.parse.min'

import vmUe from '@/components/Ue'
Vue.component('vm-ue', vmUe)

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
