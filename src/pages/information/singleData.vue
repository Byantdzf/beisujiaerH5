<template>
  <div id="singleData">
    <ul>
      <li class="list-item">
        <span class="title font32">身高（cm）~</span>
        <input type="number" class="text-right font30 flo_r" v-model="stature" placeholder="点击填写身高（cm）">
      </li>
      <li class="list-item">
        <span class="title font32">体重（kg）~</span>
        <input type="text" class="text-right font30 flo_r" v-model="weight" placeholder="点击填写体重（kg）">
      </li>
      <li class="list-item">
        <span class="title font32">常居地</span>
        <input type="text" class="text-right font30 flo_r" v-model="name" placeholder="点击选择">
      </li>
      <li class="list-item">
        <span class="title font32">成长环境~</span>
        <input type="text" class="text-right font30 flo_r" v-model="resident_type" placeholder="点击选择" @click="popupPicker('resident_type', 'residentTypeList')">
      </li>
      <li class="list-item">
        <span class="title font32">成长地</span>
        <input type="text" class="text-right font30 flo_r" v-model="name" placeholder="点击填写">
      </li>
      <li class="list-item">
        <span class="title font32">最高学历~</span>
        <input type="text" class="text-right font30 flo_r" v-model="degree" readonly placeholder="点击选择" @click="popupPicker('degree', 'degreeList')">
      </li>
      <li class="list-item">
        <span class="title font32">毕业学校~</span>
        <input type="text" class="text-right font30 flo_r" v-model="graduate_school" placeholder="点击填写">
      </li>
      <li class="list-item">
        <span class="title font32">工作单位~</span>
        <input type="text" class="text-right font30 flo_r" v-model="company" placeholder="点击填写">
      </li>
      <li class="list-item">
        <span class="title font32">公司职位~</span>
        <input type="text" class="text-right font30 flo_r" v-model="post" placeholder="点击填写">
      </li>
      <li class="list-item">
        <span class="title font32">单位性质~</span>
        <input type="text" class="text-right font30 flo_r" v-model="work_sort" readonly placeholder="点击选择" @click="popupPicker('work_sort', 'workSortList')">
      </li>
      <li class="list-item">
        <span class="title font32">行业~</span>
        <input type="text" class="text-right font30 flo_r color6" readonly :value="$refs.picker2&&$refs.picker2.getNameValues()" placeholder="点击选择"  @click="show = !show">
      </li>
      <li class="list-item">
        <span class="title font32">微信号~</span>
        <input type="text" class="text-right font30 flo_r" v-model="wechat_id" placeholder="点击填写微信号">
      </li>
      <li class="list-item" style="margin-top: 3vw;">
        <span class="title font32 flo_l">自我介绍</span>
        <router-link :to="{name:'textareaData',query:{title: '自我介绍'}}">
          <div class="text flo_l colorbe font28 ellipsis_3">
           {{introduction}}
          </div>
        </router-link>
        <img src="http://images.ufutx.com/201903/29/d919daf1cd00a2a2202de67f7972e83f.png" alt="icon" class="edit">
        <div class="clearfloat"></div>
      </li>
      <li class="list-item" style="margin-top: 3vw;">
        <span class="title font32 flo_l">理想对象</span>
        <router-link :to="{name:'textareaData',query:{title: '理想对象'}}">
          <div class="text flo_l colorbe font28 ellipsis_3">
            {{ideal_mate}}
          </div>
        </router-link>
        <img src="http://images.ufutx.com/201903/29/d919daf1cd00a2a2202de67f7972e83f.png" alt="icon" class="edit">
        <div class="clearfloat"></div>
      </li>
    </ul>
    <div class="height160"></div>
    <div class="fixed_bot subjectColor colorff bc_box font32 text-center" @click="submit">
      提交
    </div>
    <group>
      <popup-picker style="display:none;" :data="pickerList"   @on-shadow-change="onChange"  @on-change="onChange" :show.sync="showPicker"></popup-picker>
      <!--行业-->
      <popup-picker :data="industriesList" style="display: none" :columns="2" ref="picker2"  @on-shadow-change="onChangeIndustries('industries', $event)" :show.sync="show"  @on-change="onChangeIndustries('industries', $event)" ></popup-picker>
      <!--<x-address style="display:none;" title="title" :hide-district="true" :list="addressData" placeholder="请选择地址" :show.sync="showAddress" @on-shadow-change="onShowChange"  @on-change="onShowChange"></x-address>-->
    </group>
  </div>
