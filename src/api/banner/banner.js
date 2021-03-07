import axios from '@/unit/api.request'

// banner列表
export const getBanner = (params) => {
  return axios.request({
    url: `/banner`,
    method: 'get',
    params
  })
}

// 保存banner
export const saveBanner = (data) => {
  return axios.request({
    url: `/banner_add`,
    method: 'post',
    data
  })
}
