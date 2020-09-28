import axios from '@/unit/api.request'

// XXXX
export const getQiniuToken = () => {
  return axios.request({
    url: `/api/qiniu/getToken`,
    method: 'get'
  })
}
