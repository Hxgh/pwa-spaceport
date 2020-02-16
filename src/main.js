import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

//element UI
import ElementUI from 'element-ui'
Vue.use(ElementUI)

import 'normalize.css'
import '@/assets/font/iconfont.css'

//阻止生产模式警告
Vue.config.productionTip = false

//事件中心
import Bus from '@/libs/bus.js'
Vue.use(Bus)

//mock
import { mockXHR } from '../mock'
mockXHR()

window.app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
