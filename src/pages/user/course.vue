<template>
  <div class="box_background">
    <div class="box_camera_backgruond">
        <img src="https://images.ufutx.com/201907/26/929d495f7c43d72256f9b5bc29da5c5a.png" alt="">
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
    img{
      width: 100%;
    }
  }
</style>
