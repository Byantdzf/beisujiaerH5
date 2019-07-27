import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: (resolve) => require(['@/tabBar/home'], resolve)
    },
    {
      path: '/detection', // 检测
      name: 'detection',
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
    },
    { // 完善资料
      path: '/PreviewData',
      name: 'PreviewData',
      component: (resolve) => require(['@/pages/user/PreviewData'], resolve)
    },
    { // 生活照
      path: '/uploadImage',
      name: 'uploadImage',
      component: (resolve) => require(['@/pages/user/uploadImage'], resolve)
    },
    { // 意见反馈
      path: '/feedback',
      name: 'feedback',
      component: (resolve) => require(['@/pages/user/feedback'], resolve)
    },
    { // 用户列表
      path: '/userList',
      name: 'userList',
      component: (resolve) => require(['@/pages/user/userList'], resolve)
    },
    { // 上传调试页面
      path: '/upload',
      name: 'upload',
      component: (resolve) => require(['@/pages/user/upload'], resolve)
    }
  ]
})
