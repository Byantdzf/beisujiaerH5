import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: (resolve) => require(['@/pages/404'], resolve)
    },
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
      name: 'personalData',
      component: (resolve) => require(['@/pages/information/personalData'], resolve)
    },
    {
      path: '/marriageData',
      name: 'marriageData',
      component: (resolve) => require(['@/pages/information/marriageData'], resolve)
    },
    {
      path: '/singleData',
      name: 'singleData',
      component: (resolve) => require(['@/pages/information/singleData'], resolve)
    },
    {
      path: '/textareaData',
      name: 'textareaData',
      component: (resolve) => require(['@/pages/information/textareaData'], resolve)
    }
  ]
})
