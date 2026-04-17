import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('index', () => {
  const username = ref(localStorage.getItem('username') || '')
  const token = ref(localStorage.getItem('token') || '')

  function loginSuccess(payload) {
    username.value = payload.username
    token.value = payload.token
    localStorage.setItem('username', payload.username)
    localStorage.setItem('token', payload.token)
  }

  function logout() {
    username.value = ''
    token.value = ''
    localStorage.removeItem('username')
    localStorage.removeItem('token')
  }

  return {
    username,
    token,
    loginSuccess,
    logout,
  }
})
