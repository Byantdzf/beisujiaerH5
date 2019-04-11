<template>
  <div class="whole">
    <div class="background">
      <div class="camera_perfect">
        <div class="perfect inline-block previewer-demo-img" v-for="(item, index) in list"  v-bind:style="{backgroundImage:'url(' + item.src + ')'}" @click="show(index)"></div>
      </div>
    </div>
    <vux-upload
      url="http://love.hankin.ufutx.cn/api/official/uploads"
      :headers="headers"
      :images="images"
      :readonly="false"
      :max="2"
      :withCredentials="false"
      :span="4"
      :preview="true"
      @success="onSuccess"
      @error="onError"
      @remove="onRemove"
    >
    </vux-upload>
    <upload :uploadType="`head`" :imgWidth="`85px`" :imgHeight="`104px`" :imgUrl="list"
            @upload="getImgUrl"></upload>
    <div class="not_have"></div>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
    </div>
    <div class="box_bottom" @click="goUser">完成</div>
  </div>
</template>
<script>
  import { Previewer, TransferDom } from 'vux'
  import {$toastWarn} from '../../config/util'
  import upload from '../../components/upload'
  import VuxUpload from 'vux-upload'
  import axios from 'axios'

  export default {
    name: 'PreviewData',
    directives: {
      TransferDom
    },
    components: {
      Previewer,
      VuxUpload,
      upload
    },
    data () {
      return {
        paas: localStorage.getItem('paas'),
        list: [],
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
        },
        images: [],
        imgData: [],
        ossConfig: {},
        host: '',
        options: {
          getThumbBoundsFn (index) {
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        }
      }
    },
    methods: {
      onSuccess (res, file) {
        alert('成功')
      },
      onError (res, file) {
        console.log(file)
        this.file = file
        let self = this
        var formData = new FormData()
        var fileName = self.file.name + '.' + self.file.type.split('/').pop().toLowerCase()
        var filePath = self.host + '/' + self.ossConfig.dir + fileName
        formData.append('name', self.ossConfig.dir + fileName)
        formData.append('key', self.ossConfig.dir + fileName)
        formData.append('policy', self.ossConfig.policy)
        formData.append('OSSAccessKeyId', self.ossConfig.accessid)
        formData.append('success_action_status', '200')
        formData.append('signature', self.ossConfig.signature)
        formData.append('file', self.file)
        formData.append('filename', self.file.name)
        console.log(formData)
        console.log(axios)
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        axios.post(this.ossConfig.host, formData, config).then(({data}) => {
          console.log(data)
        }).catch((error) => {
          console.log(error)
          $toastWarn('失败++')
        })
        console.log(filePath)
      },
      onRemove (res, file) {
        console.log('删除')
      },
      getImgUrl (data) {
        debugger
        // data  得到的就是返回的图片路径的相关参数
      },
      logIndexChange (arg) {
        console.log(arg)
      },
      show (index) {
        this.$refs.previewer.show(index)
        if (index === this.list.length - 1) {
          this.$router.push({name: 'uploadImage'})
        }
      },
      goUser () {
        this.$router.push({name: 'user'})
      },
      getSignature () { // 获取上传签证
        this.$http.get('/upload/signature').then(({data}) => {
          this.ossConfig = data
          this.host = data.host
        }).catch((error) => {
          console.log(error)
        })
      },
      getUser () {
        this.$http.get(`/official/users/profile/photos?paas=${this.paas}`).then(({data}) => {
          this.list = data.map((item) => {
            return {
              src: item.photo
            }
          })
          this.list.push({src: 'http://images.ufutx.com/201904/03/aa9d1353dda982cc12441192d67a0948.png'})
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    mounted () {
      this.getUser()
      this.getSignature()
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
    padding: 35px 25px 35px 25px;
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
