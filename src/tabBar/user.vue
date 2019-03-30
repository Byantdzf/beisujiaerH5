<template>
  <div id="user">
    <!--<x-header class="ignore" :left-options="{showBack: false}">我的</x-header>-->
    <!--<div style="height: 50px;"></div>-->
    <div class="wrapper ff">
      <div class="avatar flo_l" style="background-image: url('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1511461500,2536850263&fm=200&gp=0.jpg');"></div>
      <div class="name inline-block">
        <span class="font36 bold">Angela</span><br/>
        <span class="font26">
          <img width="16" style="display:inline-block;margin-bottom: 2px;"  class="middle" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
          市级VIP
        </span>
      </div>
      <div class="editData flo_r font26">编辑资料</div>
      <div class="clearfloat"></div>
      <ul class="mutual text-center">
        <li class="after"><p class="bold color6">32</p>喜欢我</li>
        <li class="after"><p class="bold color6">32</p>我喜欢</li>
        <li><p class="bold color6">32</p>好友</li>
      </ul>
    </div>
    <group title=" " >
      <cell title="VIP办理" is-link>
        <!--<badge text="1"></badge>-->
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
        <span class="be">2019-03-22到期</span>
      </cell>
    </group>
    <group title=" ">
      <cell title="实名认证" is-link>
        <!--<badge text="1"></badge>-->
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
      </cell>
    </group>
    <group title=" ">
      <cell title="意见反馈" is-link>
        <!--<badge text="1"></badge>-->
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
      </cell>
    </group>
    <!--{{count}}-->
    <!--<button @click="onClick">ces</button>-->
  </div>
</template>

<script>
  import { Group, Cell, XHeader, XInput, Badge } from 'vux'

  export default {
    name: 'user',
    components: {
      Group,
      Cell,
      XHeader,
      XInput,
      Badge
    },
    computed: {
      count () {
        return this.$store.state.count
      }
    },
    data () {
      return {
        value: '',
        search: '',
        list: [
          {}, {}, {}, {}, {}, {}, {}
        ]
      }
    },
    methods: {
      onClick () {
        this.$store.dispatch('login')
        this.$store.commit('increment')
      }
    },
    mounted () {
      console.log(this.$store.state.route)
      console.log(this.$store.state.count)
    }
  }
</script>

<style  lang="less">
  body{
    background: #f7f7f7 !important;
  }
  .wrapper{
    padding: 20px;
    .avatar{
      width: 130px;
      height: 130px;
      border-radius: 50%;
      background-size: cover;
      margin-right: 25px;
    }
    .name{
      margin-top: 22px;
    }
    .mutual{
      margin-top: 55px;
      color: #848484;
      .after{
        position: relative;
        &:after{
          content: '';
          width: 2px;
          height: 32px;
          background: #848484;
          position: absolute;
          right: 0;
        }
      }
      li{
        padding: 0 80px;
        display: inline-block;
        font-size: 26px;
        text-align: center;
        p{
          font-size: 28px;
          margin-bottom: 12px;
        }
      }
    }
  }
  .maTop16{margin-top: 16px}
  .editData{
    padding: 8px 20px;
    border-radius: 32px;
    color: #35495e;
    border: 1px solid #35495e;
  }
  .vux-label,.weui-cell__ft{
    font-size: 4vw;
  }
</style>
