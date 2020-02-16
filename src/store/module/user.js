import { login, logout } from '@/api/account'
import { getToken, setToken } from '@/libs/auth'

const state = {
  token: getToken()
}

const mutations = {
  SET_TOKEN: (state, payload) => {
    state.token = payload
    setToken(payload)
  }
}

const actions = {
  // 用户登录
  login({ commit }) {
    return new Promise((resolve, reject) => {
      login()
        .then(response => {
          if (response.code != 200) {
            reject(response)
          }
          const { data } = response
          commit('SET_TOKEN', data)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 退出登录
  logout({ state, commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      resolve()
      logout(state.token)
        .then(() => {
          commit('setToken', '')
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
