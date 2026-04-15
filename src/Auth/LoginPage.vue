<template>
  <div class="login_page">
    <div class="login">
      <h2>用户登录</h2>
      <form class="from_submit" @submit.prevent="login">
        <div>
          <label class="form_label" for="username">用户名</label>
          <input id="username" v-model="username" type="text" required autocomplete="username" />
        </div>
        <div>
          <label class="form_label" for="password">密码</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            autocomplete="current_password"
          />
        </div>
        <button type="submit" class="btn_submit">登录</button>
      </form>
      <p class="foot">没有账号？<router-link to="RegisterPage">去注册</router-link></p>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/index'
import { useRouter } from 'vue-router'
import axios from 'axios'

const username = ref('')
const password = ref('')
const isLogin = ref(false)

const store = useUserStore()
const router = useRouter()

username.value = localStorage.getItem('username')

if (username.value) {
  //如果有数据表明已登录
  isLogin.value = true

  store.loginSuccess({
    //把数据传到本地
    username: username.value,
    token: localStorage.getItem('token'),
  })
}

const login = async () => {
  const loginData = {
    //要给后端发送的数据
    username: username.value,
    password: password.value,
  }

  try {
    //向后端发送登录请求
    const response = await axios.post(
      //返回的数据放在data里
      'http://localhost:8080/auth/login',
      loginData,
    )
    //从后端返回结果拿到token
    const token = response?.data?.token

    //如果登录失败提示并退出
    if (!response?.data?.succes || !token) {
      alert(response?.data?.message || '登录失败')
      return
    }

    //登录成功保存状态
    store.loginSuccess({
      token: token,
      username: username.value,
    })

    //获取角色
    await store.fetchRoles()

    //跳转到首页
    router.push('/')
  } catch (error) {
    const msg = error?.response?.data?.message || '登录失败'
    alert(msg)
    console.error(error)
  }
}
</script>

<style></style>
