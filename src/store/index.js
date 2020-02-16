import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//用户模块
import user from './module/user'
//业务模块
import app from './module/app'

const modules = {
  user,
  app
}

//合并store
const state = {}
import getters from './getters.js'
const mutations = {}
const actions = {}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules
})
export default store
