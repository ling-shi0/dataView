import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import application_per from '../components/application_per'
import echarts from 'echarts'
Vue.use(Router)
Vue.use(echarts)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/application_per',
      name: 'application_per',
      component: application_per
    }
  ]
})
