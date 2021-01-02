import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Service from '@/components/Service.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:serviceId',
    name: 'Service',
    component: Service
  },
  {
    path: '/',
    name: 'Home',
    component: Service
  }
  /* {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about"  '../views/About.vue')
  } */
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
