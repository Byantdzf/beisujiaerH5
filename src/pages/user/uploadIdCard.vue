<template>
  <div class="box">
    <div class="ff">
      <div class="bc_box text-center inline-block">
        <img class="" src="http://images.ufutx.com/201904/01/5a452e852b95786089aaf573a58261b8.png" alt="">
        <p class="font26">手持身份证正面照</p>
      </div>
      <div class="bc_box text-center inline-block">
        <img class="identiyCard" src="http://images.ufutx.com/201904/01/8dc7658b9b3effcd1740b9e9e1d5f315.png" alt="">
        <p class="font26">身份证正面照</p>
      </div>
      <div class="bc_box text-center inline-block">
        <img class="photo_pictures" src="http://images.ufutx.com/201904/01/89de349ae645eab7ea0e64759089400c.png" alt="">
      </div>
    </div>
    <div class="submit" @click="save">点击上传</div>
  </div>
</template>

<script>
  import {$toastSuccess} from '../../config/util'

  export default {
    name: 'uploadIdCard',
    components: {
    },
    data () {
      return {
        name: '',
        card_num: '',
        user: {},
        show: false
      }
    },
    methods: {
      routeTo (name) {
        this.$router.push({name: name})
      },
      save () {
        $toastSuccess('未调试')
        // let data = {
        //   name: this.name,
        //   card_num: this.card_num
        // }
        // console.log(data)
        // this.$http.post(`/official/user/approve`, data).then(({data}) => {
        //   $toastSuccess('认证成功')
        //   this.getUser()
        // }).catch((error) => {
        //   console.log(error)
        //   this.getUser()
        // })
      }
    },
    mounted () {
    }
  }
</script>

<style scoped lang="less">
  .bc_box {
    width: 49%;
    margin-top: 32px;

    img {
      width: 138px;
      height: 220px;
      margin-bottom: 12px;
    }

    .identiyCard {
      width: 257px;
      height: 158px;
    }

    .photo_pictures {
      width: 238px;
      height: 238px;
    }
  }
  .submit{
    height: 105px;
    line-height: 105px;
    text-align: center;
    font-size: 34px;
    color: #fffffd;
    background-color: #344a5d;
    position: fixed;
    bottom: 0;
    width: 100vw;
    letter-spacing: 3px;
  }
</style>
