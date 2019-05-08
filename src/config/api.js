import Vue from 'vue'
import {AjaxPlugin} from 'vux'
// import qs from 'qs'
import {$toastWarn, $loadingHide} from '../../src/config/util'

const api = () => {
  const baseURL = process.env.NODE_ENV === 'development' ? 'http://love.hankin.ufutx.cn/api' : 'https://love.ufutx.com/api/'
  // const baseURL = 'http://love.hankin.ufutx.cn/api'
  AjaxPlugin.$http.defaults.baseURL = baseURL
//   AjaxPlugin.$http.defaults.headers = {'X-Custom-Header': 'foobar'}
  AjaxPlugin.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  AjaxPlugin.$http.defaults.timeout = 8000
  // AjaxPlugin.$http.defaults.withCredent
  // ials = false
  // AjaxPlugin.$http.defaults.responseType = 'json'
  // AjaxPlugin.$http.defauduilts.maxContentLength = 2000
  // AjaxPlugin.$http.defaults.dataType = 'jsonp'
  // AjaxPlugin.$http.defaults.withCredentials = false
  // AjaxPlugin.$http.defaults.data.push({
  //   XDEBUG_SESSION_START: 1,
  //   paas: localStorage.getItem('paas')
  // })
// POST传参序列化(添加请求拦截器)
// http request 拦截器
  AjaxPlugin.$http.interceptors.request.use((config) => {
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
    if (config.url.includes('?')) {
      config.url = config.url + '&XDEBUG_SESSION_START=1&paas=' + localStorage.getItem('paasName')
    } else {
      config.url = config.url + '?XDEBUG_SESSION_START=1&paas=' + localStorage.getItem('paasName')
    }
    // console.log(config)
    // if (config.method === 'post') {
    //   config.data = qs.stringify(config.data)
    // }
    // $loadingShow()
    return config
  }, (error) => {
    return error
  })
  AjaxPlugin.$http.interceptors.response.use(response => {
    // $loadingHide()
    if (response.status === 200 && response.data.code === 2) { // token过期
      localStorage.removeItem('ACCESS_TOKEN')
      $toastWarn(response.data.message)
      window.location.href = window.location.href.split('#/')[0] + '#/register'
    } else if (response.status === 200 && response.data.code === 1) {
      $loadingHide()
      return $toastWarn(response.data.message)
    }
    return response.data
  }, error => {
    console.log(error)
    $loadingHide()
  })
  Vue.use(AjaxPlugin)
  require('es6-promise').polyfill()
}
export default api()
