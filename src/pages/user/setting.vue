<template>
  <div id="user">
    <!--<div class="wrapper_user ff">-->
      <!--<div class="avatar flo_l backCover" @touchstart="showDeleteButton()" @touchend="clearLoop()" @click="routeToDetail('PreviewData')"  :style="{backgroundImage:'url(' + user.photo + ')'}"></div>-->
      <!--<div class="name inline-block">-->
        <!--<span class="font36 bold">{{user.name}}</span><br/>-->
        <!--<span class="font26">-->
          <!--<img width="16" style="display:inline-block;margin-bottom: 4px;"  class="middle" src="https://images.ufutx.com/201904/15/45bfd2a6b4f2dd8bb227f6bafd8ca836.png">-->
          <!--{{user.rank_name}}-->
        <!--</span>-->
      <!--</div>-->
      <!--<div class="editData flo_r font26" @click="routeToDetail('PreviewData')">编辑资料</div>-->
      <!--<div class="news"  @click="routeToDetail('news')">-->
        <!--<img src="https://images.ufutx.com/201901/04/8fa5e8921c0dca549a1302af42c743c2.png"  class="flo_r"/>-->
        <!--<p class="inline-block dist" v-if="notice_num > 0"></p>-->
      <!--</div>-->
      <!--<div class="clearfloat"></div>-->
      <!--<ul class="mutual text-center">-->
        <!--<li class="after"><p class="bold color6" @click="routeToDetail('myFriend', 'fans')">{{user.fans_count}}</p>喜欢我</li>-->
        <!--<li class="after"><p class="bold color6" @click="routeToDetail('myFriend', 'attention')">{{user.follow_count}}</p>我喜欢</li>-->
        <!--<li><p class="bold color6" @click="routeToDetail('myFriend', 'friend')">{{user.friend_count}}</p>好友</li>-->
      <!--</ul>-->
    <!--</div>-->
    <div @click="showDeleteButton">
      <group title=" " >
        <cell title="清除缓存" is-link>
          <!--<badge text="1"></badge>-->
          <img slot="icon" width="20" class="item_icon" src="https://images.ufutx.com/201904/27/3473f59ee31a1fc8f3696639dcb2ae32.png">
          <span class="be" v-if="user.rank_deadline"></span>
        </cell>
      </group>
    </div>
    <!--<div @click="routeToDetail('feedback')">-->
      <!--<group title=" ">-->
        <!--<cell title="意见反馈" is-link>-->
          <!--&lt;!&ndash;<badge text="1"></badge>&ndash;&gt;-->
          <!--<img slot="icon" width="20" class="item_icon" src="https://images.ufutx.com/201904/02/6b86b27ecd45bf9bdea13beff075b60f.png">-->
        <!--</cell>-->
      <!--</group>-->
    <!--</div>-->
    <!--{{count}}-->
    <div class="text-center">
      <div @click="onClick" class="outLogin color6 inline-block font32">退出登录</div>
    </div>
  </div>
</template>

<script>
  import {Group, Cell, XHeader, XInput, Badge} from 'vux'

  export default {
    name: 'user',
    components: {
      Group,
      Cell,
      XHeader,
      XInput,
      Badge
    },
    computed: {
      count () {
        return this.$store.state.count
      }
    },
    data () {
      return {
        user: {
          photo: 'https://images.ufutx.com/201904/15/6099fa31d31f5aa1f2c92986f45d3cfa.gif'
        },
        notice_num: '',
        removeCache: ''
      }
    },
    methods: {
      routeToDetail (name, type) {
        if (localStorage.getItem('official_openid') || this.$isWeiXin() === false) {
          if (type) {
            this.$router.push({name: name, params: {type: type}})
          } else {
            this.$router.push({name: name})
          }
        } else {
          if (name === 'upgrade') {
            window.location.href = 'https://love.ufutx.com/wx/bind?mobile=' + localStorage.getItem('mobile') + '&type=rank'
          } else if (name === 'authentication') {
            window.location.href = 'https://love.ufutx.com/wx/bind?mobile=' + localStorage.getItem('mobile') + '&type=approve'
          } else {
            this.$router.push({name: name, params: {type: type}})
          }
        }
      },
      getMessageNum () {
        this.$http.get(`/official/notice/num`).then(({data}) => {
          localStorage.setItem('chat_num', data.chat_message_num.toString())
          localStorage.setItem('notice_num', data.notice_num.toString())
          this.notice_num = data.notice_num.toString()
        })
      },
      getUser () {
        this.$http.get(`/official/mine`).then(({data}) => {
          this.user = data
          this.getMessageNum()
        }).catch((error) => {
          console.log(error)
        })
      },
      showDeleteButton (e) {
        // clearTimeout(this.removeCache) // 再次清空定时器，防止重复注册定时器
        // this.removeCache = setTimeout(function () {
        this.$vux.confirm.show({
          title: '提示',
          content: '是否清除缓存？',
          dialogTransition: 'vux-fade',
          onCancel: () => {
          },
          onConfirm: () => {
            let url = location.href
            localStorage.clear()
            this.$href(url)
          }
        })
        // }.bind(this), 1000)
      },
      clearLoop (e) {
        clearTimeout(this.removeCache)
      },
      onClick () {
        let vm = this
        vm.$vux.confirm.show({
          // 组件除show外的属性
          title: '提示',
          content: '是否退出登录?',
          dialogTransition: 'vux-fade',

          onCancel () {
            console.log('取消')
          },
          onConfirm () {
            localStorage.clear()
            vm.$router.push({
              name: 'register'
            })
          }
        })
      }
    },
    mounted () {
      // this.getUser()
      this.$isWeiXin()
    }
  }
</script>

<style  lang="less">
  body{
    background: #f7f7f7 !important;
  }
  .wrapper_user{
    padding: 20px;
    .avatar{
      width: 130px;
      height: 130px;
      border-radius: 50%;
      background-size: cover;
      margin-right: 25px;
      box-shadow: 1px 1px 12px #d3d3d3;
    }
    .name{
      margin-top: 22px;
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
    .maTop16{margin-top: 16px}
    .editData{
      padding: 8px 20px;
      border-radius: 32px;
      color: #35495e;
      border: 1px solid #35495e;
    }
    .news{
      margin-top: -26px;
      position: relative;
      img{
        width: 56px;
        height: 56px;
        margin: 0 12px;
      }
      .dist{
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: red;
        position: absolute;
        right: 8px;
        top: 0;
      }
    }
  }
  .outLogin{
    /*box-shadow: 1px 1px 12px #c9c9c9;*/
    /*border-radius: 12px;*/
    margin: 36px auto;
    /*letter-spacing: 2px;*/
    width: 100%;
    padding: 26px 0;
    background: white;
    /*background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);*/
    /*background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);*/
  }
  .vux-label,.weui-cell__ft{
    font-size: 4vw;
  }

  .item_icon {
    display:block;
    margin-right: 20px;
  }
</style>
