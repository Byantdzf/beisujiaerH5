<template>
  <div class="activiyDetails">
    <img class="head_picture" :src="information.poster" alt="">
    <!--<img src="http://images.ufutx.com/201904/12/002f37bc7664ed2ad996b97188f33a87.gif" v-if="members.length>0" alt="" class="bc_icon">-->
    <div class="menberList ellipsis_1" v-if="members.length>0">
      <marquee>
        <marquee-item v-for="(item,index) in members" :key="index" @click.native="onClick(index)" class="align-middle">
          {{item.name}} 报名了
        </marquee-item>
      </marquee>
    </div>
    <div class="clear_both"></div>
    <div class="SummitDetails">
      <div class="choiceness">
        <img class="icon_choiceness" src="http://images.ufutx.com/201904/02/1eb183cb14838e94cefd13408a3d8427.png" alt="">
        {{information.theme}}
      </div>
    </div>
    <div class="SummitDetailV">
      <div class="time">
        <img class="icon flo_l" style="margin-top: 1vw;" src="http://images.ufutx.com/201904/02/16ace8949356fd1796e9b56e5ad454bd.png" alt="">
        <p style="width: 82vw" class="">{{information.created_at}} 至 {{information.end_time}}</p>
      </div>
      <div class="site">
        <img class="icon flo_l" src="http://images.ufutx.com/201904/02/4240186a184e36f6cad310b21a7f05b1.png" alt="">
        <p style="width: 82vw" class="font30">{{information.province + information.city + information.dist + information.address}}</p>
      </div>
      <div class="my">
        <img class="icon flo_l" style="margin-top: 0.8vw;" src="http://images.ufutx.com/201904/02/eb837cb440c4e38ce6ca7543b6151a7d.png" alt="">
        已申请{{information.members?information.members.length:''}}人
      </div>
      <div class="money">
        <img class="icon flo_l" style="margin-top: 0.4vw;" src="http://images.ufutx.com/201904/02/2de2dbbe58be10d992feb18e2a5418e4.png" alt="">
        {{information.fee}}
        <img class="icon_arrows_site" src="../../assets/icon/go.png" alt="">
      </div>
      <div style="clear: both"></div>
    </div>
    <div v-for="item in information.detail">
      <img class="plenaryLecture" :src="item" alt="">
    </div>
    <div class="For_more_details" @click="goDetail">
      查看更多详情
      <img class="icon_arrows_bottom" src="http://images.ufutx.com/201904/02/0715881d01f9ac79e4a200192df45684.png" alt="">
    </div>
    <div class="height105"></div>
    <div class="box_bottom">
      <div class="home_and_share">
        <div class="home_" @click="goHome">
          <img class="icon_home" src="http://images.ufutx.com/201904/02/c2a2e6539c0aba992088b1b51a54a18b.png" alt="">
          <p class="home">首页</p>
        </div>
        <div class="share_" @click="share">
          <img class="icon_share" src="http://images.ufutx.com/201904/02/7b1981496eb2cd024c3830a018c4c89e.png" alt="">
          <p class="share">分享</p>
        </div>
      </div>
      <div class="applyNow" @click="showModal = !showModal">立即报名</div>
    </div>
    <div v-transfer-dom>
      <popup v-model="showModal">
        <div class="bc_popup ff">
          <p class="list bold">活动报名信息</p>
          <p class="price list">报名费用： <span style="color: #f66924;">{{information.fee}}</span></p>
          <!--<p class="list">联系人：-->
            <!--<input type="text" class="flo_r"  v-model="name"/>-->
          <!--</p>-->
          <!--<p class="list">联系方式：-->
            <!--<input type="number" class="flo_r" v-model="mobile"/>-->
          <!--</p>-->
        </div>
        <div class="applyNow" style="width: 100%" @click="confirmPay">确定支付</div>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="showModal1" :is-transparent="true">
        <div class="bc_share backCover"  @click="share">
          <img src="http://images.ufutx.com/201904/24/43e0d6008b6f9c6282188b52f4113648.png" alt="" width="100%" style="position:fixed;top: 0;z-index: 9999">
          <img src="http://images.ufutx.com/201904/24/50228a05c7311dffe4962b3e99c239ee.png" alt="" width="100%" class="fixed_bot">
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import {$toastWarn} from '../../config/util'
  import { TransferDom, Marquee, MarqueeItem, Popup } from 'vux'

  export default {
    name: 'activiyDetails',
    directives: {
      TransferDom
    },
    components: {
      Popup,
      Marquee,
      MarqueeItem
    },
    data () {
      return {
        id: '',
        name: '',
        mobile: '',
        information: {}, // 数据
        members: {}, // 报名成员
        showModal: false,
        showModal1: false,
        trade_no: ''
      }
    },
    methods: {
      onClick (i) {
        console.log(i)
      },
      goDetail () {
        if (!this.information.detail_path) {
          $toastWarn('暂无详情链接')
          return
        }
        window.location.href = this.information.detail_path
      },
      getOrderList () {
        this.$http.get(`/official/activities/${this.id}`).then(({data}) => {
          this.information = data
          this.members = data.members
          // this.$shareList(data.poster, encodeURIComponent(location.href), data.theme, localStorage.getItem('paas'))
        }).catch((error) => {
          console.log(error)
        })
      },
      goHome () {
        this.$router.push({name: 'home'})
      },
      share () {
        // $toastText('未设置分享')
        this.showModal1 = !this.showModal1
      },
      confirmPay () { // 报名
        this.showModal = !this.showModal
        // if (!this.name) {
        //   return $toastWarn('请填写联系人')
        // }
        // if (!this.mobile) {
        //   return $toastWarn('请填写联系方式')
        // }
        let data = {
          name: this.name,
          mobile: this.mobile
        }
        let vm = this
        this.$http.post(`/official/join/activity/${this.id}`, data).then(({data}) => {
          vm.trade_no = data.trade_no
          console.log(window.location.href)
          if (data.wx_pay.mweb_url) {
            // window.location.href = data.wx_pay.mweb_url + '?redirect_url=' + window.location.href
            window.location.href = data.wx_pay.mweb_url
          }
          // if (data.wx_pay.length === 0) {
          // that.$post({url: `${service.orderpay}/${that.trade_no}/v2`}, {
          //   success: ({code, data}) => {
          //     that.$Toast_success('支付成功')
          //     setTimeout(() => {
          //       that.$gotoTab('/pages/tabBar/user')
          //     }, 1200)
          //   },
          //   fail: ({code, data}) => {
          //   },
          //   complete: () => {
          //   }
          // })
          // } else {
          // let wxconfig = data.wx_pay.config
//            wx.config(JSON.parse(response.data.data.order.wx_pay.js));
//             if (wxconfig.payment_debug) {
          // return that.$post({url: `${service.orderpay}/${that.trade_no}/v2`}, {
          //   success: ({code, data}) => {
          //     that.$Toast_success('支付成功')
          //     setTimeout(() => {
          //       that.$gotoTab('/pages/tabBar/user')
          //     }, 1200)
          //   },
          //   fail: ({code, data}) => {
          //   },
          //   complete: () => {
          //   }
          // })
          // }
          // $toastWarn(wxconfig.appId)

          // function onBridgeReady () {
          //   WeixinJSBridge.invoke(
          //     'getBrandWCPayRequest', {
          //       'appId': wxconfig.appId,     // 公众号名称，由商户传入
          //       'timeStamp': wxconfig.timestamp,         // 时间戳，自1970年以来的秒数
          //       'nonceStr': wxconfig.nonceStr, // 随机串
          //       'package': wxconfig.package,
          //       'signType': wxconfig.signType,         // 微信签名方式：
          //       'paySign': wxconfig.paySign, // 微信签名
          //       'trade_type': 'JSAPI'
          //     },
          //     function (res) {
          //       if (res.err_msg === 'get_brand_wcpay_request:ok') {
          //         // 使用以上方式判断前端返回,微信团队郑重提示：
          //         // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          //       }
          //     })
          // }
          //
          // if (typeof WeixinJSBridge === 'undefined') {
          //   if (document.addEventListener) {
          //     document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
          //   } else if (document.attachEvent) {
          //     document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
          //     document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
          //   }
          // } else {
          //   onBridgeReady()
          // }
          // vm.$wechat.chooseWXPay({
          //   appId: 'wxc41491431733671e',
          //   timestamp: wxconfig.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          //   nonceStr: wxconfig.nonceStr, // 支付签名随机串，不长于 32 位
          //   package: wxconfig.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          //   signType: wxconfig.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          //   paySign: wxconfig.paySign, // 支付签名
          //   success: function (res) {
          //     vm.$router.push({
          //       name: 'activityPaySuccess',
          //       params: {
          //         id: this.id
          //       }
          //     })
          //   },
          //   fail: function (res) {
          //     console.log(res)
          //   }
          // })
          // }
          // console.log(vm.$wechat.chooseWXPay())
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    mounted () {
      console.log(this.$store.state.route)
      this.id = this.$route.params.id
      this.getOrderList()
    }
  }
</script>

<style scoped lang="less">
  .activiyDetails{
    position: relative;
    .menberList{
      max-width: 300px;
      background: rgba(0,0,0,0.6);
      padding: 8px 24px 8px 12px;
      color: white;
      border-radius: 12px;
      position: relative;
      position: absolute;
      right: -12px;
      top: 120px;
    }
    .bc_icon{
      position: absolute;
      right: 12px;
      top: 10px;
      width: 120px;
    }
  }
  .head_picture{
    width: 100%;
  }
  .SummitDetails{
    width: 714px;
    border-radius: 10px;
    margin: -42px 18px 0px 18px;
    background-color: #ffffff;
    position: relative;
    box-shadow: 0px 1px 22px #dedede;
  }
  .SummitDetailV{
    background: #ffffff;
    padding: 20px;
    margin-top: -12px;
    position: relative;
  }
  .icon_choiceness{
    width: 68px;
    vertical-align: middle;
    margin-bottom: 8px;
  }
  .choiceness{
    font-size: 36px;
    font-weight: bold;
    padding: 42px 30px 42px 30px;
  }
  .time{
    font-size: 30px;
    color: #0f2633;
    padding: 0px 0px 52px 30px;
  }
  .site{
    font-size: 30px;
    color: #0f2633;
    padding: 0px 0px 52px 30px;
    overflow: hidden;
  }
  .icon{
    width: 30px;
    margin-right: 12px;
  }
  .icon_arrows_site{
    width: 27px;
    height: 27px;
    float: right;
    margin-right: 30px;
    margin-top: 8px;
  }
  .my{
    font-size: 30px;
    color: #0f2633;
    padding: 0px 0px 52px 30px;
  }

  .money{
    font-size: 30px;
    color: #fb9d39;
    padding: 0px 0px 28px 30px;
    overflow: hidden;
  }
  .plenaryLecture{
    width: 714px;
    padding: 0px 18px 0px 18px;
    margin-top: -8px;
  }
  .For_more_details{
    height: 75px;
    line-height: 75px;
    text-align: center;
    margin: 4px 0px 72px 0px;
    border-top: 4px solid #f7f7fa;
    padding-top: 12px;
    background-color: rgba(255,255,255,0.8);
    font-size: 30px;
    color: #1c9ce3;
    letter-spacing: 1px;
    position: relative;
  }
  /*展开更多详情*/
  .icon_arrows_bottom{
    width: 22px;
    height: 14px;
    margin-left: 6px;
  }
  .box_bottom{
    overflow: hidden;
    position: fixed;
    bottom: 0;
    background: #ffffff;
    width: 100%;
  }
  .home_and_share{
    width: 264px;
    border: none;
    border-top: 1px solid #b6b6b6;
    overflow: hidden;
    float: left;
  }
  .home_, .share_ {
    margin-top: 12px;
    float: left;
  }
  .home_{
    margin-left: 50px;
  }
  .share_{
    margin-left: 64px;
  }
  /*首页图片*/
  .icon_home{
    width: 42px;
    height: 42px;
    vertical-align: middle;
  }
  /*分享图片*/
  .icon_share{
    width: 42px;
    height: 42px;
    vertical-align: middle;
  }
  /*分享text*/
  .home, .share {
    font-size: 20px;
    color: #8e8e8e;
    letter-spacing: 2px;
    margin-left: -2px;
    margin-top: 6px;
  }
  /*立即报名*/
  .applyNow{
    width: 486px;
    height: 105px;
    font-size: 32px;
    background-color: #344a5d;
    line-height: 105px;
    text-align: center;
    letter-spacing: 3px;
    color: #ffffff;
    float: right;
  }
  .height105{
    height: 105px;
  }
  .bc_popup{
    padding: 22px 32px 80px 22px;
    position: relative;
    .list{
      border-bottom: 1px solid #d0d0d0;
      padding: 32px;
      width: 80vw;
      input{
        background: rgba(0,0,0,0.1);
        border: 0;
        height: 60px;
        border-radius: 6px;
        border: 1px solid #f9f9f9;
        margin-top: -12px;
        padding: 0 12px;
      }
    }
    .price{}
  }
  .bc_share{
    width: 100%;
    height: 100vh;
    position: relative;
    background: rgba(0,0,0,0.3);
  }
</style>
