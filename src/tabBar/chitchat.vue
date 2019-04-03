<template>
  <div id="chitchat">
    <div class="wrapper ff" @click="routeToDetail('single_man')">
      <div class="avatar flo_l" style="background-image: url('http://images.ufutx.com/201904/02/bea66210c44f26ca21fe743758c69dfb.png')" ></div>
      <div class="name inline-block">
        <span class="font30 bold">良人</span><br/>
        <p class="font26 colorb" style="margin-top: 6px;"  v-if="single_men.length < 1">暂无新消息</p>
        <div class="user flo_l" v-else>
          <img :src="item.circle_avatar" class="avatar" alt="" v-for="item of single_men">
        </div>
      </div>
      <div class="flo_r count">
        <p class="inline-block num colorff" v-if="single_man_count">{{single_man_count}}</p>
        <img src="http://images.ufutx.com/201812/05/879fe80db665c553d4cd57afa4d4273c.png" alt="">
      </div>
      <div class="clearfloat"></div>
    </div>
    <div class="wrapper ff" @click="routeToDetail('single_woman')">
      <div class="avatar flo_l" style="background-image: url('http://images.ufutx.com/201904/02/834674d9695ac661388004eda367c937.png')" ></div>
      <div class="name inline-block">
        <span class="font30 bold">佳偶</span><br/>
        <p class="font26 colorb" style="margin-top: 6px;"  v-if="single_men.length < 1">暂无新消息</p>
        <div class="user flo_l" v-else>
          <img :src="item.circle_avatar" class="avatar" alt="" v-for="item of single_women">
        </div>
      </div>
      <div class="flo_r count">
        <p class="inline-block num colorff" v-if="single_man_count">{{single_woman_count}}</p>
        <img src="http://images.ufutx.com/201812/05/879fe80db665c553d4cd57afa4d4273c.png" alt="">
      </div>
      <div class="clearfloat"></div>
    </div>
    <div class="wrapper ff" @click="routeToDetail('maker')">
      <div class="avatar flo_l" style="background-image: url('http://images.ufutx.com/201904/02/ea2dd5450ff81994dcd1ef70fed720b1.png')" ></div>
      <div class="name inline-block">
        <span class="font30 bold">红娘</span><br/>
        <p class="font26 colorb" style="margin-top: 6px;"  v-if="single_men.length < 1">暂无新消息</p>
        <div class="user flo_l" v-else>
          <img :src="item.circle_avatar" class="avatar" alt="" v-for="item of makers">
        </div>
      </div>
      <div class="flo_r count">
        <p class="inline-block num colorff" v-if="single_man_count">{{maker_count}}</p>
        <img src="http://images.ufutx.com/201812/05/879fe80db665c553d4cd57afa4d4273c.png" alt="">
      </div>
      <div class="clearfloat"></div>
    </div>
    <div class="wrapper ff" @click="routeToDetail('marriage')">
      <div class="avatar flo_l" style="background-image: url('http://images.ufutx.com/201904/02/8699058f061683e3085ba2a2aaaa3464.png')" ></div>
      <div class="name inline-block">
        <span class="font30 bold">介绍人</span><br/>
        <p class="font26 colorb" style="margin-top: 6px;"  v-if="single_men.length < 1">暂无新消息</p>
        <div class="user flo_l" v-else>
          <img :src="item.circle_avatar" class="avatar" alt="" v-for="item of marriages">
        </div>
      </div>
      <div class="flo_r count">
        <p class="inline-block num colorff" v-if="single_man_count">{{marriage_count}}</p>
        <img src="http://images.ufutx.com/201812/05/879fe80db665c553d4cd57afa4d4273c.png" alt="">
      </div>
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
        single_men: [],
        single_women: [],
        makers: [],
        marriages: [],
        single_man_count: '',
        single_woman_count: '',
        maker_count: '',
        marriage_count: '',
        list: [
          {img: 'http://images.ufutx.com/201904/02/bea66210c44f26ca21fe743758c69dfb.png', title: '良人'},
          {img: 'http://images.ufutx.com/201904/02/834674d9695ac661388004eda367c937.png', title: '佳偶'},
          {img: 'http://images.ufutx.com/201904/02/ea2dd5450ff81994dcd1ef70fed720b1.png', title: '红娘'},
          {img: 'http://images.ufutx.com/201904/02/8699058f061683e3085ba2a2aaaa3464.png', title: '介绍人'}
        ]
      }
    },
    methods: {
      routeToDetail (type) {
        this.$router.push({name: 'chatList', params: {type: type}})
      },
      getMessageNum () {
        let paas = this.$store.state.paas
        this.$http.get(`/official/notice/num?paas=${paas}`).then(({data}) => {
          localStorage.setItem('chat_num', data.chat_message_num.toString())
          localStorage.setItem('notice_num', data.notice_num.toString())
        })
      },
      getOrderList (page, mescroll) {
        let paas = this.$store.state.paas
        this.$http.get(`/official/message/linkman/list?paas=${paas}`).then(({data}) => {
          this.single_men = data.single_men
          this.single_women = data.single_women
          this.makers = data.makers
          this.marriages = data.marriages
          this.single_man_count = data.single_man_count
          this.single_woman_count = data.single_woman_count
          this.maker_count = data.maker_count
          this.marriage_count = data.marriage_count
          console.log(this.list)
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
  .count{
    padding-top: 36px;
    img{
      width: 32px;
      vertical-align: middle;
      margin-bottom: 4px;
    }
  }
  .num{
    width: 36px;
    height: 36px;
    background: red;
    line-height: 36px;
    text-align: center;
    border-radius: 50%;
    font-size: 22px;
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
      .avatar{
        width: 60px;height: 60px;
        margin: 8px 12px 0 0;
      }
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

