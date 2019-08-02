<template>
  <div class="box_background">
    <div class="box_camera_backgruond">
      <p class="title font28 color6">
        <img src="https://images.ufutx.com/201907/26/07a18a2f88d591c94aba05b2ee0b3f43.png" alt="">
        13392878513(陈先生)
      </p>
      <p class="title font28 color6">
        <img src="https://images.ufutx.com/201907/26/07a18a2f88d591c94aba05b2ee0b3f43.png" alt="">
        0755-29061820
      </p>
      <p class="title font28 color6" style="margin-bottom: 16px;">
        <img src="https://images.ufutx.com/201907/26/7bc3884ee53fc5b88872c462361f524a.png" alt="">
        周一至周五9:00-18:00
      </p>
      <div class="split-line"></div>
      <div class="qr">
        <p class="title font28 color6">
          <img src="https://images.ufutx.com/201907/26/5206db75acb853eaee4709c8351ef5e9.png" alt="" >
          客服微信
        </p>
        <img src="http://images.ufutx.com/201908/03/33e32ad141fb64e5e2adb3cac8a5a83b.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import {$toastSuccess, $toastWarn} from '../../config/util'

  export default {
    name: 'feedBack',
    data () {
      return {
        desc: '',
        remnant: 0,
        list: []
      }
    },
    methods: { // 方法
      descInput () {
        this.remnant = this.desc.length
      },
      getData () {
        // let vm = this
        this.$http.get(`https://www.easy-mock.com/mock/5cac036b78c07c41509dde60/example/list_copy_1554777362218`).then(({data}) => {
          // vm.list = data.data.list
        }).catch((error) => {
          console.log(error)
        })
      },
      save () {
        if (!this.desc) {
          return $toastWarn('请输入反馈内容')
        }
        let data = {
          content: this.desc
        }
        this.$http.post(`/official/feedback`, data).then(({data}) => {
          $toastSuccess('感谢你的反馈！')
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    mounted () { // 拉取数据
      this.getData()
    }
  }
</script>

<style scoped lang="less">
  .box_background{
    background: #e6e6e6 !important;
    width: 100%;
    height: 100vh;
    padding-top: 6%;
  }

  .box_camera_backgruond {
    width: 94%;
    border-radius: 22px;
    margin: auto;
    background: white;
    padding-top: 16px;
    .title{
      padding: 12px 22px;
      img{
        width: 42px;
        vertical-align: middle;
        margin-bottom: 6px;
      }
    }
    .qr{
      margin-top: 12px;
      padding: 22px 12px;
      img{
        width: 100%;
        border-radius: 12px;
      }
      .title{
        padding: 12px 12px;
        img{
          width: 42px;
          vertical-align: middle;
          margin-bottom: 6px;
        }
      }
    }
  }
</style>
