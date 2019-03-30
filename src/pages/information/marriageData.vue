<template>
  <div id="marriageData">
    <ul>
      <li class="list-item">
        <span class="title font32">工作单位</span>
        <div class="flo_r">
          <input type="text" class="middle text-right font30" v-model="work" placeholder="点击填写">
          <!--<img src="http://images.ufutx.com/201903/29/d919daf1cd00a2a2202de67f7972e83f.png" alt="icon" class="icon">-->
        </div>
      </li>
      <li class="list-item vux-1px-t">
        <span class="title font32">行业</span>
        <div class="flo_r">
          <span class="colorbe font30" @click="show = !show">{{$refs.picker2&&$refs.picker2.getNameValues()?$refs.picker2&&$refs.picker2.getNameValues():'请选择'}}</span>
          <img src="../../assets/icon/go.png" alt="icon" class="icon">
        </div>
      </li>
      <li class="list-item" style="margin-top: 3vw;">
        <span class="title font32 flo_l">服务格言</span>
        <router-link :to="{name:'textareaData',query:{title: '服务格言'}}">
          <div class="text flo_l colorbe font28 ellipsis_3">
            可嗯呢撒娇的垃圾的骄傲的看就看打卡机三打两建拉三等奖asdasd克拉斯佳都科技爱丽丝的骄傲基督教就打了坚实的卡机第六届
          </div>
        </router-link>
        <img src="http://images.ufutx.com/201903/29/d919daf1cd00a2a2202de67f7972e83f.png" alt="icon" class="edit">
        <div class="clearfloat"></div>
      </li>
    </ul>
    <div class="fixed_bot subjectColor colorff bc_box font32 text-center">
      提交
    </div>
    <group>
      <popup-picker :data="industriesList" style="display: none" :columns="2" ref="picker2"  @on-shadow-change="onChange('industries', $event)" :show.sync="show"  @on-change="onChange('industries', $event)" ></popup-picker>
    </group>
  </div>
</template>

<script>
  import {Datetime, Group, XButton, XAddress, ChinaAddressV4Data, PopupPicker} from 'vux'
  export default {
    name: 'marriageData',
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
        work: '',
        title3: '联动显示值',
        value3: [],
        industries: [],
        industriesList: [],
        show: false
      }
    },
    watch: {
    },
    methods: {
      onChange (type, val) { //  行业
        this.industries = this.$refs.picker2 && this.$refs.picker2.getNameValues().split(' ')
        console.log(this.industries)
      },
      onClick (type) { // 提交
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
      }
    },
    mounted () {
      console.log(this.$store.state.route)
      this.getIndustries()
    }
  }
</script>

<style  lang="less" scoped>
  #marriageData{
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
