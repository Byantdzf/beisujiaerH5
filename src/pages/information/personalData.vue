<template>
  <div id="personalData">
    <div class="wrapper ff">
      <div class="bc_avatar text-center" @click="chooseImage">
        <div class="avatar" style="background-image: url('http://images.ufutx.com/201903/26/000319417f22842bd8c7989d608b3871.png');" ></div>
        <p class="font26">添加个人形象照</p>
      </div>
    </div>
    <ul>
      <li class="list-item">
        <span class="title font32">姓名</span>
        <div class="flo_r">
          <input type="text" class="middle text-right font30 color6" v-model="name" placeholder="点击填写">
          <!--<img src="../../src/assets/icon/go.png" alt="icon" class="icon">-->
        </div>
      </li>
      <!--<li class="list-item">-->
        <!--<span class="title font36">手机号码</span>-->
        <!--<div class="flo_r">-->
          <!--<span class="colorbe font30">点击获取</span>-->
          <!--&lt;!&ndash;<img src="../../src/assets/icon/go.png" alt="icon" class="icon">&ndash;&gt;-->
        <!--</div>-->
      <!--</li>-->
      <li class="list-item">
        <span class="title font32">性别 <span class="font26">（性别选择后无法修改）</span></span>
        <div class="flo_r">
          <span class="font30 " :class="{color6: sex.length!==0,colorbe:sex.length==0}" @click="showSex = !showSex">{{sex.length==0?'请选择':sex}}</span>
          <img src="../../assets/icon/go.png" alt="icon" class="icon">
        </div>
      </li>
      <li class="list-item">
        <span class="title font32">出生日期</span>
        <div class="flo_r">
          <span class="font30" :class="{color6: birthday.length!==0,colorbe:birthday.length==0}"  @click="showDate">{{birthday.length==0?'请选择':birthday}}</span>
          <img src="../../assets/icon/go.png" alt="icon" class="icon">
        </div>
      </li>
      <li class="list-item">
        <span class="title font32">信仰</span>
        <div class="flo_r">
          <span class="font30" :class="{color6: belief.length!==0,colorbe:belief.length==0}"  @click="showBelief = !showBelief">{{belief.length==0?'请选择':belief}}</span>
          <img src="../../assets/icon/go.png" alt="icon" class="icon">
        </div>
      </li>
    </ul>
    <div class="fixed_bot subjectColor colorff bc_box font32">
      <ul>
        <li class="inline-block after" @click="onClick('single')">我是单身</li>
        <li class="inline-block" @click="onClick('marriage')">我是介绍人</li>
      </ul>
    </div>
    <group>
      <popup-picker style="display:none;" title="title1" :data="sexList"   @on-shadow-change="onChange('sex', $event)"  @on-change="onChange('sex', $event)" :show.sync="showSex"></popup-picker>
      <popup-picker style="display:none;" title="" :data="beliefList"   @on-shadow-change="onChange('belief', $event)"  @on-change="onChange('belief', $event)" :show.sync="showBelief"></popup-picker>
      <!--<x-address style="display:none;" title="title" :hide-district="true" :list="addressData" placeholder="请选择地址" :show.sync="showAddress" @on-shadow-change="onShowChange"  @on-change="onShowChange"></x-address>-->
    </group>
  </div>
</template>

<script>
  import {Datetime, Group, XButton, XAddress, ChinaAddressV4Data, PopupPicker} from 'vux'
  // import {$toastSuccess, $toastWarn} from '../../config/util'

  export default {
    name: 'personalData',
    components: {
      Datetime,
      Group,
      XButton,
      XAddress,
      ChinaAddressV4Data,
      PopupPicker
    },
    data () {
      return {
        birthday: '',
        sex: '',
        sexList: [['男', '女']],
        belief: '',
        beliefList: [['基督教', '佛教', '伊斯兰教', '其他']],
        showSex: false,
        name: '',
        address: '',
        addressData: ChinaAddressV4Data,
        ossConfig: '',
        host: '',
        file: null,
        showBelief: false
      }
    },
    watch: {
    },
    methods: {
      onChange (type, val) {
        console.log('val change', val)
        this[type] = val[0]
      },
      showDate () {
        let vm = this
        vm.$vux.datetime.show({
          value: 'birthday', // 其他参数同 props
          minYear: '1960',
          maxYear: '2019',
          confirmText: '确定',
          cancelText: '取消',
          onConfirm (value) {
            vm.birthday = value
          }
        })
      },
      onClick (type) {
        let data = {
          birthday: this.birthday,
          sex: this.sex === '男' ? 1 : 2,
          name: this.name,
          belief: this.belief,
          type: type,
          photo: 'hasajs'
        }
        this.$http.put('/official/users/profile', data).then(({data}) => {
          if (type === 'single') {
            this.$router.push({
              name: 'singleData'
            })
          } else {
            this.$router.push({
              name: 'marriageData'
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      chooseImage () {
        var self = this
        // self.loadingStatus = true
        var formData = new FormData()
        var fileName = self.file.name + '.' + self.file.type.split('/').pop().toLowerCase()
        // var filePath = self.host + '/' + self.ossConfig.dir + fileName
        formData.append('name', self.ossConfig.dir + fileName)
        formData.append('key', self.ossConfig.dir + fileName)
        formData.append('policy', self.ossConfig.policy)
        formData.append('OSSAccessKeyId', self.ossConfig.accessid)
        formData.append('success_action_status', '200')
        formData.append('signature', self.ossConfig.signature)
        formData.append('file', self.file)
        formData.append('filename', self.file.name)
        console.log(formData)
        console.log(self.ossConfig)
        self.$http.post(self.ossConfig.host, formData).then(({data}) => {
          debugger
        }).catch((error) => {
          console.log(error)
        })
      },
      onShowChange (ids, names) { // 地址
        this.address = `${names[0]} - ${names[1]}`
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
      console.log(this.$store.state.route)
      this.getSignature()
    }
  }
</script>

<style  lang="less" scoped>
  #personalData{
    background-color: #F0F3F5 !important;
    height: 100vh;
    .wrapper{
      .bc_avatar{
        width: 100%;
        height: 332px;
        background: black;
        position: relative;
        padding-top: 118px;
        .avatar{
          width: 225px;
          height: 225px;
          border-radius: 50%;
          margin: auto;
          background-size: contain;
        }
        p{
          color: #787878;
          margin-top: 35px;
        }
      }
    }
    .list-item{
      padding: 36px 20px;
      margin-bottom: 1px;
      background: white;
      .icon{
        width: 20px;
        height: 20px;
      }
      input{
        border: none;
        background: none;
        &::-webkit-input-placeholder{
          color: #bebebe;
          text-align: right;
        }
      }
    }
    .bc_box{
      width: 100%;
      padding: 38px 0;
      .after{
        position: relative;
        &:after{
          content: '';
          width: 2px;
          height: 64px;
          background: #b6b6b6;
          position: absolute;
          right: 0;
          top: -10px;
        }
      }
      li{
        width: 49%;
        text-align: center;
      }
    }
  }
  .dp-header{
    height: 50px !important;
    .dp-item{
      font-size: 32px !important;
    }
  }
</style>
