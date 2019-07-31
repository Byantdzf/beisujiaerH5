<template>
  <div class="main">
    <!--介绍人-->
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit" class="scrollView">
      <tab style="background-color: #56a0ce;font-size: 14px" bar-active-color="#56a0ce" active-color="#56a0ce" custom-bar-width='100px'>
        <tab-item :selected="type === 'baby'" @on-item-click="tabClick('baby')">宝宝尿检</tab-item>
        <tab-item :selected="type === 'junban'" @on-item-click="tabClick('junban')">斑菌检测</tab-item>
      </tab>
      <div v-if="list.length < 1" class="text-center" style="margin-top: 22%">
        <img src="https://images.ufutx.com/201907/31/3b3bd32530f937819386923801befabc.png" alt="" width="160px">
      </div>
      <div class="ff" style="min-height: 100vh; adding-bottom: 36px" v-else>
        <div class="introducer " v-for="item of list" @click="showHelp(item)">
          <div class="data">
            <div class="picture" v-bind:style="{backgroundImage:'url(' + item.pic + ')'}" ></div>
            <div class="particulars_and_parameter">
              <div class="data_particulars">
                <span class="data_name font28">检测结果：<span class="bold">{{item.example.name}}</span></span>
              </div>
            </div>
            <div class="time">检测时间：{{item.created_at}}</div>
            <img src="https://images.ufutx.com/201907/26/038e3c3012f246d562f2deb9c9672f1c.png" alt="" class="flo_r icon" >
          </div>
        </div>
      </div>
      <moadlUp :show.sync="showDetail" @hideModal="hideDetail">
        <div class="main-qr font28">
          <p>
            <span class="bold">检测结果：</span><span class=" color6">{{colorItem.name}}</span></p>
          <p class="flo_l bold">对比色块：</p>
          <div class="itemColor flo_l" v-bind:style="{background: `rgb(${colorItem.color_value})`}"></div>
          <div class="clearfloat"></div>
          <p>
            <span class="bold">结果说明：</span>
            <span class="color6">{{colorItem.intro}}</span></p>
        </div>
      </moadlUp>
    </mescroll-vue>
  </div>
</template>

<script>
  import MescrollVue from 'mescroll.js/mescroll.vue'
  import {Tab, TabItem} from 'vux'
  import moadlUp from '../../components/moadlUp'

  export default {
    name: 'myFriend',
    components: {
      MescrollVue,
      Tab,
      TabItem,
      moadlUp
    },
    data () {
      return {
        type: 'baby',
        showDetail: false,
        colorItem: {},
        mescroll: null, //  mescroll实例对象
        mescrollDown: {}, // 下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
        mescrollUp: { // 上拉加载的配置.
          callback: this.getList, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
          page: {
            num: 0, // 当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 15 // 每页数据条数,默认10
          },
          htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>', // 上拉加载中的布局
          htmlNodata: '<p class="upwarp-nodata">-- 加载完毕 --</p>' // 无数据的布局
        },
        list: [
          // {
          //   photo: 'https://images.ufutx.com/201907/26/c66ed5d4a3900b873815b4856758931e.jpeg',
          //   id: 1,
          //   created_at: '2019-7-19 19:29:00',
          //   name: '病原体'
          // },
          // {
          //   photo: 'https://images.ufutx.com/201907/26/c66ed5d4a3900b873815b4856758931e.jpeg',
          //   id: 1,
          //   created_at: '2019-7-19 19:29:00',
          //   name: '病原体'
          // },
          // {
          //   photo: 'https://images.ufutx.com/201907/26/c66ed5d4a3900b873815b4856758931e.jpeg',
          //   id: 1,
          //   created_at: '2019-7-19 19:29:00',
          //   name: '病原体'
          // }
        ]
      }
    },
    methods: {
      showHelp(item) {
        this.showDetail = true
        this.colorItem = item.example
      },
      hideDetail (value) {
        this.showDetail = value
      },
      tabClick (type) {
        this.list = []
        this.type = type
        let page = {num: 1}
        this.getList(page)
      },
      mescrollInit (mescroll) {
        this.mescroll = mescroll
      },
      getList (page, mescroll) {
        let url = `/user/detections?page=${page.num}&type=${this.type}`
        this.$http.get(url).then(({data}) => {
          let dataV = page.num === 1 ? [] : this.list
          dataV.push(...data.data)
          this.list = dataV
          if (mescroll) {
            this.$nextTick(() => {
              mescroll.endSuccess(data.data.length)
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    mounted () {
      // this.type = this.$route.params.type
    }
  }
</script>

<style scoped lang="less">
  .main{
    height: 100vh;
    background: #f3f4f8;
  }
  .introducer{
    width: 690px;
    padding: 26px 30px 0px 30px;
  }
  .data{
    overflow: hidden;
    border-bottom: 4px solid #f0f0f0;
    padding-bottom: 22px;
    .icon{
      width: 52px;
      margin-top: -32px;
    }
  }
  .data_name{
    font-size: 28px;
    color: #666666;
  }
  .icon_crown{
    width: 28px;
    margin-left: 2px;
    vertical-align: middle;
  }
  .crown_region{
    font-size: 20px;
    margin-left: -4px;
  }
  .data_parameter{
    font-size: 26px;
    color: #c0c0c0;
    margin-top: 12px;
  }
  .particulars_and_parameter{
    padding: 16px;
    padding-top: 6px;
    float: left;
  }
  .time{
    font-size: 28px;
    color: #c0c0c0;
    margin-top: 6px;
    margin-left: 14px;
    float: left;
  }
  .picture{
    width: 120px;
    height: 120px;
    border-radius: 12px;
    float: left;
    margin-right: 12px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .main-qr {
    width: 86%;
    margin: auto;
    background: white;
    margin-top: 32px;
    border-radius: 12px;
    padding: 22px;
    overflow: hidden;
    .itemColor{
      width: 100px;
      height: 100px;
    }
    p {
      margin: 12px;
    }
  }
</style>
