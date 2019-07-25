<template>
  <div>
    <swiperComponent :list.sync="recommend"></swiperComponent>
    <!--<swiper loop auto :list="list" :index="index" height="100vw" @on-index-change="onIndexChange"></swiper>-->
    <!--<div class="height160"></div>-->
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
          {photo: 'http://img.dingdingtrip.com/uploads/20190621/Foz54TVj0oXh3mS0p2tFBeGw_lIV.jpg', id: 1},
          {photo: 'http://img.dingdingtrip.com/uploads/20190621/Foz54TVj0oXh3mS0p2tFBeGw_lIV.jpg', id: 1},
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
  .vux-demo {
    text-align: center;
  }
  .logo {
    width: 100px;
    height: 100px
  }
  .search-box{
    width: 690px;
    height: 88px;
    margin: 22px auto;
    background: white;
    border-radius: 6px;
    border: 2px solid #f0f0f3;
    .homeSearch{
      width: 100%;
      height: 100%;
      border: none;
      background: none;
      /*box-shadow: 1px 1px 12px #e9e9e9;*/
    }
  }
  .bc_title{
    margin-top: 12px;
    margin-left: 22px;
    margin-bottom: 12px;
  }
  .vux-img{
    width: 90% !important;
    margin: auto;
    border-radius: 6px;
    box-shadow: 1px 1px 12px #d3d3d3;
  }
  .vux-swiper{
    text-align: center;
    p{
      color: #666666;
    }
  }
  .list-item{
    .image{
      width: 100%;
      height: 646px;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  .recommend-image{
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .vux-swiper{
    height: 400px;
  }

  .announcements {
    background: #EDEDED;
    padding: 12px 22px;
    padding-bottom: 0px;
    /*margin-top: -12px;*/
    /*margin-bottom: 18px;*/
  }

  .animationData {
    animation: myMove2 800ms linear;
    animation-fill-mode: forwards;
  }

  @keyframes myMove2 {
    from {
      height: 302px;
    }
    to {
      height: 347px;
    }
  }

  .animationData2 {
    animation: myMove1 800ms linear;
    animation-fill-mode: forwards;

  }

  @keyframes myMove1 {
    from {
      height: 347px;
    }
    to {
      height: 302px;

    }
  }
  .groupicon{
    padding: 32px 0;
    overflow: hidden;
    border-bottom: 8px solid #ECECEC;
    .item-icon{
      width: 25%;
      float: left;
      text-align: center;
      img{
        width: 88px;
      }
      .title{
        margin-top: 4px;
      }
    }
  }
</style>
