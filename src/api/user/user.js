import { request } from '@/unit/api.request'

// XXXX
export const getQiniuToken = () => {
  return request({
    url: `/qiniu/getToken`,
    method: 'get'
  })
}
