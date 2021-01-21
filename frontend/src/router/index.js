import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Store from '../store/index'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/service-list',
    name: 'Service-list',
    component: () => import('../views/services/Service.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/service-info/:id',
    name: 'Service-info',
    component: () => import('../views/services/ServiceInfo.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('../views/services/Services.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/stocks',
    name: 'Stock',
    component: () => import('../views/stock/Stock.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('../views/reports/Reports.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/date-reports',
    name: 'Reports Date',
    component: () => import('../views/reports/ReportsDate.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  const rutaProtegida = to.matched.some(record =>  record.meta.requireAuth)
  if(rutaProtegida && store.state.token === ''){
    next({name: 'Login'})
  }else{
    next();
  }
})


export default router
