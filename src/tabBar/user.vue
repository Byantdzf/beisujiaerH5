<template>
  <div id="user">
    <div class="wrapper_user ff">
      <div class="avatar flo_l backCover" :style="{backgroundImage:'url(' + user.avatar + ')'}" v-if="user.avatar">
        <uploadOss @onSuccess="onSuccess"></uploadOss>
      </div>
      <div class="avatar flo_l backCover" v-else :style="{backgroundImage:'url(http://www.sucaijishi.com/uploadfile/2016/0203/20160203022635285.png)'}">
        <uploadOss @onSuccess="onSuccess"></uploadOss>
      </div>
      <div class="name inline-block">
        <span class="font36 bold">{{user.name}}</span><br/>
      </div>
      <div class="clearfloat"></div>
    </div>
    <div @click="routeToDetail('record')">
      <group title=" ">
        <cell title="检测记录" is-link>
          <!--<badge text="1"></badge>-->
          <img slot="icon" width="20" class="item_icon"
               src="https://images.ufutx.com/201907/26/4247ca4eb0bb6912dd24966f6ffbf6f8.png">
        </cell>
      </group>
    </div>
    <div @click="routeToDetail('course')">
      <group title=" ">
        <cell title="使用教程" is-link>
          <img slot="icon" width="20" class="item_icon"
               src="https://images.ufutx.com/201907/26/ffe88e7d56e62b1e8c76ca115b1e3273.png">
        </cell>
      </group>
    </div>
    <div @click="routeToDetail('about')">
      <group title=" ">
        <cell title="关于我们" is-link>
          <img slot="icon" width="20" class="item_icon"
               src="https://images.ufutx.com/201907/26/cd88edd1a3bfd416e1e0d0589da353d0.png">
        </cell>
      </group>
    </div>
    <div @click="routeToDetail('service')">
      <group title=" ">
        <cell title="联系客服" is-link>
          <img slot="icon" width="20" class="item_icon"
               src="https://images.ufutx.com/201907/26/de4e05eba61eaa9ec487a1297fece9e6.png">
        </cell>
      </group>
    </div>
    <div @click="routeToDetail('setting')">
      <group title=" ">
        <cell title="设置" is-link>
          <!--<badge text="1"></badge>-->
          <img slot="icon" width="20" class="item_icon"
               src="https://images.ufutx.com/201907/26/65c9e492bbc3ca513c851717578de48f.png">
        </cell>
      </group>
    </div>
  </div>
</template>

<script>
  import {Group, Cell, XHeader, XInput, Badge} from 'vux'
  import UploadOss from '@/components/upload_oss'
  export default {
    name: 'user',
    components: {
      Group,
      Cell,
      XHeader,
      XInput,
      Badge,
      UploadOss
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
      onSuccess (val) {
        this.$http.put(`/user/avatar?avatar=${val}`).then(({data}) => {
          console.log('更新成功')
          this.getUser()
        }).catch((error) => {
          console.log(error)
        })
      },
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
      getUser () {
        this.$http.get(`/user`).then(({data}) => {
          this.user = data
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
      position: relative;
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
