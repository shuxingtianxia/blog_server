import axios from '@/unit/api.request'

// 用户列表
export const getUsers = () => {
  return axios.request({
    url: `/admin_users`,
    method: 'get'
  })
}

// 删除用户列表
export const delUsers = (params) => {
  return axios.request({
    url: `/admin_users_del`,
    method: 'get',
    params
  })
}
