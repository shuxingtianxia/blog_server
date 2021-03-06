import axios from '@/unit/api.request'

// banner列表
export const getBanner = () => {
  return axios.request({
    url: `/banner`,
    method: 'get'
  })
}
