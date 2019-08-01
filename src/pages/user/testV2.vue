<!--<template>-->
  <!--<div>-->
    <!--<input type="file" id="file"  @change="tirggerFile($event)">-->
    <!--<p id="text"></p>-->
    <!--<ul id="ul"></ul>-->
    <!--<img :src="img_url" alt="" width="100%">-->
    <!--<div id="result"></div>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--import {$toastWarn, $toastSuccess, $loadingShow, $loadingHide} from '../../config/util'-->
  <!--let _ths;-->
  <!--let progress = ''-->
  <!--let vm;-->
  <!--new Promise((resolve, reject) => {-->
    <!--vm = {-->
      <!--data () {-->
        <!--return {-->
          <!--img_url: '',-->
          <!--loading: false,-->
          <!--ossConfig: {},-->
          <!--host: '',-->
          <!--file: {},-->
          <!--progress: progress,-->
        <!--}-->
      <!--},-->
      <!--methods: { // 方法-->
        <!--post (file) {-->
          <!--this.loading = true-->
          <!--var self = this-->
          <!--var formData = new FormData()-->
          <!--console.log(this.$md5(self.file.name))-->
          <!--var fileName = this.$md5(self.file.name) + '.' + self.file.type.split('/').pop().toLowerCase()-->
          <!--var filePath = self.host + '/' + self.ossConfig.dir + fileName-->
          <!--formData.append('name', self.ossConfig.dir + fileName)-->
          <!--formData.append('key', self.ossConfig.dir + fileName)-->
          <!--formData.append('policy', self.ossConfig.policy)-->
          <!--formData.append('AWSAccessKeyId', self.ossConfig.accessid)-->
          <!--formData.append('success_action_status', '200')-->
          <!--formData.append('signature', self.ossConfig.signature)-->
          <!--formData.append('file', self.file)-->
          <!--formData.append('filename', self.file.name)-->
          <!--console.log(formData.entries().next())-->
          <!--this.$http.post(this.host, formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(({data}) => {-->
            <!--console.log(filePath)-->
            <!--self.img_url = filePath-->
            <!--setTimeout(() => {-->
              <!--$loadingHide()-->
              <!--// self.getImg()-->
            <!--}, 100)-->
          <!--}).catch((error) => {-->
          <!--})-->
        <!--},-->
        <!--getSignature () { // 获取上传签证-->
          <!--this.$http.get('/upload/signature').then(({data}) => {-->
            <!--this.ossConfig = data-->
            <!--this.host = data.host-->
          <!--}).catch((error) => {-->
            <!--console.log(error)-->
          <!--})-->
        <!--},-->
        <!--tirggerFile (event) {-->
          <!--if (!event.target.files[0]) {-->
            <!--return-->
          <!--}-->
          <!--$loadingShow('系统正在识别...')-->
          <!--// let img = document.querySelector('#img')-->
          <!--let file = event.target.files[0]-->
          <!--this.file = event.target.files[0]-->
          <!--let vm = this-->
          <!--vm.post(file)-->
          <!--let fr = new FileReader()-->
          <!--fr.readAsDataURL(file)-->
          <!--fr.onload = function () {-->
            <!--console.log(vm.img_url)-->
            <!--result.innerHTML = '<img src="' + this.result + '" alt="" id="img" width="100%" class="uploadImage" style="display: none"/>'-->
            <!--setTimeout(() => {-->
              <!--vm.getImg()-->
            <!--})-->
          <!--}-->
        <!--},-->
        <!--getImg () {-->
          <!--/**-->
           <!--* 获取图片，实例化图片-->
           <!--* 执行方法-->
           <!--* 解析完成，获得数组，操作回调函数-->
           <!--*-->
           <!--*/-->
          <!--let img = document.querySelector('#img')-->
          <!--let a = new getImgColor(img)-->
          <!--// 获取 坐标 0 0 点的颜色值-->
          <!--// console.log(a.getColorXY(0, 0))-->
          <!--a.getColors().then((arr) => {-->
            <!--console.log(arr)-->
            <!--let ul = document.querySelector('#ul')-->
            <!--let text = document.querySelector('#text')-->
            <!--text.innerText = '共有' + arr.length + '个颜色'-->
            <!--let str = ''-->
            <!--arr.forEach((obj, index) => {-->
              <!--if (index < 10) {-->
                <!--str += `<li style="background-color:${obj['#']}">${obj['#']} - ${obj['index']}次</li>`-->
              <!--}-->
            <!--})-->
            <!--ul.innerHTML = str-->
          <!--})-->
        <!--}-->
      <!--},-->
      <!--mounted () { // 拉取数据-->
        <!--this.getSignature()-->
        <!--console.log(this.progress)-->
        <!--console.log(this.progress, '////')-->
      <!--}-->
    <!--}-->
  <!--})-->
    <!--.then(() => {-->
    <!--})-->
  <!--export default vm-->
  <!--function getImgColor (img) {-->
    <!--/**-->
     <!--* @ param 传入的图片-->
     <!--* @ this.progress 解析图片的进度 实时-->
     <!--* @ this.canvas canvas元素-->
     <!--* @ this.cvs context对象-->
     <!--* @ this.accuracy Number 解析图片颜色的精确度 1 - 7 数字选择-->
     <!--*-->
     <!--*-->
     <!--* @ anther taoqun <taoquns@foxmail.com>-->
     <!--*/-->
    <!--console.log(img.width)-->
    <!--this.canvas = document.createElement('canvas')-->
    <!--this.canvas.width = img.width >= 200 ? img.width / 2 : img.width-->
    <!--this.canvas.height = img.height >= 200 ? img.height / 2 : img.height-->
    <!--this.cvs = this.canvas.getContext('2d')-->
    <!--this.cvs.drawImage(img, 0, 0)-->
    <!--this.accuracy = 7-->
    <!--this.progress = ''-->
  <!--}-->

  <!--getImgColor.prototype.getColorXY = function (x, y) {-->
    <!--/**-->
     <!--* @param x Number x坐标起点-->
     <!--* @param y Number y坐标起点-->
     <!--* @return color Object 包含颜色的rgba #16进制颜色-->
     <!--*/-->
    <!--let obj = this.cvs.getImageData(x, y, 1, 1)-->
    <!--let arr = obj.data.toString().split(',')-->
    <!--let first = parseInt(arr[0]).toString(16)-->
    <!--first = first.length === 2 ? first : first + first-->
    <!--let second = parseInt(arr[1]).toString(16)-->
    <!--second = second.length === 2 ? second : second + second-->
    <!--let third = parseInt(arr[2]).toString(16)-->
    <!--third = third.length === 2 ? third : third + third-->
    <!--let last = parseInt(arr.pop()) / 255-->
    <!--last = last.toFixed(0)-->
    <!--let color = {}-->
    <!--color['rgba'] = 'rgba(' + arr.join(',') + ',' + last + ')'-->
    <!--color['#'] = '#' + first + second + third-->
    <!--return color-->
  <!--}-->
  <!--getImgColor.prototype.getColors = function () {-->
    <!--/**-->
     <!--* 避免图片过大，阻塞卡死-->
     <!--* 每加载一行像素，延迟20毫秒加载下一行-->
     <!--* return Promise-->
     <!--* promise resolve 解析完成后，返回颜色的总计数组，降序排列-->
     <!--* promise reject none-->
     <!--*/-->
    <!--return (new Promise((resolve, reject) => {-->
      <!--let arr = []-->
      <!--let getY = (i) => {-->
        <!--for (let j = 0; j < this.canvas.height; j++) {-->
          <!--let obj = {}-->
          <!--obj = this.getColorXY(i, j)-->
          <!--obj.index = 1-->
          <!--let is = true-->
          <!--arr.forEach((item) => {-->
            <!--if (item['#'] === obj['#']) {-->
              <!--is = false-->
              <!--item.index += 1-->
            <!--}-->
            <!--let l = []-->
            <!--for (let i = 0; i < obj['#'].length; i++) {-->
              <!--if (item['#'].indexOf(obj['#'][i]) > -1) {-->
                <!--l.push('1')-->
              <!--}-->
            <!--}-->
            <!--let acc = (this.accuracy > 7) ? 7 : this.accuracy-->
            <!--acc = (this.accuracy < 1) ? 2 : this.accuracy-->
            <!--if (l.length > acc) {-->
              <!--is = false-->
              <!--item.index += 1-->
            <!--}-->
          <!--})-->
          <!--if (is) {-->
            <!--if (obj['#'] !== '#000000') {-->
              <!--arr.push(obj)-->
            <!--}-->
          <!--}-->
        <!--}-->
      <!--}-->
      <!--let getX = (i) => {-->
        <!--if (i < this.canvas.width) {-->
          <!--getY(i)-->
          <!--this.progress = (i / this.canvas.width * 100).toFixed(2) + '%'-->
          <!--console.log(this.progress)-->
          <!--progress = this.progress-->
          <!--setTimeout(() => {-->
            <!--getX(++i)-->
          <!--})-->
        <!--} else {-->
          <!--this.progress = '100%'-->
          <!--progress = this.progress-->
          <!--console.log(this.progress)-->
          <!--resolve(arr.sort(function (a, b) {-->
            <!--return a.index < b.index ? 1 : (a.index > b.index ? -1 : 0)-->
          <!--}))-->
        <!--}-->
      <!--}-->
      <!--getX(0)-->
    <!--}))-->
  <!--}-->
<!--</script>-->

<!--<style scoped lang="less">-->
  <!--#result{-->
    <!--/*width: 200px;*/-->
    <!--/*height: 200px;*/-->
  <!--}-->
  <!--ul,li{-->
    <!--list-style: none;-->
    <!--margin: 0;-->
    <!--padding: 0;-->
  <!--}-->
  <!--ul{-->
    <!--margin: 20px auto;-->
    <!--/*font-size: 0px;*/-->
  <!--}-->
  <!--ul li{-->
    <!--display: inline-block;-->
    <!--min-width: 100px;-->
    <!--height: 50px;-->
    <!--padding: 0 20px;-->
    <!--margin: 1px;-->
    <!--text-align: center;-->
    <!--font-size: 15px;-->
    <!--line-height: 50px;-->
    <!--color: #000;-->
    <!--border-radius: 4px;-->
    <!--transition: all 0.3s linear 0s;-->
    <!--cursor: pointer;-->
    <!--border: 1px solid #e8e8e8;-->
  <!--}-->

  <!--ul li:hover{-->
    <!--opacity: 0.8;-->
  <!--}-->
<!--</style>-->
