<template>
  <div class="whole">
    <div class="background">
      <div class="camera_perfect"  >
        <div class="perfect inline-block previewer-demo-img" v-for="(item, index) in list" v-bind:style="{backgroundImage:'url(' + item.src + ')'}" @click="show(index)">
          <div class="del text-center" @click.stop="delImage(item.src, index)">删除</div>
        </div>
      </div>
    </div>
    <upload @upload="getImgUrl"></upload>
    <div class="height160"></div>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
    </div>
    <div class="box_bottom" @click="goUser">完成</div>
  </div>
</template>
<script>
  import { Previewer, TransferDom } from 'vux'
  import {$toastSuccess} from '../../config/util'
  import upload from '../../components/upload'

  export default {
    name: 'PreviewData',
    directives: {
      TransferDom
    },
    components: {
      Previewer,
      upload
    },
    data () {
      return {
        paas: localStorage.getItem('paas'),
        list: [],
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
      delImage (item, index) {
        this.$http.delete(`/official/users/profile/photos?photo=${item}`).then(({data}) => {
          this.list.splice(index, 1)
          $toastSuccess('已删除')
        }).catch((error) => {
          console.log(error)
        })
      },
      getImgUrl (data) {
        let arr = [data]
        this.list.push({src: data})
        let dataV = {
          photos: arr
        }
        this.$http.post(`/official/users/profile/photos`, dataV).then(({data}) => {
          console.log('更新成功')
          this.getUser()
        }).catch((error) => {
          console.log(error)
        })
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
      getUser () {
        this.$http.get(`/official/users/profile/photos?paas=${this.paas}`).then(({data}) => {
          this.list = data.map((item) => {
            return {
              src: item.photo
            }
          })
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
    min-height: 100vh;
    background-color: #f0f3f5;
  }
  .background{
    background-color: #ffffff;
  }
  .camera_perfect{
    width: 706px;
    padding: 35px 25px 35px 25px;
    background-color: #ffffff;
  }
  .perfect{
    width: 222px;
    height: 222px;
    margin: 0 12px 12px 0;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
  .del{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: rgba(0,0,0,0.4);
    color: #ceced0;
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
