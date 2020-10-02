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
        path: 'add',
        name: 'AddArticle',
        component: () => import('@/views/About.vue'),
        meta: { title: '添加文章', icon: 'home' }
      }
    ]
  },
  {
    path: '/tag',
    component: Layout,
    meta: { icon: 'home', title: '标签管理' },
    children: [
      {
        path: 'list',
        name: 'TagList',
        component: () => import('../views/About.vue'),
        meta: { title: '标签列表', icon: 'home' }
      }
    ]
  },
  {
    path: '/classify',
    component: Layout,
    meta: { icon: 'home', title: '分类管理' },
    children: [
      {
        path: 'add',
        name: 'AddClassify',
        component: () => import('../views/About.vue'),
        meta: { title: '添加分类', icon: 'home' }
      },
      {
        path: 'list',
        name: 'ClassifyList',
        component: () => import('../views/About.vue'),
        meta: { title: '分类列表', icon: 'home' }
      }
    ]
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
