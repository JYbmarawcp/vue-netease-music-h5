import Vue from 'vue'
import VueRouter from 'vue-router'

const Recommend = () => import('@/page/recommend')
const Singer = () => import('@/page/singer')
const PlaylistDetail = () => import("@/page/playlist-detail")

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend,
    children: [
      {
        path: 'playlist/:id',
        component: PlaylistDetail
      },
    ]
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
