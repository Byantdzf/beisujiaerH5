<template>
  <div class="avatar">
    <div @mouseover="showBg=true" @mouseleave="showBg=false">
      点击上传
      <!--<div class="bg" v-if="showBg" :style="`line-height:${imgHeight}`">点击上传</div>-->
      <input type="file" class="input-file" :style="`width:${imgWidth};height:${imgHeight};`" name="avatar" ref="avatarInput" @change="changeImage($event)" accept="image/gif,image/jpeg,image/jpg,image/png">
      <img :src="avatar?avatar:'http://images.ufutx.com/201904/03/aa9d1353dda982cc12441192d67a0948.png'" alt="" :style="`width:${imgWidth};height: ${imgHeight};`" name="avatar">
    </div>
    <div class="text" @click="uploadV" v-if="file">确定上传</div>
  </div>
</template>

<script>
  import {$toastWarn, $toastSuccess} from '../config/util'

  export default {
    name: 'upload',
    data () {
      return {
        avatar: '',
        file: '',
        ossConfig: {},
        host: '',
        showBg: false
      }
    },
    props: ['uploadType', 'imgUrl', 'imgWidth', 'imgHeight'],
    created () {
      this.avatar = this.imgUrl.map((item) => {
        return item.src
      })
    },
    methods: {
      changeImage (e) {
        let file = e.target.files[0]
        if (file) {
          this.file = file
          console.log(this.file)
          let reader = new FileReader()
          let that = this
          reader.readAsDataURL(file)
          reader.onload = function (e) {
            // 这里的this 指向reader
            that.avatar = this.result
          }
        }
      },
      uploadV () {
        let files = this.$refs.avatarInput.files
        let data = {}
        console.log(files[0])
        for (let item in files[0]) {
          console.log(item)
          data[item] = files[0][item]
        }
        console.log(data)
        this.$http.post(`/official/uploads`, data).then(({data}) => {
          $toastSuccess('上传成功')
          $toastSuccess(filePath)
        }).catch((error) => {
          $toastWarn(error)
        })
      },
      upload () {
        let files = this.$refs.avatarInput.files
        console.log(files)
        // let fileData = {}
        // if (files instanceof Array) {
        //   fileData = files[0]
        // } else {
        //   fileData = this.file
        // }
        // console.log('fileData', typeof fileData, fileData)
        // let data = new FormData()
        // data.append('multfile', fileData)
        // data.append('operaType', this.uploadType)
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
        // this.$store.dispatch('UPLOAD_HEAD', data)
        //   .then(res => {
        //     console.log(res)
        //     this.file = ''
        //     let data = res.data.data
        //     this.$emit('upload', data)
        //     this.$message({
        //       type: 'success',
        //       message: '上传成功！'
        //     })
        //   }).catch(err => {
        //     console.log(err)
        //     if (err.data.msg) {
        //       this.$message({
        //         type: 'error',
        //         message: err.data.msg
        //       })
        //     } else {
        //       this.$message({
        //         type: 'error',
        //         message: '上传失败'
        //       })
        //     }
        //   })
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
