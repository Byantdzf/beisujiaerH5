<template>
  <div id="textareaData">
    <div class="bc_header ff">
      <span  @click="back">
        <img src="../../assets/icon/back.png" width="20" alt="icon" class="icon middle">
      {{title}}
      </span>
      <p class="color flo_r" @click="save">保存</p>
    </div>
    <div class="center ff">
      <textarea name="" id="" class="textarea"  v-model="text" placeholder="请输入内容" maxlength="300"></textarea>
      <p class="num flo_r">{{text.length}}/300</p>
      <div class="clearfloat"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'textareaData',
    components: {
    },
    data () {
      return {
        title: '',
        text: ''
      }
    },
    watch: {
    },
    methods: {
      onChange (type, val) {
        console.log('val change', val)
        this[type] = val[0]
      },
      back () {
        window.history.go(-1)
      },
      save (type) {
        window.history.go(-1)
        let data = {
          birthday: this.birthday,
          sex: this.sex === '男' ? 1 : 2,
          name: this.name,
          belief: this.belief,
          type: type,
          photo: 'hasajs',
          paas: this.$store.state.paas
        }
        console.log(data)
        this.$http.put('/official/users/profile', data).then(({data}) => {
          if (data.user && data.user.type) {
            this.$router.push({
              name: 'home'
            })
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
      this.title = this.$route.query.title
    }
  }
</script>

<style  lang="less" scoped>
  #textareaData{
    background-color: #F0F3F5 !important;
    height: 100vh;
    .bc_header{
      padding: 20px 26px 20px 12px;
      margin-bottom: 2px;
    }
    .center{
      padding-top: 20px;
    }
    .icon{
      margin-bottom: 2px;
    }
    .textarea{
      width: 92vw;
      border: none;
      padding: 4vw;
      min-height: 300px;
    }
    .num{
      padding: 20px 38px 40px 0;
    }
  }
</style>
