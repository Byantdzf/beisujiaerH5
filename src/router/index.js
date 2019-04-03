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
      path: '/registerMobile',
      name: 'registerMobile',
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
    {
      path: '/textareaData',
      name: 'textareaData',
      component: (resolve) => require(['@/pages/information/textareaData'], resolve)
    },
    {
      path: '/authentication', // 实名认证
      name: 'authentication',
      component: (resolve) => require(['@/pages/user/authentication'], resolve)
    },
    {
      path: '/information/:id',
      name: 'information',
      component: (resolve) => require(['@/pages/user/information'], resolve)
    },
    {
      path: '/introducer/:id',
      name: 'introducer',
      component: (resolve) => require(['@/pages/user/introducer'], resolve)
    },
    {
      path: '/activityDetail/:id',
      name: 'activityDetail',
      component: (resolve) => require(['@/pages/user/activityDetail'], resolve)
    },
    {
      path: '/activityPaySuccess/:id',
      name: 'activityPaySuccess',
      component: (resolve) => require(['@/pages/user/activityPaySuccess'], resolve)
    },
    {
      path: '/PreviewData',
      name: 'PreviewData',
      component: (resolve) => require(['@/pages/user/PreviewData'], resolve)
    },
    {
      path: '/uploadImage',
      name: 'uploadImage',
      component: (resolve) => require(['@/pages/user/uploadImage'], resolve)
    },
    {
      path: '/myFriend',
      name: 'myFriend',
      component: (resolve) => require(['@/pages/user/myFriend'], resolve)
    },
    {
      path: '/chatList',
      name: 'chatList',
      component: (resolve) => require(['@/pages/user/chatList'], resolve)
    }

  ]
})
