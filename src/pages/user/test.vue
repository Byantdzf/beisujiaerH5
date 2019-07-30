<template>
  <div>
    <img src="https://images.ufutx.com/201907/30/ee31d8a1aa3ddf39a58b36d07149009c.jpeg" alt="" width="100%">
    <div class="main-upload ff">
      <div class="img flo_l" v-bind:style="{backgroundImage:'url(' + img_url + ')'}">
        <input type="file" id="file" @change="tirggerFile($event)">
        <div id="result"></div>
      </div>
      <div class="main-model flo_l"
           v-if="progress !== '100%' && img_url!=='https://images.ufutx.com/201907/30/0b17fa29cd56b3cbc4eeaf0293b4adbb.png'">
          <div class="model text-center" >{{progress}}</div>
          <div class="model2" ></div>
          <div class="model3" ></div>
      </div>
      <div class="main-btn flo_l font26 text-center">
        上传图片
        <input type="file" id="file" @change="tirggerFile($event)">
      </div>
      <div class="main-bc" @click="bc_click">
        <img src="https://images.ufutx.com/201907/30/766ceeba0284679aceff75bc81011fec.png"
             :class="image_amin?'image_amin':''" alt="" width="100%">
      </div>
    </div>
    <div class="main-colorList" v-if="colorList.length > 0">
      <div class="item-title font26 color6">为了更加准确的检测，请选择最接近图片的色块!</div>
      <div class="text-center item-box">
        <div v-for="item,index in colorList" :key="index" class="flo_l color-box">
          <div class="item-color"  v-bind:style="{background: item['#']}"></div>
        </div>
      </div>
    </div>
    <moadlUp  :show.sync="showUpload" @hideModal="hideUpload">
    </moadlUp>
  </div>
</template>

