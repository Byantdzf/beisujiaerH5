import '../src/config/api'
import wx from 'weixin-jsapi'

exports.install = function (Vue, options) {
  Vue.prototype.$shareList = function (imgUrl, link, desc, title) {
    // 分享
    let vm = this
    console.log(this)
    // let url = encodeURIComponent(location.href.split('#')[0])
    let url = location.href.split('#').toString()
    let data = {url: url}
    vm.$http.post(`/official/js/config`, data).then(({data}) => {
      wxInit(data)
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
function wxInit (res) {
  var _this = this
  let url = window.location.href.split('?')[0] // 获取锚点之前的链接
  console.log(url)
  // let links = url+'#/Food/' + this.$route.params.id;
  let links = url + '#/product/productDetails?pid='
  console.log(links)
  let title = '晓峰科技'
  let desc = '了解更多，请关注“晓峰科技”公众号'
  let imgUrl = 'http://wx.qlogo.cn/mmhead/Q3auHgzwzM4soO2NoID1uZPHibOVgkJoPoaelibibF3GagvW2o43wRASA/0'
  wx.config({
    debug: false,
    appId: res.appId,
    timestamp: res.timestamp,
    nonceStr: res.nonceStr,
    signature: res.signature,
    jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
  })
  wx.ready(function () {
    // ------------------------
    // wx.onMenuShareAppMessage({
    //   title: title, // 分享标题
    //   desc: desc, // 分享描述
    //   link: links, // 分享链接
    //   imgUrl: imgUrl, // 分享图标
    //   success: function () {
    //     alert('分享成功')
    //     _this.showFx = false
    //   },
    //   cancel: function () {
    //     alert('分享失败')
    //     _this.showFx = false
    //   }
    // })
    // 微信分享菜单测试
    // wx.onMenuShareTimeline({
    //   title: title, // 分享标题
    //   desc: desc, // 分享描述
    //   link: links, // 分享链接
    //   imgUrl: imgUrl, // 分享图标
    //   success: function () {
    //     alert('分享成功')
    //     _this.isShow = true
    //   },
    //   cancel: function () {
    //     alert('分享失败')
    //     _this.isShow = true
    //   }
    // })=================

    var link = window.location.href
    var protocol = window.location.protocol
    var host = window.location.host
    // 分享朋友圈
    console.log('分享朋友圈')
    wx.onMenuShareTimeline({
      title: '这是一个自定义的标题！',
      link: link,
      imgUrl: imgUrl, // 自定义图标
      trigger: function (res) {
        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回.
        // alert('click shared');
      },
      success: function (res) {
        // alert('shared success');
        // some thing you should do
      },
      cancel: function (res) {
        // alert('shared cancle');
      },
      fail: function (res) {
        // alert(JSON.stringify(res));
      }
    })
    // 分享给好友
    wx.onMenuShareAppMessage({
      title: '这是一个自定义的标题！', // 分享标题
      desc: '这是一个自定义的描述！', // 分享描述
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 自定义图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    })
  })
  wx.error(function (err) {
    alert(JSON.stringify(err))
  })
}
