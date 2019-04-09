<template>
  <div class="upgrade">
    <div>
      <img class="diamondPicture"  src="http://images.ufutx.com/201904/03/0c266b91baffd71e415fbba91c13c468.png" alt="">
      <div class="head_card">
        <div class="box_card">
          <img class="card" src="http://images.ufutx.com/201904/09/5f6729651bddb1029bdf8b0a6414d8d5.png" alt="">
        </div>
        <div class="head_portrait">
          <div class="portrait_name_diamond">
            <div class="portrait"  :style="{backgroundImage:'url(' + user.avatar + ')'}"></div>
            <p class="ic_name colorff font34 ellipsis_1 inline-block">{{user.name}}</p>
            <span class="ic_diamond">{{user.rank_name}}VIP</span>
          </div>
          <p class="ic_text">成为VIP，拥有尊享特权</p>
          <div class="icon_vip">
            <img class="icon_diamond" v-if="user.rank_id > 0" src="http://images.ufutx.com/201904/08/766edb1da9aacbc963c9dde4d669e123.png" alt="">
            <img class="icon_noOpen" v-else src="http://images.ufutx.com/201904/08/e4ff9dc96711210dcde89f13d63ccee8.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="ic_vip">
        <div class="box_vip" v-for="item,index in tabs">
          <p class="cityLevel" :class="{active: tabIndex == item.id}" @click="tabItem(item.type, item.id)">{{item.name}}</p>
        </div>
      </div>
      <hr class="hr"/>
      <div class="ic_privilege">
        <p class="privilege font26">会员特权</p>
      </div>
      <div class="box_privilege">
        <div class="privilege_introduce">
          <div class="membership">
            <img class="icon_membership" src="http://images.ufutx.com/201904/08/31dc43f80f5272ca4d9547e6efe8662a.png" alt="">
            <p class="font26">会员资料</p>
            <p class="font22 colorbe">可看全球</p>
          </div>
          <div class="addFriends">
            <img class="icon_addFriends" src="http://images.ufutx.com/201904/08/0d580cca7df95b754ab20dc7af162c33.png" alt="">
            <p class="font26">添加好友</p>
            <p class="font22 colorbe">可加40位</p>
          </div>
          <div class="exchangePrivilege">
            <img class="icon_exchangePrivilege" src="http://images.ufutx.com/201904/08/20d6f3b39bceb819b4326e4bd212b788.png" alt="">
            <p class="font26">交流特权</p>
            <p class="font22 colorbe">了解彼此</p>
          </div>
        </div>
      </div>
      <div class="explain">
        <p class="ic_explain font26">
          说明：<br>
          <span v-for="item in rank.explain">
          · {{item}}<br>
          </span>
        </p>
      </div>
      <div class="dist"></div>
      <div class="box_bottom" v-if="rank.sub_ranks.length > 1">
        <p class="month" @click="conversion(rank.sub_ranks[0].id)">
          <span class="ic_month">￥{{rank.sub_ranks[0].month_price}}/年</span>
          <span class="original">原价￥{{rank.sub_ranks[0].price}}</span>
        </p>
        <p class="year" @click="conversion(rank.sub_ranks[1].id)">
          <span class="ic_year">￥{{rank.sub_ranks[1].month_price}}/月</span>
          <span class="original">原价￥{{rank.sub_ranks[1].price}}</span>
        </p>
      </div>
      <div class="box_bottom" v-else>
        <p class="year" style="width: 100%;" @click="conversion(rank.sub_ranks[0].id)">
          <span class="ic_month">￥{{rank.sub_ranks[0].month_price}}/年</span>
          <span class="original">原价￥{{rank.sub_ranks[0].price}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'upgrade',
  data () {
    return {
      tabs: [
        {name: '市级VIP', id: 0, type: '市级'},
        {name: '黄金VIP', id: 1, type: '黄金'},
        {name: '钻石VIP', id: 2, type: '钻石'}
      ],
      tabIndex: 0,
      type: '市级',
      paas: localStorage.getItem('paas'),
      user: {},
      rank: {},
      score: {}
    }
  },
  methods: {
    tabItem (type, index) {
      this.type = type
      this.tabIndex = index
      this.getOrderList()
    },
    conversion(id) {
      let data = {
        sub_rank_id: id
      }
      this.$http.post(`/official/member/recharge`, data).then(({data}) => {
        if (data.wx_pay.mweb_url) {
          // window.location.href = data.wx_pay.mweb_url + '?redirect_url=' + window.location.href
          window.location.href = data.wx_pay.mweb_url
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    getOrderList () {
      this.$http.get(`/official/ranks?paas=${this.paas}&name=${this.type}`).then(({data}) => {
        this.user = data.user
        this.rank = data.rank
        this.score = data.score
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

<style scoped>
  .upgrade{
    width: 100vw;
    height: 100vh;
    background-color: #f7f7f7;
  }
  .diamondPicture{
    width: 100vw;
    height: 190px;
  }
  .box_card{
    width: 100vw;
    text-align: center;
  }
  .card{
    width: 328px;
    height: 178px;
    margin-top: -138px
  }
  .icon_diamond,.icon_noOpen{
    width: 30px;
  }
  .head_portrait{
    width: 100vw;
    text-align: center;
    margin-top: -236px;
  }
  .portrait{
    width: 122px;
    height: 122px;
    border-radius: 50%;
    background-color: #e9e9e9;
    margin: auto;
    position: relative;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .ic_text,.ic_diamond{
    font-size: 18px;
  }
  .ic_name{
    max-width: 140px;
  }
  .portrait_name_diamond{
    margin-bottom: 12px;
  }
  .ic_diamond{
    margin-left: 4px;
    color: #f56a22;
  }
  .ic_text{
    color: #024261;
  }
  .dist{
    height: 130px;
  }
  .icon_vip{
    position: absolute;
    left: 410px;
    top: 90px
  }
  .ic_vip{
    width: 100vw;
    padding-top: 44px;
    text-align: center;
  }
  .box_vip{
    width: 32%;
    display: inline-block;
    text-align: center;
  }
  .cityLevel{
    font-size: 26px;
    display: inline-block;
    font-weight: bold;
    text-align: center;
    padding-bottom: 20px;
  }
  .active{
    color: #f56b25;
    border-bottom: 4px solid #f56b25;
  }
  .hr{
    margin-bottom: 30px;
  }
  .ic_privilege{
    width: 100vw;
    text-align: center;
    position: relative;
  }
  .privilege{
    position: relative;
  }
  .privilege:after, .privilege:before{
    content: "";
    width: 50px;
    height: 2px;
    position: absolute;
    background-color: #cdcdcd;
    top: 14px;
    z-index: 1;
    vertical-align: middle;
  }
  .privilege:after{
    margin-left: 20px;
  }
  .privilege:before{
    margin-left: -70px;
  }
  .box_privilege{
    padding: 0 34px 30px 34px;
  }
  .privilege_introduce{
    margin-top: 20px;
    padding: 60px 0 60px 0;
    border-radius: 12px;
    box-shadow: 0 1px 32px #dedede;
    text-align: center;
  }
  .membership, .addFriends, .exchangePrivilege{
    display: inline-block;
    width: 32%;
    text-align: center;
    line-height: 1.5;
  }
  .icon_membership{
    width: 44px;
  }
  .icon_addFriends{
    width: 53px;
  }
  .icon_exchangePrivilege{
    width: 57px;
  }
  .explain{
    padding: 0px 34px 0px 34px;
  }
  .ic_explain{
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0px 1px 32px #dedede;
    color: #a9a9a9;
    line-height: 1.8;
  }
  .box_bottom{
    width: 100vw;
    height: 105px;
    background-color: #344a5d;
    position: fixed;
    bottom: 0px;
  }
  .month, .year{
    width: 49%;
    font-size: 34px;
    color: #ffffff;
    line-height: 105px;
    position: relative;
    text-align: center;
    display: inline-block;
  }
  .month:after{
    content: '';
    background-color: #ffffff;
    width: 1px;
    position: absolute;
    height: 60px;
    top: 26px;
    z-index: 2;
    right: 0;
  }
  .original{
    font-size: 18px;
    color: #ffffff;
    text-decoration: line-through;
  }
</style>
