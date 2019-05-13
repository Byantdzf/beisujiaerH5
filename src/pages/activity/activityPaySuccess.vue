<template>
  <div class="activityPaySuccess">
    <img src="https://images.ufutx.com/201904/03/ee7616d5e68078e5e9010d6e51110bdf.png" alt="">
    <p class="text">报名成功，请准时出席！</p>
    <div class="bc_box">
      <div class="share inline-block" @click="share">分享</div>
      <div class="back inline-block" @click="back" >返回</div>
    </div>
  </div>
</template>

<script>
  import {$toastText} from '../../config/util'

  export default {
    name: 'activityPaySuccess',
    components: {
    },
    data () {
      return {
        id: '',
        name: ''
      }
    },
    methods: {
      share () {
        $toastText('未设置分享')
      },
      back () {
        window.history.back(-1)
      }
    },
    mounted () {
      this.id = this.$route.params.id
    }
  }
</script>

<style scoped lang="less">
  .activityPaySuccess{
    padding-top: 92px;
    text-align: center;
    img{
      width: 460px;
    }
    .text{
      font-size: 42px;
      margin-top: 40px;
      color: #F56924;
    }
    .bc_box{
      height: 105px;
      line-height: 105px;
      text-align: center;
      font-size: 34px;
      color: #fffffd;
      background-color: #344a5d;
      position: fixed;
      bottom: 0;
      width: 100vw;
      letter-spacing: 3px;
      .back,.share{
        width: 49%;
        position: relative;
      }
      .share:after {
        content: '';
        width: 1px;
        height: 60px;
        position: absolute;
        right: 0;
        background: #f1f1f1;
        top: 24px;
      }
    }
  }
</style>
