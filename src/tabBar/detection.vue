<template>
  <div class="main">
    <swiperComponent :list.sync="list"></swiperComponent>
    <div class="">
      <div class="main-uploader" @click="tirggerFile">
        <img src="https://images.ufutx.com/201907/27/86dc9ae9265e1eed7fd1258c8b60d0ab.png" alt="" class="uploader">
        <div class="momentLikers colorb0 font28">点击上传图片或拍照，系统将为您自动识别检测哦</div>
      </div>
      <div class="main-uploader1">
        <img src="https://images.ufutx.com/201907/27/6d2695557f8dbae358f479b299d9b1cd.png" alt="" class="uploader">
      </div>
      <div class="main-uploader2">
        <img src="https://images.ufutx.com/201907/27/6c7ccc47ee1656bbe79efc050cbcaf40.png" alt="" class="uploader">
      </div>
    </div>
  </div>
</template>

<script>
  import {Group, Cell, Swiper, XInput, Search, SwiperItem} from 'vux'
  import swiperComponent from '../components/swiper'

  export default {
    name: 'detection',
    components: {
      Group,
      Cell,
      Swiper,
      SwiperItem,
      XInput,
      Search,
      swiperComponent
    },
    data() {
      return {
        init: true,
        index: 0,
        list: []
      }
    },
    methods: {
      onIndexChange(index) {
        this.index = index
      },
      swiperItem(currentIndex) {
        this.currentIndex = currentIndex
      },
      routeToDetail(type, id) {
        if (type === 'single') {
          this.$router.push({name: 'information', params: {id: id}})
        } else {
          this.$router.push({name: 'introducer', params: {id: id}})
        }
      },
      mescrollInit(mescroll) {
        this.mescroll = mescroll
      },
      getMessageNum() {
        this.$http.get(`/official/notice/num`).then(({data}) => {
          localStorage.setItem('chat_num', data.chat_message_num.toString())
          localStorage.setItem('notice_num', data.notice_num.toString())
        })
      },
      tirggerFile(event) {
        this.$router.push({name: 'detectionDetail'})
      },
      getOrderList(page) {
        let vm = this
        vm.$http.get(`/detection/carousels?type=baby_carousel`).then(({data}) => {
          let list = []
          for (let item of data){
            list.push(
              {
                photo: item.pic,
                id: item.id,
                title: item.title,
                path: item.path
              }
            )
          }
          this.list = list
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    mounted() {
      this.getOrderList()
    }
  }
</script>

<style lang="less" scoped>
  body {
    background: #f7f7f7 !important;

    .announcementIcon {
      margin-bottom: 8px;
      vertical-align: middle;
    }
  }
  .momentLikers{
    width: 30%;
    background: #f0f0f0;
    padding: 12px 22px;
    position: relative;
    border-radius: 12px;
    margin: auto;
    position: absolute;
    right: 32px;
    bottom: 20%;
    &:before {
      display: block;
      content: '';
      border-width: 18px 18px 18px 18px;
      border-style: solid;
      border-color: transparent #f0f0f0 transparent transparent;
      /* 定位 */
      position: absolute;
      left: -12%;
      bottom: 10%;
    }
    .img{
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      margin-right: 12px;
    }
  }

  .main {
    height: 100vh;
    background: white;
    .wrap {
      position: relative; /*日常相对定位*/
      width: 320px;
      height: 180px;
      border: 1px solid #666666;
      border-radius: 5px;
      margin: auto;

      &::before, &::after {
        content: "";
        display: block;
        position: absolute;
        width: 0;
        height: 0;
        border: 12px solid transparent;
        border-right-color: white;
        left: -24px;
        bottom: 12px;
        z-index: 1;
      }

      &::after {
        left: -26px;
        border-right-color: black;
        z-index: 0;
      }
    }

    .main-message {
      position: absolute;
      right: 22px;
      bottom: 400px;

      .pic {
        width: 300px;
      }
    }

    .main-uploader, .main-uploader2, .main-uploader1 {
      position: relative;
      position: fixed;
      left: 0;
      bottom: -20px;
      width: 100%;
      text-align: center;
      animation: myMove 2800ms infinite linear;
      animation-fill-mode: forwards;
      animation-delay: 800ms;

      .uploader {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        box-shadow: 1px 1px 16px #ededed;
      }
    }

    .main-uploader1 {
      animation: myMove1 800ms;
      animation-fill-mode: forwards;
      animation-delay: 400ms;

      .uploader {
        width: 50px;
        height: 50px;
      }
    }

    .main-uploader2 {
      animation: myMove2 800ms;
      animation-fill-mode: forwards;

      .uploader {
        width: 30px;
        height: 30px;
      }
    }
  }

  @keyframes myMove {
    0% {
      bottom: 126px;
      /*opacity: 0.5;*/
      transform: scale(.8)
    }
    50% {
      /*opacity: 1;*/
      bottom: 160px;
      transform: scale(1)
    }
    100% {
      /*opacity: 1;*/
      bottom: 126px;
      transform: scale(.8)
    }
  }

  @keyframes myMove1 {
    from {
      bottom: 0;
      opacity: 0.1;
    }
    to {
      opacity: 1;
      bottom: 100px;
    }
  }

  @keyframes myMove2 {
    0% {
      bottom: 0;
      opacity: 0.1;
    }
    100% {
      opacity: 1;
      bottom: 68px;
    }
  }

  .test {
    margin: 42px auto;
    padding: 10px;
    border: 2px solid #b0b0b0;
    border-radius: 14px;
    width: 300px;
    height: 120px;
    position: relative;
    position: absolute;
    right: 22px;
    /*background-color: #f52633;*/
  }

  .bubble {
    position: absolute;
    width: 40px;
    height: 40px;
    bottom: -40px;
    left: 22px;
  }

  .bubble * {
    display: block;
    border-width: 20px;
    position: absolute;
    border-style: solid dashed dashed dashed;
    font-size: 0;
    line-height: 0;
  }

  .bubble em {
    border-color: white transparent transparent;
    top: -4px;
  }

  .bubble span {
    border-color: #b0b0b0 transparent transparent;
    top: 0px;
  }

  .file-input {
    color: transparent;
    opacity: 0;
    position: absolute;
    width: 100px;
    height: 100px;
  }

  /*.animationData {*/
  /*animation: myMove2 800ms linear;*/
  /*animation-fill-mode: forwards;*/
  /*}*/

  /*@keyframes myMove2 {*/
  /*from {*/
  /*height: 302px;*/
  /*}*/
  /*to {*/
  /*height: 347px;*/
  /*}*/
  /*}*/

</style>
