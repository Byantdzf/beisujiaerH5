<template>
    <div class="chitchat">
      <div class="hint font26">请各位弟兄姊妹自觉遵守法律法规，遇到转款切勿相信谨防上当受骗；交友期保持必要的界限，保证自身安全，请勿轻易委身于人，请勿和网友发生借贷关系，否则后果自己承担。
      </div>
      <div class="j_page" >
        <div class="clearfix" >
          <div class="right-Avatar flo_r backCover" v-bind:style="{backgroundImage:'url(' + avatar + ')'}" ></div>
          <div class="right-message flo_r font26">
            今晚来我家吗？？？俺看看扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩绿静安寺少时诵诗书所所所所所所所所所所所所所所所所所所扩绿
          </div>
          <div class="clearfloat"></div>
        </div>
        <div class="clearfix" >
          <div class="right-Avatar flo_r backCover" v-bind:style="{backgroundImage:'url(' + avatar + ')'}" ></div>
          <div class="right-message flo_r font26">
            今晚来我家吗？？？俺看看扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩绿静安寺少时诵诗书所所所所所所所所所所所所所所所所所所扩绿
          </div>
          <div class="clearfloat"></div>
        </div>
      </div>
      <div class="wa-row">
        <div class="padding_half flo_l">
          <input type="text" />
        </div>
        <div size='mini' class="send-button flo_r font28">发送
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'chitchat',
    data () {
      return {
        avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1122649470,955539824&fm=27&gp=0.jpg'
      }
    },
    methods: {

    }
  }
</script>

<style scoped lang="less">
  .chitchat{
    background: #f7f7fa;
    height: 100vh;
    .hint{
      background: rgba(44, 44, 44, 0.4);
      display: inline-block;
      padding: 6px 12px;
      border-radius: 6px;
      margin: 18px 48px 0px 48px;
      color: #fcfcff;
      line-height: 1.6;
    }
    .wa-row{
      width: 100vw;
      padding: 12px 0;
      height: 76px;
      background: white;
      position: fixed;bottom: 0;
      line-height: 100px;
      left: 0;
    }
    .padding_half{
      flex:1;
      height:80px;
      line-height: 76px;
      input{
        width: 72vw;
        margin-left: 4vw;
        padding: 0 2vw;
        height:60px;
        border: none;
        border: 1px solid #dcdcdc;
        border-radius: 12px;
      }
    }
    .send-button{
      padding: 0 22px;
      height: 64px;
      margin-right: 4vw;
      border-radius: 6px;
      line-height: 60px;
      color: white;
      margin-top: 8px;
      background: #1AAD19 !important;
    }
    .j_page{
      padding: 32px;
      .right-Avatar {
        width: 86px;
        height: 86px;
      }
      .clearfix{
        margin-bottom: 12px;
      }
      .right-message{
        max-width: 70vw;
        margin-right: 22px;
        float: right;
        margin-top: 10px;
        padding: 0 12px;
        line-height: 60px;
        background: yellowgreen;
        border-radius: 8px;
        position: relative;
        &:after{
          content: ' ';
          position: absolute;
          right: -12px;
          top: 0;
          width: 0;
          height: 0;
          border-top: 16px solid transparent;
          border-left: 24px solid yellowgreen;
          border-bottom: 16px solid transparent;
        }
      }
    }
  }
</style>
