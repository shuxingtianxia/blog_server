import router from './router'
// import store from './store'
// import { Message } from 'element-ui'

const whiteList = ['/login', '/register']// 不重定向白名单
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (token) { // 判断是否有token
    next()
    // if (to.path === '/login') {
    //   next({ path: '/' })
    // } else {
    //   if (store.getters.roleType === -1) { // 判断当前用户是否已拉取完user_info信息
    //     store.dispatch('GetUserInfo').then(res => { // 拉取user_info
    //       next({ ...to, replace: true })
    //     }).catch(() => {
    //       store.dispatch('FedLogOut').then(() => {
    //         Message.error('验证失败,请重新登录')
    //         next({ path: '/login' })
    //       })
    //     })
    //   } else {
    //     next()
    //   }
    // }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
    }
  }
})

router.afterEach(() => {
})
