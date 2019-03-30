<template>
  <div id="chitchat">
    <!--<x-header class="ignore" :left-options="{showBack: false}">聊天</x-header>-->
    <!--<div style="height: 50px;"></div>-->
    <div class="wrapper ff" v-for="item in list">
      <div class="avatar flo_l" style="background-image: url('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1511461500,2536850263&fm=200&gp=0.jpg');"></div>
      <div class="name inline-block">
        <span class="font30 bold">{{item.title}}</span><br/>
        <p class="font26 colorb" style="margin-top: 6px;">
          暂无新消息
        </p>
      </div>
      <!--<div class="editData flo_r font26">编辑资料</div>-->
      <div class="clearfloat"></div>
    </div>
  </div>
</template>

<script>
  import { Group, Cell, XHeader, XInput, Badge } from 'vux'

  export default {
    name: 'chitchat',
    components: {
      Group,
      Cell,
      XHeader,
      XInput,
      Badge
    },
    data () {
      return {
        value: '',
        search: '',
        list: [
          {title: '良人'}, {title: '佳偶'}, {title: '红娘'}, {title: '介绍人'}
        ]
      }
    },
    methods: {
      onClick () {
        this.$store.dispatch('login')
      }
    },
    mounted () {
      console.log(this.$store.state.route)
      console.log(this.$store.state.count)
    }
  }
</script>

<style  lang="less">
  body{
    background: #f7f7f7 !important;
  }
  .wrapper{
    padding: 20px;
    border-bottom: 4px solid #f9f9f9;
    .avatar{
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-size: cover;
      margin-right: 25px;
    }
    .name{
      margin-top: 12px;
    }
    .mutual{
      margin-top: 55px;
      color: #848484;
      .after{
        position: relative;
        &:after{
          content: '';
          width: 2px;
          height: 32px;
          background: #848484;
          position: absolute;
          right: 0;
        }
      }
      li{
        padding: 0 80px;
        display: inline-block;
        font-size: 26px;
        text-align: center;
        p{
          font-size: 28px;
          margin-bottom: 12px;
        }
      }
    }
  }
  .maTop16{margin-top: 16px}
  .editData{
    padding: 8px 20px;
    border-radius: 32px;
    color: #35495e;
    border: 1px solid #35495e;
  }
</style>

