import Vue from 'vue'
import Router from 'vue-router'
import application_per from '../components/application_per'
import join from '../components/join'
import top from '../components/top'
import ywComparaSorce from '../components/ywComparaSorce'
import index from '../pages/index'
import echarts from 'echarts'
Vue.use(Router)
Vue.use(echarts)
export default new Router({
  routes: [
    {
      path:'/',
      name:'index',
      component: index
    },
    {
      path: '/application_per',
      name: 'application_per',
      component: application_per
    },
    {
      path:'/join',
      name:'join',
      component: join
    },
    {
      path:'/top',
      name:'top',
      component:top
    },
    {
      path:'/ywCompareScore',
      name:'ywCompareScore',
      component:ywComparaSorce
    }
  ]
})
