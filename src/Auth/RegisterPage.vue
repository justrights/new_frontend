<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2>用户注册</h2>
      <form class="form-stack" @submit.prevent="register">
        <div>
          <label class="form-label" for="username">用户名</label>
          <input
            id="username"
            v-model="username"
            type="text"
            class="input"
            required
            autocomplete="username"
          />
        </div>
        <div>
          <label class="form-label" for="phone">手机号</label>
          <input
            id="phone"
            v-model="phone"
            type="text"
            class="input"
            required
            autocomplete="phone"
          />
        </div>
        <div>
          <label class="form-label" for="password">密码</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="input"
            required
            autocomplete="new-password"
          />
        </div>
        <div>
          <label class="form-label" for="confirmPassword">确认密码</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            class="input"
            required
            autocomplete="new-password"
          />
        </div>
        <button type="submit" class="btn btn--primary" style="width: 100%">注册</button>
      </form>
      <p class="foot">已有账号？<router-link to="/login">去登录</router-link></p>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import router from '../router'
import https from '../utils/https'

const username = ref('')
const password = ref('')
const phone = ref('')
const confirmPassword = ref('')

const register = async () => {
  //注册方法
  if (password.value != confirmPassword.value) {
    alert('两次密码不一致')
    return
  }

  const registerData = {
    username: username.value,
    password: password.value,
    phone: phone.value,
  }
  try {
    const response = await https.post('/auth/register', registerData)
    alert(response?.data || '注册成功')
    router.push('/login')
  } catch (error) {
    console.error('注册失败', error)

    const message = error?.response?.data?.message || error?.response?.data?.detail || '注册失败'

    alert(message)
  }
}
</script>
