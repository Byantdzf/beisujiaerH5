<template>
  <div>
    <!--<swiper loop auto :list="list" :index="index" height="60vw"  @click.native="onIndexChange"></swiper>-->
    <swiper loop auto height="60vw">
      <swiper-item class="swiper-box" v-for="item,index in list" :key="index">
        <div class="img" v-bind:style="{backgroundImage:'url(' + item.pic + ')'}" @click="linkPage(item.path)">
          <p class="title">{{item.title}}</p>
        </div>
      </swiper-item>
    </swiper>
    <div>
      <img :src="item.pic" alt="" width="100%" v-for="item,index in home_shows">
    </div>
  </div>
</template>

<script>
  import {Group, Cell, Swiper, XInput, Search, SwiperItem} from 'vux'

  export default {
    name: 'home',
    components: {
      Group,
      Cell,
      Swiper,
      SwiperItem,
      XInput,
      Search
    },
    data () {
      return {
        init: true,
        index: 0,
        advertising: [],
        home_shows: [],
        list: []
      }
    },
    methods: {
      onIndexChange (index) {
        this.index = index
        console.log(index)
      },
      linkPage (path) {
        window.location.href = path
      },
      getOrderList () {
        let vm = this
        vm.$http.get(`/home`).then(({data}) => {
          vm.list = data.home_carousels
          vm.home_shows = data.home_shows
          console.log(vm.list)
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    mounted () {
      this.getOrderList()
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
    .swiper-box{
      height: 200px;
      .img{
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
      }
      .title{
        width: 100%;
        height: 70px;
        position: absolute;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, .5);
      }
    }
  }
</style>
