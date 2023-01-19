import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/enroll',
    name: 'enroll',
    component: () => import('@/views/EnrollView.vue')
  },
  {
    path: '/cat',
    name: 'cat',
    component: () => import('@/views/CatView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/me',
    name: 'me',
    component: () => import('@/views/MeView.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
