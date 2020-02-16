import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'

//进度条
import NProgress from 'nprogress'
NProgress.configure({
  showSpinner: false
})
import 'nprogress/nprogress.css'

import { getToken, removeToken } from '@/libs/auth'
Vue.use(Router)

const router = new Router({
  routes: routes,
  mode: 'hash'
})

router.beforeEach((to, from, next) => {
  const LOGIN_PAGE_NAME = 'login'
  const hasToken = getToken()

  //动态设置标题
  NProgress.start()
  if (to.meta.title) {
    document.title = to.meta.title
  }
  //权限控制
  if (!hasToken) {
    // 未登录
    removeToken()
    next({
      name: LOGIN_PAGE_NAME
    })
  } else if (hasToken && to.name === LOGIN_PAGE_NAME) {
    next({ name: '' })
  } else {
    // 已登陆
    next()
  }
})

//路由跳转后操作
router.afterEach(() => {
  NProgress.done()
  window.scrollTo(0, 0)
})

export default router
