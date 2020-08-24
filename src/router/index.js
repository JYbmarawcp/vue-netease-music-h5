import Vue from 'vue'
import VueRouter from 'vue-router'

const Recommend = () => import('@/page/recommend')
const Singer = () => import('@/page/singer')
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend
  },
  {
    path: '/singer',
    name: 'Singer',
    component: Singer
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
