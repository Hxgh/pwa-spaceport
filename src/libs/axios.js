import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/libs/auth'
import { Message } from 'element-ui'

let cancelToken = axios.CancelToken
class HttpRequest {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl
    this.queue = {}
    this.pending = []
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      timeout: 50000, // request timeout
      withCredentials: false, //表示跨域请求时是否需要使用凭证
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
      // withCredentials: true
    }
    return config
  }
  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  removePending(flagUrl, f) {
    if (this.pending.indexOf(flagUrl) !== -1) {
      if (f) {
        f() // 执行取消操作
      } else {
        this.pending.splice(this.pending.indexOf(flagUrl), 1) // 把这条记录从数组中移除
      }
    } else {
      if (f) {
        this.pending.push(flagUrl)
      }
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        // 防止post方式重复提交
        if (config.method !== 'get') {
          config.cancelToken = new cancelToken(c => {
            let flagUrl = this.baseUrl + config.url + '&' + config.method
            this.removePending(flagUrl, c)
          })
        }
        NProgress.start() //顶部加载条开始
        if (!Object.keys(this.queue).length) {
          // Spin.show()
        }
        // 判断url
        this.queue[url] = true
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      response => {
        NProgress.done() //顶部加载条结束
        this.destroy(url)
        if (response.data.success) {
          return response.data
        } else {
          // 这里是返回状态码200时，自定义的错误
          return Promise.reject(response.data)
        }
      },
      error => {
        NProgress.done() //顶部加载条结束
        if (error.response) {
          let status = error.response.status
          switch (true) {
            case status == 401:
              // 提示授权
              Message.error('未授权，请先登录！')
              window.app.$router.push({ name: 'login' })
              break
            case status == 500:
              // 提示授权
              Message.error('500, 网络错误')
              break
            default:
              Message.error(
                error.response.data.msg || error.response.data.message
              )
          }
        } else if (error.request) {
          Message.error('服务器错误')
        }
        this.pending = []
        this.distroy(url)
        return Promise.reject(error)
      }
    )
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
