import { login, logout } from '@/api/account'
import { getToken, setToken, removeToken } from '@/libs/auth'

const state = {
  user: getToken()
}

const mutations = {
  SET_TOKEN: (state, payload) => {
    state.user = payload
    setToken(payload)
  },
  REMOVE_TOKEN: () => {
    removeToken()
  }
}

const actions = {
  // 用户登录
  login({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      login(payload)
        .then(response => {
          if (response.code != 200) {
            reject(response)
          }
          const { data } = response
          commit('SET_TOKEN', data)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 退出登录
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(response => {
          if (response.code != 200) {
            reject(response)
          }
          const { data } = response
          console.log(data)
          commit('REMOVE_TOKEN')
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
