// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import App from './App'
import store from '../src/vuex/store'
import router from '../src/router/index.js'
import {LoadingPlugin, WechatPlugin, DatetimePlugin, ConfirmPlugin, XImg} from 'vux'
import '../src/config/api'
import md5 from 'js-md5'

Vue.prototype.$md5 = md5
FastClick.attach(document.body)
require('es6-promise').polyfill()

Vue.use(DatetimePlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)
Vue.use(WechatPlugin)
Vue.use(Vuex)
Vue.component('x-img', XImg)

store.registerModule('vux', { // 名字自己定义
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})
// Vue.wechat.config({
//   /* debug: true,  */
//   appId: appid,
//   timestamp: timestamp,
//   nonceStr: nonceStr,
//   signature: signature,
//   jsApiList: [
//     'chooseImage',//拍照或从手机相册中选图接口
//     'previewImage',//预览图片接口
//     'uploadImage',//上传图片接口
//     'downloadImage'//下载图片接口
//   ]
// })

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
  if (store.state.route.query.paas) {
    store.commit('setPaas', store.state.route.query.paas)
    localStorage.setItem('paas', store.state.route.query.paas)
  }
})
Vue.prototype.$method = (url) => {
  if (!url) {
    $toastWarn('暂无详情链接')
    return
  }
  window.location.href = url
}

FastClick.attach(document.body)
Vue.config.productionTip = false
console.log(Vue.wechat)
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
