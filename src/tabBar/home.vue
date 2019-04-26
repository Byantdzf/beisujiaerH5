<template>
  <div>
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit" class="scrollView">
      <!--<div id="box"></div>-->
      <div style="background: #35495e;padding: 10px;padding-bottom: 0px;" class="font30" v-if="announcements.length > 0">
        <swiper auto height="30px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false" >
          <swiper-item v-for="item in announcements" :key="item.id">
            <p class="ellipsis_1" @click="$href(item.type == 'OF'?item.path:'#')">
              <img src="http://images.ufutx.com/201904/15/356b40bdf7ff0172414c559449e14ee0.png" alt="" width="22px"
                   class="announcementIcon">
              {{item.title}}
            </p>
          </swiper-item>
        </swiper>
      </div>
      <router-link to="userList">
        <div class="text-center search-box">
          <input type="text" class="homeSearch text-center" v-model="search" placeholder="请搜索Ta的名字">
        </div>
      </router-link>
      <p class="bc_title font34 bold">征婚</p>
      <swiperComponent :list.sync="recommend"></swiperComponent>
      <!--<swiper  :min-moving-distance="120" :show-desc-mask="true"  :auto="true" :interval="2000" @on-index-change="swiperItem">-->
        <!--<swiper-item v-for="item,index in recommend" :key="item.id" >-->
          <!--<div :class="[index == current?'animationData': 'animationData2']">-->
            <!--<div class="recommend-image backCover"  v-bind:style="{backgroundImage:'url(' + item.photo + ')'}" @click="routeToDetail(item.user.type, item.user.id)"></div>-->
          <!--</div>-->
        <!--</swiper-item>-->
      <!--</swiper>-->
      <div class="list-item" v-for="item in list" @click="routeToDetail(item.type, item.id)">
        <div class="image" v-bind:style="{backgroundImage:'url(' + item.photo + ')'}"></div>
        <p style="margin-top: 8px;">
          <span class="font32">{{item.name}}</span>
          <span class="font20 colorb">{{item.age}} · {{item.stature}}cm {{item.city? '· '+item.city: ''}}</span>
        </p>
        <p class="font26 color6 ellipsis_1" style="margin-top: 4px">{{item.introduction}}</p>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
  import { Group, Cell, XHeader, Swiper, XInput, Search, SwiperItem } from 'vux'
  import MescrollVue from 'mescroll.js/mescroll.vue'
  import swiperComponent from '../components/swiper'

  export default {
    components: {
      Group,
      Cell,
      XHeader,
      Swiper,
      SwiperItem,
      XInput,
      Search,
      swiperComponent,
      MescrollVue
    },
    data () {
      return {
        value: '',
        current: 0,
        search: '',
        init: false,
        recommend: [],
        noData: false,
        page: 1,
        announcements: [],
        mescroll: null, //  mescroll实例对象
        mescrollDown: {}, // 下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
        mescrollUp: { // 上拉加载的配置.
          callback: this.getOrderList, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
          // 以下是一些常用的配置,当然不写也可以的.
          page: {
            num: 0, // 当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 15 // 每页数据条数,默认10
          },
          htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>', // 上拉加载中的布局
          htmlNodata: '<p class="upwarp-nodata">-- 加载完毕 --</p>' // 无数据的布局
        },
        list: []
      }
    },
    methods: {
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
          vm.announcements = data.announcements
          vm.recommend = data.recommend
          vm.$http.get(`/official/home/likers?page=${page.num}`).then(({data}) => {
            vm.init = true
            let dataV = page.num === 1 ? [] : this.list
            dataV.push(...data.data)
            vm.list = dataV
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
      // console.log(this.$store.state.intercept)
      // if (this.$store.state.intercept === 'true') {
      //   return false
      // }
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
    border: 4px solid #f0f0f3;
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
      color: white;
    }
  }
  .list-item{
    width: 646px;
    height: 736px;
    padding: 22px;
    padding-bottom: 32px;
    margin: auto;
    border-radius: 10px;
    background: white;
    margin-top: 22px;
    box-shadow: -1px 8px 18px #dadada;
    margin-bottom: 26px;
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
</style>
