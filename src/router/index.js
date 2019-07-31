import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      meta: {
        keepAlive: true // 需要被缓存
      },
      component: (resolve) => require(['@/tabBar/home'], resolve)
    },
    {
      path: '/detection', // 检测
      name: 'detection',
      meta: {
        keepAlive: true // 需要被缓存
      },
      component: (resolve) => require(['@/tabBar/detection'], resolve)
    },
    {
      path: '/user',
      name: 'user',
      component: (resolve) => require(['@/tabBar/user'], resolve)
    },

    {
      path: '/register',
      name: 'register',
      component: (resolve) => require(['@/pages/register'], resolve)
    },
    {
      path: '/record', // 检测记录
      name: 'record',
      component: (resolve) => require(['@/pages/user/record'], resolve)
    },
    {
      path: '/detectionDetail', // test测试
      name: 'detectionDetail',
      component: (resolve) => require(['@/pages/user/detectionDetail'], resolve)
    },
    {
      path: '/testV2', // test测试
      name: 'testV2',
      component: (resolve) => require(['@/pages/user/testV2'], resolve)
    },
    {
      path: '/setting', // 设置
      name: 'setting',
      component: (resolve) => require(['@/pages/user/setting'], resolve)
    },
    {
      path: '/course',
      name: 'course',
      component: (resolve) => require(['@/pages/user/course'], resolve)
    },
    {
      path: '/about',
      name: 'about',
      component: (resolve) => require(['@/pages/user/about'], resolve)
    }
  ]
})
