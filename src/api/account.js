import axios from '@/libs/axios.request'

export const login = () => {
  return axios.request({
    url: '/api/login',
    method: 'post'
  })
}

export const logout = () => {
  return axios.request({
    url: '/api/logout',
    method: 'post'
  })
}
