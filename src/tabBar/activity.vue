<template>
  <div id="activity">
    <!--<x-header class="ignore" :left-options="{showBack: false}">活动</x-header>-->
    <!--<div style="height: 50px;"></div>-->
    <div class="list-item" v-for="item in list">
      <div class="bc_date font26">
        2019年03月12日
      </div>
      <div class="image" style="background-image: url('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1511461500,2536850263&fm=200&gp=0.jpg');"></div>
      <p class="font30 color6 name">一次就好，我陪你去看天荒地老</p>
    </div>
  </div>
</template>

<script>
  import { Group, Cell, XHeader, XInput } from 'vux'

  export default {
    name: 'activity',
    components: {
      Group,
      Cell,
      XHeader,
      XInput
    },
    data () {
      return {
        value: '',
        search: '',
        list: [
          {}, {}, {}, {}, {}, {}, {}
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
    }
  }
</script>

<style  lang="less" scoped>
  body{
    background: #f7f7f7 !important;
  }
  .search-box{
    margin:22px 0;
    .homeSearch{
      width: 690px;
      height: 88px;
      border-radius: 6px;
      border: none;
      box-shadow: 1px 1px 12px #e9e9e9;
    }
  }
  .list-item{
    width: 646px;
    padding: 30px;
    margin: auto;
    border-radius: 10px;
    background: white;
    margin-top: 22px;
    box-shadow: -1px 8px 18px #dadada;
    margin-bottom: 30px;
    .bc_date{
      border-bottom: 4px solid #ececec;
      padding-bottom: 30px;
      margin-bottom: 30px;
      color: #6f6f6f;
    }
    .image{
      width: 646px;
      height: 328px;
    }
    .name{
      margin-top: 30px;
    }
  }
</style>
