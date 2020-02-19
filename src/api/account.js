import axios from '@/libs/axios.request'

export const login = data => {
  return axios.request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export const logout = () => {
  return axios.request({
    url: '/api/logout',
    method: 'get'
  })
}
