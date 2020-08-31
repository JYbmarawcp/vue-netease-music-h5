import Vue from 'vue'
import VueRouter from 'vue-router'

const Recommend = () => import('@/page/recommend')
const Video = () => import('@/page/video')
const PlaylistDetail = () => import("@/page/playlist-detail")
const Search = () => import("@/page/search")
const Rank = () => import("@/page/rank")

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
        props: true,
        component: PlaylistDetail
      },
    ]
  },
  {
    path: '/video',
    name: 'Video',
    component: Video
  },
  {
    path: '/rank',
    name: 'Rank',
    component: Rank
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
