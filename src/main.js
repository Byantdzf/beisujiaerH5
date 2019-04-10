// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import App from './App'
import store from '../src/vuex/store'
import router from '../src/router/index.js'
import {LoadingPlugin, WechatPlugin, DatetimePlugin} from 'vux'
import '../src/config/api'
// require('es6-promise').polyfill()

Vue.use(DatetimePlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(Vuex)

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

FastClick.attach(document.body)
Vue.config.productionTip = false
console.log(Vue.wechat)
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
