import Axios from 'axios'

class httpRequest{
  constructor() {
    this.options = {
      method: '',
      url
    }
    // 存储请求队列
    this.queue = {}
  }
  // 销毁请求实例
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
        config.headers['Authorization'] = getToken() // 携带token
      }
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 添加响应拦截器
    instance.interceptors.response.use(res => {
      let {data} = res
      console.log(data)
      const is = this.destroy(url)
      console.log(url)
      if(res.code !== 200) {
        localStorage.clear()
        store.dispatch('FedLogOut').then(() => {
          // router.replace('/')
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
        return Promise.reject(res)
      }
      return Promise.resolve(res)
    }, error => {
      return Promise.reject(error)
    })
  }
  // 创建实例
  create() {
    let conf = {
      baseURL: 'localhost',
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
  request (options) {
    var instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
}