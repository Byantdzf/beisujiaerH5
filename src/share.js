import '../src/config/api'
import wx from 'weixin-jsapi'

exports.install = function (Vue, options) {
  Vue.prototype.$shareList = function (imgUrl, link, desc, title) {
    // 分享
    let vm = this
    console.log(this)
    // let url = encodeURIComponent(location.href.split('#')[0])
    let url = location.href.toString()
    let data = {url: url}
    vm.$http.post(`/official/js/config`, data).then(({data}) => {
      wxInit(data, imgUrl, link, desc, title)
    }).catch((error) => {
      console.log(error)
    })
  }
}

function wxInit (res, imgUrl, link, desc, title) {
  var _this = this
  // let url = location.href.toString() // 获取锚点之前的链接
  wx.config({
    debug: true,
    appId: res.appId,
    timestamp: res.timestamp,
    nonceStr: res.nonceStr,
    signature: res.signature,
    jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
  })
  wx.ready(function () {
    wx.onMenuShareAppMessage({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
        alert('分享成功')
        _this.showFx = false
      },
      cancel: function () {
        alert('分享失败')
        _this.showFx = false
      }
    })
    // 微信分享菜单测试
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
        alert('分享成功')
        _this.isShow = true
      },
      cancel: function () {
        alert('分享失败')
        _this.isShow = true
      }
    })
  })
  wx.error(function (err) {
    alert(JSON.stringify(err))
  })
}
