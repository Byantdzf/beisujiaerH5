<template>
  <div class="homepage">
    <div class="caution">
      <img class="icon_caution" style="transform: rotate(180deg);" src="http://images.ufutx.com/201904/01/06b9a01df541d3ec740acf812de80ae1.png" alt="">
      <span class="font30 bold">为什么要身份认证</span>
      <p class="caution_particulars font28">福恋作为一个真实、严肃的婚恋平台，我们要求用户必须完成身份认证，对于以结婚为目的的用户。</p>
    </div>
    <div class="caution">
      <img class="icon_caution" src="http://images.ufutx.com/201904/01/d8c9f0d8b48c0621f9843a6df7008c34.png" alt="">
      <span class="font30 bold">关于隐私安全</span>
      <p class="caution_particulars font28">您上传的任何身份证照片等资料，仅供审核使用且TA人无法看到，此外，我们会对照片进行安全处理，敬请放心。</p>
    </div>
    <p class=" certificate">
      <span class=" certificate_id">身份认证</span>
      <span class="font22">（请务必按示例上传身份证照片）</span>
    </p>
    <div>
      <p class="text_name" >姓名：</p>
      <input class="input_name" type="text" v-model="name" placeholder="请输入">
    </div>
    <div>
      <p class="text_IdNumber">身份证号:</p>
      <input class="input_IdNumber"  type="number" v-model="card_num" placeholder="请输入">
    </div>
    <div class="ff">
      <div class="bc_box text-center inline-block">
        <img class="" src="http://images.ufutx.com/201904/01/5a452e852b95786089aaf573a58261b8.png" alt="">
        <p class="font26">手持身份证正面照</p>
      </div>
      <div class="bc_box text-center inline-block">
        <img class="identiyCard" src="http://images.ufutx.com/201904/01/8dc7658b9b3effcd1740b9e9e1d5f315.png" alt="">
        <p class="font26">身份证正面照</p>
      </div>
      <div class="bc_box text-center inline-block">
        <img class="photo_pictures" src="http://images.ufutx.com/201904/01/89de349ae645eab7ea0e64759089400c.png" alt="">
      </div>
    </div>
    <div class="dist"></div>
    <div class="submit" @click="save">提交</div>
  </div>
</template>
<script>
  import {$toastSuccess} from '../../config/util'

  export default {
    name: 'authentication',
    data () {
      return {
        name: '',
        card_num: ''
      }
    },
    methods: {
      save () {
        let data = {
          name: this.name,
          card_num: this.card_num
        }
        console.log(data)
        this.$http.post(`/official/user/approve`, data).then(({data}) => {
          $toastSuccess('认证成功')
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>
<style scoped lang="less">
  body{background: white}
  .homepage{
    width: 750px;
    /*height: 100vh;*/
    background: white;
    position: relative;
  }
  .caution{
    color: #2c2c2c;
    margin-bottom: 40px;
    padding: 40px 30px 0px 30px;
    p{
      margin-top: 12px;
    }
    .icon_caution{
      width: 46px;
      vertical-align: middle;
    }
  }
  .caution_particulars{
    text-indent: 26px;
    color: #646464;
    padding: 0px 30px 0px 30px;
  }
  .issue{
    color: #2c2c2c;
    margin: 108px 0px 0px 0px;
    padding: 0px 30px 0px 30px;
  }
  .icon_issue{
    width: 45px;
    height: 46px;
    vertical-align: middle;
  }
  .issue_particulars{
    font-size: 30px;
    text-indent: 2em;
    padding: 40px 30px 75px 30px;
    color: #646464;
  }
  .certificate{
    font-weight: bold;
    padding: 0px 30px 0px 30px;
  }
  .certificate_id{
    font-size: 30px;
  }
  .input_name{
    width: 670px;
    height: 75px;
    font-size: 30px;
    text-align: right;
    margin-top: 24px;
    margin-left: 30px;
    border: none;
    border-bottom: 1px solid #dcdcdc;
    padding-right: 20px;
  }
  .input_IdNumber{
    width: 670px;
    height: 75px;
    font-size: 30px;
    text-align: right;
    margin-top: 24px;
    margin-left: 30px;
    border: none;
    border-bottom: 1px solid #dcdcdc;
    padding-right: 20px;
  }
  .bc_box{
    width: 49%;
    margin-top: 32px;
    img{
      width: 138px;
      height: 220px;
      margin-bottom: 12px;
    }
    .identiyCard{
      width: 257px;
      height: 158px;
    }
    .photo_pictures{
      width: 238px;
      height: 238px;
    }
  }
  .text_name{
    display: inline-block;
    font-size: 30px;
    color: #6d6d6d;
    margin-top: 24px;
    position: absolute;
    padding: 0px 30px 0px 30px;
  }
  .text_IdNumber{
    display: inline-block;
    font-size: 30px;
    color: #6d6d6d;
    margin-top: 24px;
    position: absolute;
    padding: 0px 30px 0px 30px;
  }
  .handld_box{
    width: 690px;
    position: relative;
  }
  .handld{
    width: 138px;
    height: 220px;
    position: absolute;
    top: 52px;
    left: 80px;
    padding: 0px 30px 0px 30px;
  }
  .text_annotation{
    font-weight: bold;
    font-size: 24px;
    position: relative;
  }
  .text_identiyCard{
    position: absolute;
    top: 304px;
    left: 462px;
    padding: 0px 30px 0px 30px;
  }
  .text_handld{
    position: absolute;
    top: 304px;
    left: 58px;
    padding: 0px 30px 0px 30px;
  }
  .dist{
    height: 105px;
  }
  .submit{
    height: 105px;
    line-height: 105px;
    text-align: center;
    font-size: 34px;
    color: #fffffd;
    background-color: #344a5d;
    position: fixed;
    bottom: 0;
    width: 100vw;
    letter-spacing: 3px;
  }
</style>
