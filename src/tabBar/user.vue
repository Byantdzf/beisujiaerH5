<template>
  <div id="user">
    <div class="wrapper ff">
      <div class="avatar flo_l" @click="routeToDetail('PreviewData')"  :style="{backgroundImage:'url(' + user.photo + ')'}"></div>
      <div class="name inline-block">
        <span class="font36 bold">{{user.name}}</span><br/>
        <span class="font26">
          <img width="16" style="display:inline-block;margin-bottom: 2px;"  class="middle" src="http://images.ufutx.com/201904/02/6e9d7b41f9ff9ec9588d0a7f910deb02.png">
          {{user.rank_name}}
        </span>
      </div>
      <div class="editData flo_r font26" @click="routeToDetail('PreviewData')">编辑资料</div>
      <div class="clearfloat"></div>
      <ul class="mutual text-center">
        <li class="after"><p class="bold color6" @click="routeToDetail('myFriend', 'fans')">{{user.fans_count}}</p>喜欢我</li>
        <li class="after"><p class="bold color6" @click="routeToDetail('myFriend', 'attention')">{{user.follow_count}}</p>我喜欢</li>
        <li><p class="bold color6" @click="routeToDetail('myFriend', 'friend')">{{user.friend_count}}</p>好友</li>
      </ul>
    </div>
    <group title=" " >
      <cell title="VIP办理" is-link>
        <!--<badge text="1"></badge>-->
        <img slot="icon" width="20" class="icon" src="http://images.ufutx.com/201904/02/ff09a194b571b1fa88c7516af916b122.png">
        <span class="be">2019-03-22到期</span>
      </cell>
    </group>
    <div  @click="routeToDetail('authentication')">
      <group title=" " >
        <cell title="实名认证" is-link >
          <!--<badge text="1"></badge>-->
          <img slot="icon" width="20" class="icon" src="http://images.ufutx.com/201904/02/22ae44de7e489989752d4091d4e4bada.png">
        </cell>
      </group>
    </div>
    <group title=" ">
      <cell title="意见反馈" is-link>
        <!--<badge text="1"></badge>-->
        <img slot="icon" width="20" class="icon" src="http://images.ufutx.com/201904/02/6b86b27ecd45bf9bdea13beff075b60f.png">
      </cell>
    </group>
    <!--{{count}}-->
    <!--<button @click="onClick">ces</button>-->
  </div>
</template>

<script>
  import { Group, Cell, XHeader, XInput, Badge } from 'vux'

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
        user: {}
      }
    },
    methods: {
      routeToDetail (name, type) {
        if (type) {
          this.$router.push({name: name, params: {type: type}})
        } else {
          this.$router.push({name: name})
        }
      },
      getMessageNum () {
        let paas = localStorage.getItem('paas')
        this.$http.get(`/official/notice/num?paas=${paas}`).then(({data}) => {
          localStorage.setItem('chat_num', data.chat_message_num.toString())
          localStorage.setItem('notice_num', data.notice_num.toString())
        })
      },
      getUser () {
        let paas = localStorage.getItem('paas')
        this.$http.get(`/official/mine?paas=${paas}`).then(({data}) => {
          this.user = data
          this.getMessageNum()
        }).catch((error) => {
          console.log(error)
        })
      },
      onClick () {
        this.$store.dispatch('login')
        this.$store.commit('increment')
      }
    },
    mounted () {
      console.log(this.$store.state.route)
      this.getUser()
    }
  }
</script>

<style  lang="less">
  body{
    background: #f7f7f7 !important;
  }
  .wrapper{
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
  }
  .maTop16{margin-top: 16px}
  .editData{
    padding: 8px 20px;
    border-radius: 32px;
    color: #35495e;
    border: 1px solid #35495e;
  }
  .vux-label,.weui-cell__ft{
    font-size: 4vw;
  }

  .icon {
    display:block;
    margin-right: 20px;
  }
</style>
