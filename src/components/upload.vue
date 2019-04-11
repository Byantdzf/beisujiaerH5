<template>
  <!--<div class="avatar">-->
    <!--<div @mouseover="showBg=true" @mouseleave="showBg=false">-->
      <!--点击上传-->
      <!--&lt;!&ndash;<div class="bg" v-if="showBg" :style="`line-height:${imgHeight}`">点击上传</div>&ndash;&gt;-->
      <!--<input type="file" class="input-file" :style="`width:${imgWidth};height:${imgHeight};`" name="avatar" ref="avatarInput" @change="changeImage($event)" accept="image/gif,image/jpeg,image/jpg,image/png">-->
      <!--<img :src="avatar?avatar:'http://images.ufutx.com/201904/03/aa9d1353dda982cc12441192d67a0948.png'" alt="" :style="`width:${imgWidth};height: ${imgHeight};`" name="avatar">-->
    <!--</div>-->
    <!--<div class="text" @click="upload" v-if="file">确定上传</div>-->
  <!--</div>-->
  <vux-upload
    :url="url"
    :headers="headers"
    :images="images"
    :readonly="false"
    :max="9"
    :withCredentials="false"
    :span="4"
    :preview="true"
    @success="onSuccess"
    @error="onError"
    @remove="onRemove"
  >
  </vux-upload>
</template>

<script>
  import {$toastWarn, $toastSuccess} from '../config/util'
  import VuxUpload from 'vux-upload'
  export default {
    name: 'upload',
    data () {
      return {
        avatar: '',
        file: '',
        images: [],
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
          'Content-Type': 'multipart/form-data'
        },
        imgData: [],
        ossConfig: {},
        host: '',
        showBg: false,
        url: process.env.NODE_ENV === 'development' ? 'http://love.hankin.ufutx.cn/api/official/uploads' : 'http://love.ufutx.com/api/official/uploads'
      }
    },
    components: {
      VuxUpload
    },
    props: ['uploadType', 'imgUrl', 'imgWidth', 'imgHeight'],
    methods: {
      onSuccess (res, file) {
        $toastSuccess('上传成功')
        this.$emit('upload', res.data)
      },
      onError (event, file) {
        $toastWarn('上传失败')
        console.log(event)
      },
      onRemove (index) {
        console.log('删除')
      },
      upload () {
        let files = this.$refs.avatarInput.files
        console.log(files)
        var self = this
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
        console.log(filePath)
        this.$http.post(this.host, formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(({data}) => {
          console.log(filePath)
          console.log(data)
          $toastSuccess('上传成功')
          $toastSuccess(filePath)
        }).catch((error) => {
          $toastWarn(error)
        })
      },
      getSignature () { // 获取上传签证
        this.$http.get('/upload/signature').then(({data}) => {
          this.ossConfig = data
          this.host = data.host
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    mounted () {
      this.getSignature()
    }
  }
</script>

<style scoped lang="less">
  .avatar {
    cursor: pointer;
    position: relative;
    .input-file {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      cursor: pointer;
    }
    .bg {
      width: 100%;
      height: 100%;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.3);
      text-align: center;
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
    }
    .text {
      padding-top: 10px;
      color: lightblue;
    }
  }
</style>
