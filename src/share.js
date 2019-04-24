import '../src/config/api'
import wx from 'weixin-jsapi'

exports.install = function (Vue, options) {
  Vue.prototype.$shareList = function (imgUrl, link, desc, title) {
    // 分享
    let vm = this
    console.log(this)
    let url = encodeURIComponent(location.href.split('#')[0])
    // let url = location.href
    let data = {url: url}
    vm.$http.post(`/official/js/config`, data).then(({data}) => {
      wxInit(data, imgUrl, link, desc, title)
      // vm.$wechat.config({
      //   debug: false, // true:调试时候弹窗
      //   appId: data.appId, // 微信appid
      //   timestamp: data.timestamp, // 时间戳
      //   nonceStr: data.nonceStr, // 随机字符串
      //   signature: data.signature, // 签名
      //   jsApiList: [
      //     // 所有要调用的 API 都要加到这个列表中
      //     'onMenuShareTimeline', // 分享到朋友圈接口
      //     'onMenuShareAppMessage', //  分享到朋友接口
      //     'onMenuShareQQ', // 分享到QQ接口
      //     'onMenuShareWeibo' // 分享到微博接口
      //   ]
      // })
      // vm.$wechat.checkJsApi({
      //   jsApiList: [
      //     // 所有要调用的 API 都要加到这个列表中
      //     'onMenuShareTimeline', // 分享到朋友圈接口
      //     'onMenuShareAppMessage', //  分享到朋友接口
      //     'onMenuShareQQ', // 分享到QQ接口
      //     'onMenuShareWeibo' // 分享到微博接口
      //   ],
      //   success: function (res) {
      //   }
      // })
      //
      // vm.$wechat.ready(function () {
      //   // 微信分享的数据
      //   var shareData = {
      //     imgUrl: imgUrl, // 分享显示的缩略图地址
      //     link: link, // 分享地址
      //     desc: desc, // 分享描述
      //     title: title, // 分享标题
      //     success: function () {
      //       // 分享成功可以做相应的数据处理
      //       alert('分享成功')
      //       alert('appId:' + res.appId)
      //       alert('timestamp:' + res.timestamp)
      //       alert('nonceStr:' + res.nonceStr)
      //       alert('signature:' + res.signature)
      //     },
      //     fail: function () {
      //       alert('调用失败')
      //     },
      //     complete: function () {
      //       alert('调用结束')
      //     }
      //   }
      //   wx.updateTimelineShareData(shareData)
      //   wx.updateAppMessageShareData(shareData)
      //   wx.onMenuShareQQ(shareData)
      //   wx.onMenuShareWeibo(shareData)
      // })
      // vm.$wechat.error(function (res) {
      //   // config信息验证失败会执行error函数，如签名过期导致验证失败，
      //   // 具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，
      //   // 对于SPA可以在这里更新签名。
      //   // alert('分享失败')
      // })
    }).catch((error) => {
      console.log(error)
    })
  }
}

function wxInit (res, imgUrl, link, desc, title) {
  let url = window.location.href.split('?')[0] // 获取锚点之前的链接
  console.log(url)
  let links = link
  wx.config({
    debug: false,
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
      link: links, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
        console.log('分享成功')
      },
      cancel: function () {
        console.log('分享失败')
      }
    })
    // 微信分享菜单测试
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: links, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
        console.log('分享成功')
      },
      cancel: function () {
        console.log('分享失败')
      }
    })
  })
  wx.error(function (err) {
    alert(JSON.stringify(err))
  })
}
