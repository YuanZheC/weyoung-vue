import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

// 在 其他路由,router.beforeEach 没有起作用
const router = new Router({
  // mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   redirect: '/login'
    // },
    {
      path: '/login',
      component: resolve => require(['../components/login.vue'], resolve)
    },
    {
    	path: '/',
    	component: resolve => require(['../components/Home.vue'],resolve),
    	children: [
    		{
    			path: '',
    			component: resolve => require(['../common/admin.vue'],resolve)
    		},
        {
          path: 'admin',
          redirect: '/'
        },
        {
          path: 'authority',
          component: resolve => require(['../common/authority.vue'],resolve)
        },
        {
          path: 'params',
          component: resolve => require(['../common/params.vue'],resolve)
        },
        {
          path: 'alert',
          component: resolve => require(['../common/alert.vue'],resolve)
        },
        {
          path: 'meeting',
          component: resolve => require(['../common/meeting.vue'],resolve)
        }
    	]
    }
  ]
})

export default router
