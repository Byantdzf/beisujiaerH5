<template>
  <div class="homepage">
    <div class="caution">
      <img class="icon_caution" src="http://images.ufutx.com/201904/01/06b9a01df541d3ec740acf812de80ae1.png" alt="">
      <span>为什么要身份认证</span>
    </div>
    <p class="caution_particulars">福恋作为一个真实、严肃的婚恋平台，我们要求用户必须完成身份认证，对于以结婚为目的的用户。</p>
    <div class="issue">
      <img class="icon_issue" src="http://images.ufutx.com/201904/01/d8c9f0d8b48c0621f9843a6df7008c34.png" alt="">
      <span>关于隐私安全</span>
    </div>
    <div class="issue_particulars">您上传的任何身份证照片等资料，仅供审核使用且TA人无法看到，此外，我们会对照片进行安全处理，敬请放心。</div>
    <p class=" certificate">
      <span class=" certificate_id">身份认证</span>
      <span class=" certificate_attention">（请务必按示例上传身份证照片）</span>
    </p>
    <div>
      <p class="text_name" >姓名：</p>
      <input class="input_name" type="text" placeholder="请输入">
    </div>
    <div>
      <p class="text_IdNumber">身份证号:</p>
      <input class="input_IdNumber"  type="text" placeholder="请输入">
    </div>
    <div class="handld_box">
      <img class="handld" src="http://images.ufutx.com/201904/01/5a452e852b95786089aaf573a58261b8.png" alt="">
      <img class="identiyCard" src="http://images.ufutx.com/201904/01/8dc7658b9b3effcd1740b9e9e1d5f315.png" alt="">
    </div>
    <p class="text_annotation">
      <span class="text_handld">手持身份证正面照</span>
      <span class="text_identiyCard">身份证正面照</span>
      <img class="photo_pictures" src="http://images.ufutx.com/201904/01/89de349ae645eab7ea0e64759089400c.png" alt=""><!--照相机-->
    </p>
    <div class="dist"></div>
    <div class="submit">提交</div>
  </div>
</template>
<script>
  export default {
    name: 'authentication',
    data () {
      return {
      }
    }
  }
</script>
<style scoped lang="less">
  .homepage{
    width: 750px;
    /*height: 100vh;*/
    background: white;
    position: relative;
  }
  .caution{
    font-weight: bold;
    font-size: 30px;
    color: #2c2c2c;
    margin-bottom: 40px;
    padding: 40px 30px 0px 30px;
  }
  .icon_caution{
    width: 45px;
    height: 46px;
    vertical-align: middle;
    transform: rotate(180deg);
  }
  .caution_particulars{
    font-size: 30px;
    text-indent: 2em;
    color: #646464;
    padding: 0px 30px 0px 30px;
  }
  .issue{
    font-weight: bold;
    font-size: 30px;
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
  .certificate_attention{
    font-size: 20px;
  }
  .input_name{
    width: 690px;
    height: 75px;
    font-size: 30px;
    text-align: right;
    margin-top: 24px;
    margin-left: 30px;
    border: none;
    border-bottom: 1px solid #dcdcdc;
  }
  .input_IdNumber{
    width: 690px;
    height: 75px;
    font-size: 30px;
    text-align: right;
    margin-top: 24px;
    margin-left: 30px;
    border: none;
    border-bottom: 1px solid #dcdcdc;
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
  .identiyCard{
    width: 257px;
    height: 158px;
    position: absolute;
    top: 84px;
    left: 402px;
    padding: 0px 30px 0px 30px;
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
  /*照相机*/
  .photo_pictures{
    width: 238px;
    height: 238px;
    position: absolute;
    top: 388px;
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
