<template>
  <div>
    <div class="bc_swiper">
      <swiper :list="imgList"  :min-moving-distance="120" :show-desc-mask="false" height="320px" :auto="true" dots-position="center" :interval="2000"></swiper>
      <span class="like colorff font28">
      <img src="http://images.ufutx.com/201904/01/2748b2373009c307d86f3750d85a812e.png" alt="" class="icon">
      63
    </span>
    </div>
    <div class="bc_detail">
      <span class="name bold">刘晓晓</span>
      <img src="http://images.ufutx.com/201904/01/20bd8509677d59dc218eebfe4be8397e.png" alt="" class="icon">
      <span class="font20">市级VIP</span>
      <div class="bc_love flo_r">
        <img src="http://images.ufutx.com/201904/01/8fa72896ec233f2de67413f530e9ac31.png" alt="" class="love">
      </div>
      <p class="message">
        <span class="font26 colorbe">26岁 · 深圳 · 168cm</span>
      </p>
    </div>
    <div class="introduction">
      <p style="width: 20%" class="font26 flo_l">自我介绍</p>
      <p class="colorbe flo_r font26" style="width: 80%">奥斯卡军多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多</p>
      <p class="clearfloat"></p>
    </div>
    <p class="bc_dist"></p>
  </div>
</template>

<script>
  import { Group, Cell, XHeader, XInput, Swiper } from 'vux'

  export default {
    name: 'information',
    components: {
      Group,
      Cell,
      XHeader,
      XInput,
      Swiper
    },
    data () {
      return {
        imgList: [{
          url: 'javascript:',
          img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2622829061,2227432350&fm=26&gp=0.jpg'
        }, {
          url: 'javascript:',
          img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=685006216,2192383313&fm=26&gp=0.jpg',
          fallbackImg: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2622829061,2227432350&fm=26&gp=0.jpg'
        }]
      }
    },
    methods: {
      getData () {
        // this.$http.get('/official/activities').then(({data}) => {
        //   console.log(data)
        // }).catch((error) => {
        //   console.log(error)
        // })
      }
    },
    mounted () {
      console.log(this.$store.state.route)
      console.log(this.$store.state.data)
      this.getData()
    }
  }
</script>

<style  lang="less" scoped>
  body{
    background: #f7f7f7 !important;
    .like{
      padding: 6px 22px;
      background: rgba(0,0,0,0.5);
      border-radius: 24px;
      margin-top: -80px;
      z-index: 999999;
      position: absolute;
      right: 35px;
      .icon{
        width: 28px;
        margin-right: 2px;
      }
    }
    .bc_detail{
      padding: 30px;
      .name{
        font-size: 36px;
      }
      .icon{
        width: 32px;
        margin: 0 -2px 0 16px ;
      }
      .bc_love{
        margin-top: 10px;
        .love{
          width: 68px;
        }
      }
      .message{
        border-bottom: 1px solid #b6b6b6;padding-bottom: 30px;
      }
    }
    .introduction{
      padding: 0 30px 30px 30px;
      border-bottom: 1px solid #b6b6b6;
    }
    .bc_dist{
      background: #F5F5F5;height: 20px;
    }
  }
</style>
