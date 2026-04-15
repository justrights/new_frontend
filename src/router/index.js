import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '@/Auth/LoginPage.vue'
//创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: LoginPage,
      component: LoginPage,
    },
  ],
})

export default router
