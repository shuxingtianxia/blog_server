import Vue from 'vue'
import VueRouter from 'vue-router'

/* Layout */
import Layout from '../views/layout/Layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Layout,
    redirect: 'home',
    meta: { icon: 'home', title: '概况' },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: { title: '概况', icon: 'home' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login'),
    meta: { title: '登录', icon: 'home', hidden: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/login/Register'),
    meta: { title: '登录', icon: 'home', hidden: true }
  },
  {
    path: '/user',
    component: Layout,
    meta: { icon: 'home', title: '用户管理' },
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/views/user/UserList'),
        meta: { title: '用户列表', icon: 'home' }
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    meta: { icon: 'home', title: '分类管理' },
    children: [
      {
        path: 'list',
        name: 'CategoryList',
        component: () => import('@/views/category/CategoryList.vue'),
        meta: { title: '分类列表', icon: 'home' }
      }
    ]
  },
  {
    path: '/banner',
    component: Layout,
    meta: { title: 'banner管理', icon: 'home' },
    children: [
      {
        path: 'list',
        name: 'BannerList',
        component: () => import('@/views/banner/BannerList.vue'),
        meta: { title: 'banner列表', icon: 'home' }
      },
      {
        path: 'add',
        name: 'AddBanner',
        component: () => import('@/views/banner/AddBanner.vue'),
        meta: { title: '添加banner', icon: 'home' }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    meta: { icon: 'home', title: '文章管理' },
    children: [
      {
        path: 'list',
        name: 'ArticleList',
        component: () => import('@/views/article/ArticleList.vue'),
        meta: { title: '文章列表', icon: 'home' }
      },
      {
        path: 'add/:type/:id',
        name: 'AddArticle',
        component: () => import('@/views/article/AddArticle.vue'),
        meta: { title: '添加文章', icon: 'home' }
      }
    ]
  },
  {
    path: '/personal',
    component: Layout,
    meta: { icon: 'home', title: '个人管理' },
    children: [
      {
        path: 'list',
        name: 'About',
        component: () => import('@/views/personal/About'),
        meta: { title: '个人简介', icon: 'home' }
      },
      {
        path: 'add/:type/:id',
        name: 'AddPersonal',
        component: () => import('@/views/personal/AddPersonal'),
        meta: { title: '添加个人简介', icon: 'home' }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
