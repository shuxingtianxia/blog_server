import axios from '@/unit/api.request'

// 获取七牛云token
export const getQiniuToken = () => {
  return axios.request({
    url: `/getToken`,
    method: 'get'
  })
}

// 登录
export const login = (data) => {
  return axios.request({
    url: `/login`,
    method: 'post',
    data
  })
}

// 登录
export const logout = () => {
  return axios.request({
    url: `/logout`,
    method: 'get'
  })
}

// 登录
export const register = (data) => {
  return axios.request({
    url: `/register`,
    method: 'post',
    data
  })
}
