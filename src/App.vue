<template>
  <div id="app">
    <router-view></router-view>
    <tabbar class="vux-demo-tabbar" icon-class="vux-center"  slot="bottom">
      <tabbar-item :link="{path:'/'}">
        <span class="demo-icon-22 vux-demo-tabbar-icon-home" slot="icon" style="position:relative;top: -2px;">
          <img src="../src/assets/icon/home.png" alt="home">
        </span>
        <span class="demo-icon-22" slot="icon-active">
          <img src="../src/assets/icon/homeActive.png" alt="home">
        </span>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/'}" badge="9">
        <span class="demo-icon-22" slot="icon">
          <img src="../src/assets/icon/attention.png" alt="home">
        </span>
        <span class="demo-icon-22" slot="icon-active">
          <img src="../src/assets/icon/attentionActive.png" alt="home">
        </span>
        <span slot="label">
          <!--<span v-if="componentName" class="vux-demo-tabbar-component">{{componentName}}</span>-->
          <!--<span v-else>活动</span>-->
          活动
        </span>
      </tabbar-item>
      <tabbar-item :link="{path:'/'}" >
        <span class="demo-icon-22 vux-demo-tabbar-icon-home" slot="icon" style="position:relative;top: -2px;">
          <img src="../src/assets/icon/message.png" alt="home">
        </span>
        <span class="demo-icon-22" slot="icon-active">
          <img src="../src/assets/icon/messageActive.png" alt="home">
        </span>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/'}" >
        <span class="demo-icon-22 vux-demo-tabbar-icon-home" slot="icon" style="position:relative;top: -2px;">
          <img src="../src/assets/icon/my.png" alt="home">
        </span>
        <span class="demo-icon-22" slot="icon-active">
          <img src="../src/assets/icon/myActive.png" alt="home">
        </span>
        <span slot="label">首页</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { XHeader, Tabbar, TabbarItem } from 'vux'
  export default {
    name: 'app',
    components: {
      XHeader,
      Tabbar,
      TabbarItem
    }
  }
</script>

<style lang="less">
@import '../src/assets/style/reset';
body {
  background-color: #fbf9fe;
}
</style>
