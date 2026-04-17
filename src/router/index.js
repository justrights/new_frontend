import { createRouter, createWebHistory } from 'vue-router'

import AuthHome from '../Auth/AuthHome.vue'
import LoginPage from '@/Auth/LoginPage.vue'
import RegisterPage from '../Auth/RegisterPage.vue'
import ProfilePage from '../Auth/ProfilePage.vue'

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
    {
      path: '/profile',
      name: ProfilePage,
      component: ProfilePage,
    },
  ],
})

export default router