</template>

<script>
  import {Datetime, Group, XButton, XAddress, ChinaAddressV4Data, PopupPicker, base64} from 'vux'
  export default {
    name: 'singleData',
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
        name: '',
        stature: '', // 身高
        weight: '', // 体重
        graduate_school: '', // 毕业学校
        company: '', // 工作单位
        post: '', // 公司职位
        wechat_id: '', // 微信号
        introduction: '家庭情况，兴趣爱好，自我评价', // 自我介绍
        ideal_mate: '写下你对另一半的期望', // 理想对象
        work_sort: '', // 单位性质
        degree: '', // 学历
        resident_type: '', // 成长环境
        industries: [],
        industriesList: [],
        show: false,
        showPicker: false,
        pickerList: [],
        itemType: '', // 对应的动态赋值
        workSortList: [['事业单位', '公务员', '央企', '国企', '私企', '外企']],
        degreeList: [['大专', '本科', '硕士', '博士', '其他']],
        residentTypeList: [['城市', '乡村']],
        address: '',
        addressData: ChinaAddressV4Data
      }
    },
    computed: {
    },
    watch: {
    },
    methods: {
      popupPicker (item, list) { // 公用选择器函数
        this.showPicker = !this.showPicker
        this.pickerList = this[list]
        this.itemType = item
      },
      onChangeIndustries (type, val) { //  行业
        this.industries = this.$refs.picker2 && this.$refs.picker2.getNameValues().split(' ')
        console.log(this.industries)
      },
      onShowChange (ids, names) { // 地址选择
        this.address = `${names[0]} - ${names[1]}`
      },
      onChange (val) {
        console.log('val change', val)
        this[this.itemType] = val[0]
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
          photo: 'hasajs',
          paas: this.$store.state.paas
        }
        console.log(data)
        this.$http.put('/official/users/profile', data).then(({data}) => {
          if (data.user && data.user.type) {
            this.$router.push({
              name: 'home'
            })
          } else {
            this.$router.push({
              name: 'personalData'
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      getIndustries () { // 初始化行业数据
        let vm = this
        vm.$http.get('/industries').then(({data}) => {
          for (let item of data) {
            vm.industriesList.push(
              {
                name: item.name,
                value: 'industry' + item.id,
                parent: 0
              }
            )
            for (let itemV of item.sub_industry) {
              vm.industriesList.push(
                {
                  name: itemV.name,
                  value: 'industry_sub' + itemV.id,
                  parent: 'industry' + item.id
                }
              )
            }
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      submit () { // 提交
        this.$router.push({
          name: 'home'
        })
      }
    },
    mounted () {
      console.log(this.statureList)
      console.log(base64.encode('assssssssssss'))
      this.getIndustries()
    }
  }
</script>

<style  lang="less" scoped>
  #singleData{
    background-color: #F0F3F5 !important;
    height: 100vh;
    .list-item{
      padding: 36px 20px;
      /*border-bottom: 1px solid #b6b6b6;*/
      background: white;
      position: relative;
      margin-bottom: 1px;
      .icon{
        width: 20px;
        height: 20px;
      }
      .text{
        width: 70%;
        margin-left: 40px;
      }
      .edit{
        width: 32px;
        position: absolute;
        bottom: 16px;
      }
      input{
        width: 68vw;
        border: none;
        background: none;
        /*padding-right: 40px;*/
        margin-top: 6px;
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
