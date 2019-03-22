<template>
  <div>
    <x-header class="ignore" :left-options="{showBack: false}">主页</x-header>
    <swiper :list="list"></swiper>
    <!--<group title="cell demo">-->
      <!--<cell title="VUX" value="cool" is-link></cell>-->
    <!--</group>-->
    <group>
      <x-input title="title" v-model="value"></x-input>
    </group>
    <div class="font22 box">哈哈啥时候</div>
  </div>
</template>

<script>
import { Group, Cell, XHeader, Swiper, XInput } from 'vux'

export default {
  components: {
    Group,
    Cell,
    XHeader,
    Swiper,
    XInput
  },
  data () {
    return {
      value: '',
      msg: 'Hello World!',
      list: [{
        url: 'javascript:',
        img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2622829061,2227432350&fm=26&gp=0.jpg',
        title: '我的'
      }, {
        url: 'javascript:',
        img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=685006216,2192383313&fm=26&gp=0.jpg',
        title: '都是我的',
        fallbackImg: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2622829061,2227432350&fm=26&gp=0.jpg'
      }]
    }
  }
}
</script>

<style  lang="less">
  .vux-demo {
    text-align: center;
  }
  .logo {
    width: 100px;
    height: 100px
  }
</style>
