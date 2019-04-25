<template>
  <div class="homepage">
    <!--介绍人-->
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit" class="scrollView">
      <div class="introducer" v-for="item of list">
        <div class="data">
          <div class="picture" v-bind:style="{backgroundImage:'url(' + item.other_user.photo + ')'}"  @click="routeToDetail(item.other_user.type, item.other_user.id)"></div>
          <span class="time">{{item.created_at}}</span>
          <div class="particulars_and_parameter">
            <div class="data_particulars ellipsis_1 font30">
              {{item.other_user.name}}
              <p class="inline-block dist" v-if="item.status == 0"></p>
              <!--<span class="data_title">介绍人</span>-->
              <!--<img class="icon_crown" src="http://images.ufutx.com/201904/02/6e9d7b41f9ff9ec9588d0a7f910deb02.png" alt="">-->
              <!--<span class="crown_region">市级VIP</span>-->
            </div>
          </div>
          <p class="data_parameter flo_l">{{item.content}}</p>
          <div class="font28" v-if="item.type == 'friend'">
            <div v-if="item.deal_status == 0">
              <div class="flo_r consent" @click="showModal(item.other_user.name, 'Y', item.id)">同意</div>
              <div class="flo_r repulse" @click="showModal(item.other_user.name, 'N', item.id)">拒绝</div>
            </div>
            <div v-if="item.deal_status == 1">
              <div class="flo_r consent">已同意</div>
            </div>
            <div v-if="item.deal_status == -1">
              <div class="flo_r repulse">已拒绝</div>
            </div>
          </div>
        </div>
      </div>
      <div class="clearfloat"></div>
    </mescroll-vue>
    <div v-transfer-dom>
      <confirm v-model="show"
               @on-cancel="onCancel"
               @on-confirm="onConfirm">
        <p style="text-align:center;">{{text}}</p>
      </confirm>
    </div>
  </div>
</template>

<script>
  import { Confirm, TransferDomDirective as TransferDom } from 'vux'
  import MescrollVue from 'mescroll.js/mescroll.vue'
  import {$toastSuccess} from '../../config/util'

  export default {
    name: 'news',
    directives: {
      TransferDom
    },
    components: {
      Confirm,
      MescrollVue
    },
    data () {
      return {
        type: '',
        id: '',
        text: '',
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
        list: [],
        show: false
      }
    },
    methods: {
      showModal (name, type, id) {
        this.show = !this.show
        this.type = type
        this.id = id
        if (type === 'Y') {
          this.text = `同意${name}加你为好友？`
        } else {
          this.text = `拒绝${name}加你为好友？`
        }
      },
      onConfirm () {
        let data = {
          status: this.type === 'Y' ? '1' : '-1'
        }
        let page = {num: 1}
        this.$http.post(`/official/deal/friend/request/${this.id}`, data).then(({data}) => {
          $toastSuccess('已处理')
          this.getList(page)
        }).catch((error) => {
          console.log(error)
        })
      },
      onCancel () {
        console.log('取消')
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
      getList (page, mescroll) {
        let url = `/official/notices?page=${page.num}`
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
    }
  }
</script>

<style scoped lang="less">
  .introducer{
    width: 690px;
    padding: 26px 30px 0px 30px;
  }
  .data{
    overflow: hidden;
    border-bottom: 4px solid #f0f0f0;
    padding-bottom: 22px;
  }
  .data_particulars{
    max-width: 220px;
    position: relative;
    padding-right: 22px;
  }
  .data_parameter{
    width: 72vw;
    font-size: 26px;
    color: #c0c0c0;
    margin-left: 12px;
    display: block;
  }
  .dist{
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: red;
    position: absolute;
    right: 0px;
    top: 0;
  }
  .consent{
    color: #33c627;
  }
  .repulse{
    color: red;
    margin-right: 22px;
  }
  .particulars_and_parameter{
    padding: 16px;
    float: left;
  }
  .time{
    font-size: 26px;
    color: #c0c0c0;
    float: right;
    margin-top: 6px;
  }
  .picture{
    width: 120px;
    height: 120px;
    border-radius: 50%;
    float: left;
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>
