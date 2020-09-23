import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ELEMENT from 'element-ui'

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
