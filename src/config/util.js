import {ToastPlugin, LoadingPlugin} from 'vux'
import Vue from 'vue'

Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

export const $toastSuccess = (title) => {
  Vue.$vux.toast.show({
    text: title,
    type: 'success'
  })
}
export const $toastWarn = (title) => {
  Vue.$vux.toast.show({
    text: title,
    type: 'warn'
  })
}
export const $toastCancel = (title) => {
  Vue.$vux.toast.show({
    text: title,
    type: 'cancel'
  })
}
export const $toastText = (title) => {
  Vue.$vux.toast.show({
    text: title,
    type: 'text'
  })
}
// loading
export const $loadingShow = (title) => {
  Vue.$vux.loading.show({
    text: title
  })
}
export const $loadingHide = (title) => {
  Vue.$vux.loading.hide()
}
