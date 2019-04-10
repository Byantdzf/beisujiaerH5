import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    // {
    //   path: '*',
    //   component: (resolve) => require(['@/tabBar/home'], resolve)
    // },
    {
      path: '/',
      name: 'home',
      component: (resolve) => require(['@/tabBar/home'], resolve)
    },
    {
      path: '/activity',
      name: 'activity',
      component: (resolve) => require(['@/tabBar/activity'], resolve)
    },
    {
      path: '/chitchat',
      name: 'chitchat',
      component: (resolve) => require(['@/tabBar/chitchat'], resolve)
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
      path: '/personalData',
      meta: {
        keepAlive: true // 需要被缓存
      },
      name: 'personalData',
      component: (resolve) => require(['@/pages/information/personalData'], resolve)
    },
    {
      path: '/marriageData',
      name: 'marriageData',
      meta: {
        keepAlive: true // 需要被缓存
      },
      component: (resolve) => require(['@/pages/information/marriageData'], resolve)
    },
    {
      path: '/singleData',
      name: 'singleData',
      meta: {
        keepAlive: true// 需要被缓存
      },
      component: (resolve) => require(['@/pages/information/singleData'], resolve)
    },
    { // 编辑资料
      path: '/textareaData',
      name: 'textareaData',
      component: (resolve) => require(['@/pages/information/textareaData'], resolve)
    },
    {
      path: '/authentication', // 实名认证
      name: 'authentication',
      component: (resolve) => require(['@/pages/user/authentication'], resolve)
    },
    { // 单身详情
      path: '/information/:id',
      name: 'information',
      component: (resolve) => require(['@/pages/user/information'], resolve)
    },
    { // 介绍人详情
      path: '/introducer/:id',
      name: 'introducer',
      component: (resolve) => require(['@/pages/user/introducer'], resolve)
    },
    { // 活动详情
      path: '/activityDetail/:id',
      name: 'activityDetail',
      component: (resolve) => require(['@/pages/user/activityDetail'], resolve)
    },
    { // 活动报名成功
      path: '/activityPaySuccess/:id',
      name: 'activityPaySuccess',
      component: (resolve) => require(['@/pages/user/activityPaySuccess'], resolve)
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
    { // 好友列表
      path: '/myFriend',
      name: 'myFriend',
      component: (resolve) => require(['@/pages/user/myFriend'], resolve)
    },
    {  // 升级VIP
      path: '/upgrade',
      name: 'upgrade',
      component: (resolve) => require(['@/pages/user/upgrade'], resolve)
    },
    { // 聊天列表
      path: '/chatList/:type',
      name: 'chatList',
      component: (resolve) => require(['@/pages/user/chatList'], resolve)
    },
    { // 意见反馈
      path: '/feedback',
      name: 'feedback',
      component: (resolve) => require(['@/pages/user/feedback'], resolve)
    },
    { // 聊天
      path: '/chitchat/:id',
      name: 'chitchatDetail',
      component: (resolve) => require(['@/pages/user/chitchat'], resolve)
    },
    { // 系统消息
      path: '/news',
      name: 'news',
      component: (resolve) => require(['@/pages/user/news'], resolve)
    },
    { // 上传身份证
      path: '/uploadIdCard',
      name: 'uploadIdCard',
      component: (resolve) => require(['@/pages/user/uploadIdCard'], resolve)
    }
  ]
})
