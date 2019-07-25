<template>
  <div id="user">
    <div class="wrapper_user ff">
      <div class="avatar flo_l backCover" @touchstart="showDeleteButton()" @touchend="clearLoop()"
           @click="routeToDetail('PreviewData')" :style="{backgroundImage:'url(' + user.photo + ')'}"></div>
      <div class="name inline-block">
        <span class="font36 bold">{{user.name}}</span><br/>
      </div>
      <div class="clearfloat"></div>
    </div>
    <div @click="routeToDetail('upgrade')" v-if="user.type === 'single'">
      <group title=" ">
        <cell title="检测记录" is-link>
          <!--<badge text="1"></badge>-->
          <img slot="icon" width="20" class="item_icon"
               src="https://images.ufutx.com/201904/02/ff09a194b571b1fa88c7516af916b122.png">
        </cell>
      </group>
    </div>
    <div @click="routeToDetail('authentication')">
      <group title=" ">
        <cell title="使用教程" is-link>
          <!--<badge text="1"></badge>-->
          <img slot="icon" width="20" class="item_icon"
               src="https://images.ufutx.com/201904/02/22ae44de7e489989752d4091d4e4bada.png">
        </cell>
      </group>
    </div>
    <div @click="routeToDetail('feedback')">
      <group title=" ">
        <cell title="关于我们" is-link>
          <!--<badge text="1"></badge>-->
          <img slot="icon" width="20" class="item_icon"
               src="https://images.ufutx.com/201904/02/6b86b27ecd45bf9bdea13beff075b60f.png">
        </cell>
      </group>
    </div>
    <div @click="routeToDetail('setting')">
      <group title=" ">
        <cell title="退出登录" is-link>
          <!--<badge text="1"></badge>-->
          <img slot="icon" width="20" class="item_icon"
               src="https://images.ufutx.com/201904/27/5c55d4f63e9ddba13c598cbb0c814f8e.png">
        </cell>
      </group>
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
        if (localStorage.getItem('official_openid') && localStorage.getItem('official_openid') !== null) {
          if (type) {
            this.$router.push({name: name, params: {type: type}})
          } else {
            this.$router.push({name: name})
          }
        } else if (this.$isWeiXin() === false) {
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
          if (data && data.official_openid) {
            localStorage.setItem('official_openid', data.official_openid)
          }
          this.getMessageNum()
        }).catch((error) => {
          console.log(error)
        })
      },
      showDeleteButton (e) {
        clearTimeout(this.removeCache) // 再次清空定时器，防止重复注册定时器
        this.removeCache = setTimeout(function () {
          this.$vux.confirm.show({
            title: 'Prompt Message',
            content: '是否清除缓存？',
            dialogTransition: 'vux-fade',
            onCancel: () => {
            },
            onConfirm: () => {
              let url = location.href + '?paas=' + localStorage.getItem('paasName')
              localStorage.clear()
              this.$href(url)
            }
          })
        }.bind(this), 1000)
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
          dialogTransition: 'vux-dialog',
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
      this.getUser()
      this.$isWeiXin()
    }
  }
</script>

<style lang="less">
  body {
    background: #f7f7f7 !important;
  }

  .wrapper_user {
    padding: 40px 20px;

    .avatar {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      background-size: cover;
      margin-right: 25px;
      box-shadow: 1px 1px 12px #d3d3d3;
    }

    .name {
      margin-top: 22px;
      color: #666666;
    }

    .mutual {
      margin-top: 55px;
      color: #848484;

      .after {
        position: relative;

        &:after {
          content: '';
          width: 2px;
          height: 32px;
          background: #848484;
          position: absolute;
          right: 0;
        }
      }

      li {
        padding: 0 80px;
        display: inline-block;
        font-size: 26px;
        text-align: center;

        p {
          font-size: 28px;
          margin-bottom: 12px;
        }
      }
    }

    .maTop16 {
      margin-top: 16px
    }

    .editData {
      padding: 8px 20px;
      border-radius: 32px;
      color: #35495e;
      border: 1px solid #35495e;
    }

    .news {
      margin-top: -26px;
      position: relative;

      img {
        width: 56px;
        height: 56px;
        margin: 0 12px;
      }

      .dist {
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

  /*.outLogin{*/
  /*box-shadow: 1px 1px 12px #c9c9c9;*/
  /*border-radius: 12px;*/
  /*margin: 80px auto;*/
  /*!*letter-spacing: 2px;*!*/
  /*padding: 14px 52px;*/
  /*background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);*/
  /*background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);*/
  /*}*/
  .vux-label, .weui-cell__ft {
    font-size: 4vw;
  }

  .item_icon {
    display: block;
    margin-right: 20px;
  }
</style>
