import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import noactive from '@/components/noactive'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
    	path: '/noactive',
    	name: 'noactive',
    	component: noactive
    }
  ]
})
