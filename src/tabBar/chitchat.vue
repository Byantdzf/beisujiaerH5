<template>
  <div id="chitchat">
    <!--<x-header class="ignore" :left-options="{showBack: false}">聊天</x-header>-->
    <!--<div style="height: 50px;"></div>-->
    <div class="wrapper ff" v-for="item in list">
      <div class="avatar flo_l"  v-bind:style="{backgroundImage:'url(' + item.img + ')'}"></div>
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
          {img: 'http://images.ufutx.com/201904/02/bea66210c44f26ca21fe743758c69dfb.png', title: '良人'},
          {img: 'http://images.ufutx.com/201904/02/834674d9695ac661388004eda367c937.png', title: '佳偶'},
          {img: 'http://images.ufutx.com/201904/02/ea2dd5450ff81994dcd1ef70fed720b1.png', title: '红娘'},
          {img: 'http://images.ufutx.com/201904/02/8699058f061683e3085ba2a2aaaa3464.png', title: '介绍人'}
        ]
      }
    },
    methods: {
      getMessageNum () {
        let paas = this.$store.state.paas
        this.$http.get(`/official/notice/num?paas=${paas}`).then(({data}) => {
          localStorage.setItem('chat_num', data.chat_message_num.toString())
          localStorage.setItem('notice_num', data.notice_num.toString())
        })
      },
      getOrderList (page, mescroll) {
        let paas = this.$store.state.paas
        this.$http.get(`/official/message/linkmen?paas=${paas}`).then(({data}) => {
          console.log(data)
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    mounted () {
      console.log(this.$store.state.route)
      this.getOrderList()
      this.getMessageNum()
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

