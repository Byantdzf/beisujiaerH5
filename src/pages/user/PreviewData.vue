<template>
  <div class="whole">
    <div class="background">
      <img class="diamond" src="http://images.ufutx.com/201904/03/0c266b91baffd71e415fbba91c13c468.png" alt="">
      <div class="picture" v-bind:style="{backgroundImage:'url(' + user.photo + ')'}"></div>
      <p class="text">点击头像上传形象照</p>
      <div class="camera_perfect">
        <router-link :to="{name: 'uploadImage'}">
          <div class="perfect inline-block" v-for="item in list"  v-bind:style="{backgroundImage:'url(' + item + ')'}"></div>
        </router-link>
      </div>
    </div>
    <div class="notHave"></div>
    <div class="compile">
      <div class="basic_data">基本资料</div>
      <div class="go_compile" @click="routeToDetail">去编辑</div>
    </div>
    <div class="not_have"></div>
    <div class="box_bottom" @click="goUser">返回</div>
  </div>
</template>
<script>
  export default {
    name: 'PreviewData',
    data () {
      return {
        user: {},
        list: [
          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2615432236,482279142&fm=27&gp=0.jpg',
          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2615432236,482279142&fm=27&gp=0.jpg',
          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2615432236,482279142&fm=27&gp=0.jpg',
          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2615432236,482279142&fm=27&gp=0.jpg',
          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2615432236,482279142&fm=27&gp=0.jpg',
          'http://images.ufutx.com/201904/03/aa9d1353dda982cc12441192d67a0948.png'
        ]
      }
    },
    methods: {
      goUser () {
        this.$router.push({name: 'user'})
      },
      routeToDetail () {
        if (this.user.type === 'single') {
          this.$router.push({name: 'singleData'})
        } else {
          this.$router.push({name: 'marriageData'})
        }
      },
      getUser () {
        let paas = localStorage.getItem('paas')
        this.$http.get(`/official/mine?paas=${paas}`).then(({data}) => {
          this.user = data
          console.log(data)
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    mounted () {
      this.getUser()
    }
  }
</script>

<style scoped>
  .whole{
    height: 100vh;
    background-color: #f0f3f5;
  }
  .background{
    background-color: #ffffff;
  }
  .diamond{
    width: 750px;
    height: 200px;
  }
  .picture{
    width: 176px;
    height: 176px;
    margin: -88px auto 35px;
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: 1px 1px 12px #d3d3d3;
    border-radius: 50%;
  }
  .text{
    width: 100%;
    font-size: 30px;
    text-align: center;
    color: #bebebe;
    padding-bottom: 40px;
    background-color: #ffffff;
  }
  .camera{
    width: 215px;
    height: 215px;
  }
  .camera_perfect{
    width: 706px;
    height: 470px;
    padding: 0px 25px 35px 25px;
    background-color: #ffffff;
  }
  .perfect{
    width: 222px;
    height: 222px;
    margin: 0 12px 12px 0;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .notHave{
    width: 100%;
    height: 20px;
    background-color: #f8f8f8;
  }
  .compile{
    width: 100%;
    height: 100px;
    background-color: #ffffff;
  }
  .basic_data{
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 30px;
    display: inline-block;
    margin-left: 40px;
    letter-spacing: 1px;
  }
  .go_compile{
    width: 140px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 26px;
    border: 1px solid #344a5d;
    border-radius: 30px;
    display: inline-block;
    margin-left: 390px;
  }
  .box_bottom{
    width: 100%;
    height: 104px;
    font-size: 34px;
    line-height: 104px;
    text-align: center;
    color: #ffffff;
    letter-spacing: 2px;
    position: fixed;
    bottom: 0;
    background-color: #35495e;
  }
</style>
