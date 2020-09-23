import axios from '@/libs/api.request'

// XXXX
export const getList = (reqBody) => {
  return axios.request({
    url: ``,
    data: {
      args: JSON.stringify(reqBody),
    },
    method: 'post'
  })
}