import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/library',
    component: () => import('@/views/LibraryView.vue')
  },
  {
    path: '/now-playing',
    component: () => import('@/views/NowPlayingView.vue')
  }
]

export default new VueRouter({
  mode: 'hash',
  routes
})
