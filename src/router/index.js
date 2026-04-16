import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '@/Auth/LoginPage.vue'
import RegisterPage from '../Auth/RegisterPage.vue'
import AuthHome from '../Auth/AuthHome.vue'
//创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: AuthHome,
      component: AuthHome,
    },
    {
      path: '/login',
      name: LoginPage,
      component: LoginPage,
    },
    {
      path: '/register',
      name: RegisterPage,
      component: RegisterPage,
    },
  ],
})

export default router
