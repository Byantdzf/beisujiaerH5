<template>
  <div>
    <swiperComponent :list.sync="recommend"></swiperComponent>
    <div class="main">
      <div class="main-uploader">
        <img src="https://images.ufutx.com/201907/27/86dc9ae9265e1eed7fd1258c8b60d0ab.png" alt="" class="uploader">
      </div>
      <div class="main-uploader1">
        <img src="https://images.ufutx.com/201907/27/6d2695557f8dbae358f479b299d9b1cd.png" alt="" class="uploader">
      </div>
      <div class="main-uploader2">
        <img src="https://images.ufutx.com/201907/27/6c7ccc47ee1656bbe79efc050cbcaf40.png" alt="" class="uploader">
      </div>
      <!--<div class="wrap"></div>-->
    </div>
  </div>
</template>

<script>
  import {Group, Cell, Swiper, XInput, Search, SwiperItem} from 'vux'
  import swiperComponent from '../components/swiper'

  export default {
    components: {
      Group,
      Cell,
      Swiper,
      SwiperItem,
      XInput,
      Search,
      swiperComponent
    },
    data () {
      return {
        init: true,
        index: 0,
        advertising: [],
        recommend: [
          {photo: 'http://img.dingdingtrip.com/uploads/20190621/Foz54TVj0oXh3mS0p2tFBeGw_lIV.jpg', id: 1},
          {photo: 'http://img.dingdingtrip.com/uploads/20190621/Fr7i42sqlRLCddu-cC2yyvWn9bmT.png', id: 1},
          {photo: 'http://img.dingdingtrip.com/uploads/20190621/FmFa0BzWzNUrgmD04uwM1vXF2i4b.jpg', id: 1}
        ],
        list: []
      }
    },
    methods: {
      onIndexChange (index) {
        this.index = index
      },
      swiperItem (currentIndex) {
        this.currentIndex = currentIndex
      },
      routeToDetail (type, id) {
        if (type === 'single') {
          this.$router.push({name: 'information', params: {id: id}})
        } else {
          this.$router.push({name: 'introducer', params: {id: id}})
        }
      },
      mescrollInit (mescroll) {
        this.mescroll = mescroll
      },
      getMessageNum () {
        this.$http.get(`/official/notice/num`).then(({data}) => {
          localStorage.setItem('chat_num', data.chat_message_num.toString())
          localStorage.setItem('notice_num', data.notice_num.toString())
        })
      },
      getOrderList (page, mescroll) {
        let vm = this
        vm.$http.get(`/official/home?page=${page.num}`).then(({data}) => {
          // vm.announcements = data.announcements
          vm.recommend = data.recommend
          vm.$http.get(`/official/home/likers?page=${page.num}`).then(({data}) => {
            vm.init = true
            let dataV = page.num === 1 ? [] : this.list
            dataV.push(...data.data)
            // vm.list = dataV
            vm.$nextTick(() => {
              mescroll.endSuccess(data.data.length)
            })
            vm.getMessageNum()
          }).catch((error) => {
            console.log(error)
          })
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    mounted () {
    }
  }
</script>

<style  lang="less" scoped>
  body{
    background: #f7f7f7 !important;
    .announcementIcon {
      margin-bottom: 8px;
      vertical-align: middle;
    }
  }
  .main{
    .wrap{
      position: relative;  /*日常相对定位*/
      width: 320px;
      height: 180px;
      border:1px solid #666666;
      border-radius:5px;
      margin: auto;
      &::before,&::after{
        content: "";
        display: block;
        position: absolute;
        width:0;
        height: 0;
        border: 12px solid transparent;
        border-right-color: white;
        left: -24px;
        bottom: 12px;
        z-index:1;
      }
      &::after{
        left: -26px;
        border-right-color: black;
        z-index:0;
      }
    }
    .main-uploader,.main-uploader2,.main-uploader1{
      position: fixed;
      left: 0;
      bottom: -20px;
      width: 100%;
      text-align: center;
      animation: myMove 2800ms infinite linear;
      animation-fill-mode: forwards;
      animation-delay: 800ms;
      .uploader{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        box-shadow: 1px 1px 16px #ededed;
      }
    }
    .main-uploader1{
      animation: myMove1 800ms ;
      animation-fill-mode: forwards;
      animation-delay: 400ms;
      .uploader{
        width: 50px;
        height: 50px;
      }
    }
    .main-uploader2{
      animation: myMove2 800ms ;
      animation-fill-mode: forwards;
      .uploader{
        width: 30px;
        height: 30px;
      }
    }
  }

  @keyframes myMove {
    0% {
      bottom: 126px;
      opacity: 0.5;
      transform: scale(.8)
    }
    50% {
      opacity: 1;
      bottom: 160px;
      transform: scale(1)
    }
    100% {
      opacity: 1;
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