<script>
  import {$toastWarn, $toastSuccess, $loadingShow, $loadingHide} from '../../config/util'
  import moadlUp from '../../components/moadlUp'

  export default {
    data() {
      return {
        img_url: 'https://images.ufutx.com/201907/30/0b17fa29cd56b3cbc4eeaf0293b4adbb.png',
        loading: false,
        showUpload: false,
        ossConfig: {},
        host: '',
        image_amin: true,
        file: {},
        colorList: [],
        progress: '0%'
      }
    },
    components: {
      moadlUp
    },
    watch: {
      progress(val) {
        console.log(val)
        // $loadingShow('this.progress')
        if (val === '100%') {
          $loadingHide()
        }
      },
      colorList(val) {
        console.log(val)
      }
    },
    methods: { // 方法
      bc_click () {
        this.image_amin = true
        setTimeout(() => {
          this.image_amin = false
        }, 3000)
        // if (this.image_amin) {
        //   this.image_amin = false
        //   return
        // }
      },
      hideUpload() {
        this.showUpload = value
      },
      post(file) { // 上传
        this.loading = true
        var self = this
        var formData = new FormData()
        console.log(this.$md5(self.file.name))
        var fileName = this.$md5(self.file.name) + '.' + self.file.type.split('/').pop().toLowerCase()
        var filePath = self.host + '/' + self.ossConfig.dir + fileName
        formData.append('name', self.ossConfig.dir + fileName)
        formData.append('key', self.ossConfig.dir + fileName)
        formData.append('policy', self.ossConfig.policy)
        formData.append('OSSAccessKeyId', self.ossConfig.accessid)
        formData.append('success_action_status', '200')
        formData.append('signature', self.ossConfig.signature)
        formData.append('file', self.file)
        formData.append('filename', self.file.name)
        console.log(formData.entries().next())
        this.$http.post(this.host, formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(({data}) => {
          console.log(filePath)
          self.img_url = filePath
          // setTimeout(() => {
          //   $loadingHide()
          // }, 100)
        }).catch((error) => {
        })
      },
      getSignature() { // 获取上传签证
        this.$http.get('/upload/signature').then(({data}) => {
          this.ossConfig = data
          this.host = data.host
        }).catch((error) => {
          console.log(error)
        })
      },
      tirggerFile(event) {
        if (!event.target.files[0]) {
          return
        }
        // $loadingShow('系统正在识别...')
        let file = event.target.files[0]
        this.file = event.target.files[0]
        let vm = this
        let fr = new FileReader()
        fr.readAsDataURL(file)
        fr.onload = function () {
          result.innerHTML = '<img src="' + this.result + '" alt="" id="img" width="100%"  style="display: none"/>'
          setTimeout(() => {
            vm.getImg()
          },500)
        }
      },
      getImgColorFn(img) {
        let vm = this
        function getImgColor(img) {
          this.canvas = document.createElement('canvas')
          this.canvas.width = img.width
          this.canvas.height = img.height
          this.cvs = this.canvas.getContext('2d')
          this.cvs.drawImage(img, 0, 0)
          this.accuracy = 4
        }

        getImgColor.prototype.getColorXY = function (x, y) {
          let obj = this.cvs.getImageData(x, y, 1, 1)
          let arr = obj.data.toString().split(',')
          let first = parseInt(arr[0]).toString(16)
          first = first.length === 2 ? first : first + first
          let second = parseInt(arr[1]).toString(16)
          second = second.length === 2 ? second : second + second
          let third = parseInt(arr[2]).toString(16)
          third = third.length === 2 ? third : third + third
          let last = parseInt(arr.pop()) / 255
          last = last.toFixed(0)
          let color = {}
          color['rgba'] = 'rgba(' + arr.join(',') + ',' + last + ')'
          color['#'] = '#' + first + second + third
          return color
        }
        getImgColor.prototype.getColors = function () {
          return (new Promise((resolve, reject) => {
            let arr = []
            let getY = (i) => {
              for (let j = 0; j < this.canvas.height; j++) {
                let obj = {}
                obj = this.getColorXY(i, j)
                obj.index = 1
                let is = true
                arr.forEach((item) => {
                  if (item['#'] === obj['#']) {
                    is = false
                    item.index += 1
                  }
                  let l = []
                  for (let i = 0; i < obj['#'].length; i++) {
                    if (item['#'].indexOf(obj['#'][i]) > -1) {
                      l.push('1')
                    }
                  }
                  let acc = (this.accuracy > 7) ? 7 : this.accuracy
                  acc = (this.accuracy < 1) ? 2 : this.accuracy
                  if (l.length > acc) {
                    is = false
                    item.index += 1
                  }
                })
                if (is) {
                  if (obj['#'] !== '#000000') {
                    arr.push(obj)
                  }
                }
              }
            }
            let getX = (i) => {
              if (i < this.canvas.width) {
                getY(i)
                vm.progress = (i / this.canvas.width * 100).toFixed(2) + '%'
                setTimeout(() => {
                  getX(++i)
                }, 10)
              } else {
                vm.progress = '100%'
                resolve(arr.sort(function (a, b) {
                  return a.index < b.index ? 1 : (a.index > b.index ? -1 : 0)
                }))
              }
            }
            getX(0)
          }))
        }
        let a = new getImgColor(img)
        a.getColors().then((arr) => {
          this.colorList = arr.slice(0, 10)
        })
      },
      getImg() {
        this.post()
        let img = document.querySelector('#img')
        this.getImgColorFn(img)
      }
    },
    mounted() { // 拉取数据
      this.getSignature()
    }
  }
</script>

<style scoped lang="less">
  .main-colorList{
    width: 100vw;
    margin: auto;
    box-shadow: 1px 1px 12px #d3d3d3;
    margin-top: 22px;
    animation: opacityV2 800ms linear;
    animation-fill-mode: forwards;
    @keyframes opacityV2 {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    .item-title{
      padding: 22px 32px;
      border-bottom: 1px solid #eaeaea;
    }
    .item-box{
      padding: 22px;
      overflow: hidden;
      .color-box{
        width: 100%/5;
        margin-top: 16px;
        .item-color{
          width: 100px;
          height: 100px;
          border-radius: 6px;
          border: 1px solid #b0b0b0;
          display: inline-block;
        }
      }
    }
  }
  .main-upload{
    width: 92vw;
    height: 52vw;
    /*background: pink;*/
    margin: auto;
    margin-top: -44vw;
    box-shadow: 1px 1px 12px #d3d3d3;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    animation: myMove 800ms linear;
    animation-fill-mode: forwards;
    @keyframes myMove {
      0% {
        margin-top: -44vw;
      }
      100% {
        margin-top: 4vw;
      }
    }
    .main-bc{
      width: 80px;
      position: absolute;
      right: 32px;
      bottom: 12px;
    }
    .main-btn{
      width: 120px;
      height: 50px;
      line-height: 50px;
      background: palegreen;
      position: relative;
      margin-top: 32px;
      margin-left: 16px;
      border-radius: 6px;
      color: white;
      opacity: 0;
      padding: 0 12px;
      background-image: linear-gradient(120deg, #6fbde1 0%, #2e95c0 100%);
      animation: opacityMove 1200ms linear;
      animation-fill-mode: forwards;
      animation-delay: 1800ms;
      @keyframes opacityMove {
        0% {
          opacity: 0;
          /*height: 0px;*/
        }
        100% {
          opacity: 1;
        }
      }
    }
    #file{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
    .main-model{
      width: 40%;
      height: 94%;
      position: relative;
      margin: 2%;
      margin-left: -39vw;
      border: 1px solid #d3d3d3;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
    .img{
      width: 40%;
      height: 92%;
      position: relative;
      margin: 2%;
      margin-left: -38vw;
      border: 1px solid #d3d3d3;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      animation: leftMove 800ms linear;
      animation-fill-mode: forwards;
      animation-delay: 800ms;
      @keyframes leftMove {
        0% {
          margin-left: -38vw;
        }
        100% {
          margin-left: 2%;
        }
      }
    }
    .model{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: white;
      line-height: 50vw;
      background-size: contain;
      background-position: center;
      background: rgba(0,0,0,.4);
      background: linear-gradient(#3dba2e, #3dba2e) left top,
      linear-gradient(#3dba2e, #3dba2e) left top,
      linear-gradient(#3dba2e, #3dba2e) right top,
      linear-gradient(#3dba2e, #3dba2e) right top,
      linear-gradient(#3dba2e, #3dba2e) left bottom,
      linear-gradient(#3dba2e, #3dba2e) left bottom,
      linear-gradient(#3dba2e, #3dba2e) right bottom,
      linear-gradient(#3dba2e, #3dba2e) right bottom;
      background-repeat: no-repeat;
      background-size: 4px 24px, 24px 4px;
      z-index: 2;
    }
    .model2{
      width: 88%;
      height: 1%;
      position: absolute;
      top: 0;
      left: 6%;
      z-index: 2;
      background: #b3f182;
      border-radius: 12px;
      animation: myModel 2800ms infinite linear;
      animation-fill-mode: forwards;
      @keyframes myModel {
        0% {
          top: 0;
        }
        50% {
          top: 98%;
        }
        100% {
          top: 0%;
        }
      }
    }
    .model3{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: white;
      line-height: 50vw;
      z-index: 1;
      background-size: contain;
      background-position: center;
      background: rgba(0,0,0,.4);
      background-repeat: no-repeat;
    }
    .image_amin {
      animation: shake-slow 3000ms 2 linear;
      animation-fill-mode: forwards;
      /*animation-delay: 800ms;*/
      @-webkit-keyframes shake-slow {
        0% {
          -webkit-transform: translate(0px, 0px) rotate(0deg);
        }

        6% {
          -webkit-transform: translate(-1px, 6px) rotate(-0.5deg);
        }

        12% {
          -webkit-transform: translate(-1px, 8px) rotate(2.5deg);
        }

        18% {
          -webkit-transform: translate(-6px, -10px) rotate(-0.5deg);
        }

        24% {
          -webkit-transform: translate(-5px, -4px) rotate(1.5deg);
        }

        30% {
          -webkit-transform: translate(-4px, 8px) rotate(1.5deg);
        }

        36% {
          -webkit-transform: translate(1px, -6px) rotate(-2.5deg);
        }

        42% {
          -webkit-transform: translate(4px, 4px) rotate(-0.5deg);
        }

        48% {
          -webkit-transform: translate(6px, -8px) rotate(-0.5deg);
        }

        54% {
          -webkit-transform: translate(9px, -3px) rotate(2.5deg);
        }
        60% {
          -webkit-transform: translate(-1px, -5px) rotate(2.5deg);
        }
      }
    }
  }
</style>
