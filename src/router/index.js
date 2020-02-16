import Vue from 'vue'
import store from '@/store'
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
  if (!hasToken && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页，跳转到登录页
    next({
      name: LOGIN_PAGE_NAME
    })
  } else if (!hasToken && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next()
  } else if (hasToken && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: '/'
    })
  } else {
    if (store.state.user.hasGetPermissions) {
      //此处后续添加, 页面的访问权限限制
      next()
    } else {
      store
        .dispatch('getUserPermissions')
        .then(() => {
          next()
        })
        .catch(() => {
          removeToken() //请求失败后, 清除token重新登录
          next({
            name: 'login'
          })
        })
    }
  }
})

//路由跳转后操作
router.afterEach(() => {
  NProgress.done()
  window.scrollTo(0, 0)
})

export default router
