import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/channel/:id',
    name: 'ChannelDetails',
    component: () => import('../views/ChannelDetails.vue')
  },
  {
    path: '/video/:id',
    name: 'VideoDetails',
    component: () => import('../views/VideoDetails.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
