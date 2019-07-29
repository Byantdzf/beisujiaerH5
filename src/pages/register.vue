<template>
  <div id="register" class="wrapper text-center font28">
    <div class="center"></div>
    <div style="position: relative;">
      <input type="number" v-model="mobile" class="font30 colorff mobile" placeholder="手机号">
      <img src="http://images.ufutx.com/201907/30/073d127a02a6728c82cf19980d462bd4.png" alt="icon" class="iphone_icon font28">
      <img src="http://images.ufutx.com/201907/30/04adff8af8c5864eb25946059101ef68.png" alt="icon" class="del_icon"
           v-show="mobile" @click="mobile = ''">
<!--      <img src="http://images.ufutx.com/201907/30/389f1ab3438fe981ba8236fc99d4ec3d.png" alt="icon" class="del_icon"-->
<!--           v-show="warn && mobile" style="right: 12px;">-->
    </div>
    <div style="position: relative;">
      <input type="number" v-model="code" class="font30 colorff code" placeholder="验证码" @keyup.enter="register">
      <img src="http://images.ufutx.com/201907/30/f5d1aa278b53064dfd4e527570be6e8a.png" alt="icon" class="iphone_icon code_icon">
      <p class="getCode font28" @click="getCode" v-if="time == 60">{{text}}</p>
      <p class="getCode font28" v-else>{{time}} 秒后重试</p>
    </div>
    <button class="colorff button text-center font28" @click="register">登录</button>
<!--    <p class="font26 protocol">-->
<!--      <span style="color: #9a9a9a;">-->
<!--        点击立即登录默认您同意-->
<!--      </span>-->
<!--      <span style="color: #cadefc;text-decoration:underline;">-->
<!--        <router-link to="protocol" style="color: #cadefc; text-decoration: none;">《福恋注册协议》</router-link>-->
<!--      </span>-->
<!--    </p>-->
  </div>
</template>

<script>
  import {$toastSuccess, $toastWarn} from '../../src/config/util'

  export default {
    name: 'register',
    components: {},
    data () {
      return {
        mobile: '',
        code: '',
        value: '',
        time: 60,
        warn: true,
        text: '获取验证码',
        timer: ''
      }
    },
    watch: {
      time () {
        if (this.time === 0) {
          clearInterval(this.timer)
          this.time = 60
          this.text = '重新发送'
        }
      },
      mobile () {
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.mobile))) {
          this.warn = true
        } else {
          this.warn = false
        }
      }
    },
    methods: {
      getCode () {
        let data = {
          mobile: this.mobile
        }
        this.$http.post('/official/sms/register', data).then(({data}) => {
          $toastSuccess('发送成功')
          this.timer = setInterval(() => {
            this.time--
          }, 1000)
        }).catch((error) => {
          $toastWarn('发送失败！')
          console.log(error)
        })
      },
      register () {
        let data = {
          mobile: this.mobile,
          code: this.code
        }
        if (!this.mobile) {
          return $toastWarn('无手机号码')
        }
        if (!this.code) {
          return $toastWarn('无验证码')
        }
        if (this.warn === true) {
          return $toastWarn('手机号码错误')
        }
        this.$http.post('/official/login/mobile', data).then(({data}) => {
          localStorage.setItem('ACCESS_TOKEN', data.token)
          localStorage.setItem('mobile', data.user.mobile)
          if (data.wechat && data.wechat.official_openid) localStorage.setItem('official_openid', data.wechat.official_openid)
          if (data.user && data.user.type) {
            let userInfo = {
              id: data.user.id,
              name: data.user.name,
              photo: data.user.photo,
              type: data.user.type
            }
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            if (localStorage.getItem('jump')) {
              window.location.href = localStorage.getItem('jump')
            } else {
              this.$router.push({
                name: 'home'
              })
            }
          } else {
            this.$router.push({
              name: 'personalData'
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    mounted () {
      console.log(this.$store.state.route)
      console.log(this.$wechat)
    }
  }
</script>

<style lang="less" scoped>
  body {
    .wrapper {
      width: 100vw;
      height: 100vh;
      background: #1a1a1a;
      background-size: cover;
      background-repeat: no-repeat;
      background-position-x: center;
      background-image: url('https://images.ufutx.com/201903/27/eab72e299990c7264ed4385556e471b6.jpeg');
      background: #559fcd;

      input {
        width: 400px;
        height: 80px;
        background: none;
        border: none;
        border-bottom: 1px solid white;
        border-radius: 4px;
        margin-top: 60px;
        &::placeholder{
          color: white;
        }
      }

      .center {
        padding-top: 340px;
      }

      .mobile {
        padding: 0 50px 0 76px;
      }

      .getCode {
        min-width: 124px;
        color: white;
        position: relative;
        position: absolute;
        right: 140px;
        top: 80px;

        &:before {
          content: '';
          background: white;
          width: 2px;
          height: 52px;
          position: absolute;
          left: -52px;
          top: -4px;
        }
      }

      .iphone_icon {
        width: 52px;
        position: absolute;
        left: 120px;
        top: 72px;
      }
      .code_icon{
        left: 126px;
        width: 38px;
        top: 78px;
      }

      .del_icon {
        width: 30px;
        position: absolute;
        right: 120px;
        top: 82px;
      }

      .code {
        width: 210px;
        padding: 0 242px 0 76px;
      }

      .button {
        padding: 16px 58px;
        background: none;
        border: none;
        border: 1px solid white;
        border-radius: 10px;
        margin-top: 80px;
      }
    }

    .protocol {
      margin-top: 30px;
      letter-spacing: 1px;
    }
  }
</style>
