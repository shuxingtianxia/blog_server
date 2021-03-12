import Axios from 'axios'
import store from '../store'
import Router from '../router'
import { Message } from 'element-ui'

const { NODE_ENV } = process.env

class httpRequest {
  constructor() {
    this.options = {
      method: '',
      url: ''
    }
    // 存储请求队列
    this.queue = {}
  }
  // 销毁请求实例
  // eslint-disable-next-line
  destroy(url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }

  // 请求拦截
  interceptors(instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      if (store.getters.token) {
        config.headers.Authorization = store.getters.token // 携带token
      }
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 添加响应拦截器
    instance.interceptors.response.use(res => {
      const { data, status } = res
      if (status === 200) {
        if (data.code === 0) {
          return Promise.resolve(data)
        } else {
          return Message.error(data.msg)
        }
      } if (status === 401) {
        Message.error('token已过期，请重新登录')
        localStorage.removeItem('token')
        return Router.replace({ name: 'Login' })
      } else {
        return Promise.reject(data)
      }
    }, error => {
      return Promise.reject(error)
    })
  }

  // 创建实例
  create() {
    const conf = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-URL-PATH': location.pathname
      },
      validateStatus: (status) => {
        return status >= 200
      }
    }
    return Axios.create(conf)
  }

  // 请求实例
  request(options) {
    var instance = this.create()
    if (NODE_ENV === 'development') {
      options.url = '/api/server' + options.url
    } else {
      options.url = '/api/server' + options.url
    }
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
}

export default httpRequest
