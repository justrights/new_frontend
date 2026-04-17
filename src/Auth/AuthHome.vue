<template>
  <div class="home-page">
    <!-- 首页内容 -->
    <header class="header">
      <div class="logo">
        <img :src="Panda" alt="xiongmao" class="logo-img" />
        <span class="brand-name">熊猫外卖</span>
      </div>
      <nav class="nav">
        <ul v-if="isLogin">
          <li>
            <router-link to="/profile">{{ displayName }}</router-link>
          </li>

          <li v-if="isMerchant">
            <router-link to="/merchant">商家中心</router-link>
          </li>

          <li v-if="isRider">
            <router-link to="/rider">骑手中心</router-link>
          </li>

          <!-- 添加查看订单按钮 -->
          <li><router-link to="/orders">查看订单</router-link></li>

          <li>
            <button type="button" class="btn btn--secondary btn--sm nav-logout" @click="logout">
              退出登录
            </button>
          </li>
        </ul>
        <ul v-else>
          <li><router-link to="/login">登录</router-link></li>
          <li><router-link to="/register">注册</router-link></li>
        </ul>
      </nav>
    </header>

    <div class="background"></div>

    <ul class="main-entrance">
      <li class="first-li">
        <a v-if="!isLogin" class="first-a" @click="$router.push('/login')">
          <h3 class="entry-tit">我要入驻</h3>
          <p class="line2">请先登录</p>
        </a>

        <a v-else-if="!myApp" class="first-a" @click="openJoin">
          <h3 class="entry-tit">我要入驻</h3>
          <p class="line2">商家、配送、城市代理、服务市场</p>
        </a>

        <a v-else-if="myApp.status === 'PENDING'" class="first-a" @click="loadMyApplication">
          <h3 class="entry-tit">入驻申请审核中</h3>
          <p class="line2">请等待管理员审核（点击刷新）</p>
        </a>

        <a v-else-if="myApp.status === 'REJECTED'" class="first-a" @click="openJoin">
          <h3 class="entry-tit">申请被驳回</h3>
          <p class="line2">原因：{{ myApp.rejectReason || '无' }}（点击重新提交）</p>
        </a>

        <a v-else-if="myApp.status === 'APPROVED'" class="first-a" @click="goCenter">
          <h3 class="entry-tit">入驻成功</h3>
          <p class="line2">点击进入中心</p>
        </a>
      </li>
      <li class="second-li">
        <a class="second-a" @click="checkLoginAndRedirect('/SelectMerchantPage')">
          <h3 class="entry-tit">我要点外卖</h3>
          <p class="line2">支持查看商家评分、月售和基本信息</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores'
import router from '../router'
import { onMounted, ref } from 'vue'
import Panda from '@/assets/panda.jpg'
import https from '../utils/https'

const store = useUserStore()

const currentUser = ref('')
const isLogin = ref(false)
const displayName = ref('')
const roleName = ref('')
const isMerchant = ref(false)
const isRider = ref(false)

if (store.token) {
  isLogin.value = true
}

onMounted(async () => {
  if (!store.token) return
  try {
    const { data } = await https.get('/auth/me')
    currentUser.value = data
    isLogin.value = true
    displayName.value = data.name || data.username || store.username
    roleName.value = data.role || ''
    isMerchant.value = data.role === 'MERCHANT'
    isRider.value = data.role === 'RIDER'
  } catch (error) {
    console.error('获取当前用户失败', error)
    logout()
  }
})

const logout = () => {
  store.logout()

  isLogin.value = false
  roleName.value = ''
  isMerchant.value = false
  isRider.value = false

  router.push('/')
}
</script>
<style scoped>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 10px 20px;
  background-color: transparent;
  transition: background-color 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
.header.scrolled {
  background-color: #fff;
}

.logo {
  display: flex;
  align-content: center;
}
.logo-img {
  width: 40px;
  height: auto;
  margin: 10px;
}

.brand-name {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  align-content: center;
}

.username:hover {
  color: #f39c12;
  cursor: pointer;
}

.nav {
  align-content: center;
}
.nav ul {
  display: flex;
  list-style: none;
  align-items: center;
}
.nav li {
  margin-left: 20px;
}
.nav a {
  text-decoration: none;
  color: #333;
  font-size: 16px;
  font-weight: normal;
}
.nav a:hover {
  color: #f39c12;
  cursor: pointer;
}
.home-page {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.main-entrance {
  align-items: center;
  width: 666px;
  height: 170px;
  bottom: 0px;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  display: flex;
  list-style: none;
  font-size: 16px;

  z-index: 1;
}
.main-entrance li {
  position: relative;
  overflow: hidden;
  height: 170px;
  width: 333px;
}
/* 在固定高度的 li 内缩放链接，避免超出视口产生滚动条 */
.main-entrance li:hover .first-a,
.main-entrance li:hover .second-a {
  transform: scale(1.06);
}
.first-a,
.second-a {
  transition: transform 0.2s ease;
  transform-origin: center center;
}
.first-a {
  align-content: center;
  position: absolute;
  text-decoration: none;
  display: block;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  cursor: pointer;
}
.second-a {
  align-content: center;
  position: absolute;
  text-decoration: none;
  display: block;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  cursor: pointer;
}
.first-li {
  background-color: rgba(37, 37, 200, 1);
  align-content: center;
}
.second-li {
  background-color: rgb(192, 122, 18, 1);
  align-content: center;
}
h3 {
  color: hsla(0, 0%, 100%, 0.8);
  font-size: 26px;
}
p {
  color: hsla(0, 0%, 100%, 0.8);
}

.background {
  left: 0;
  right: 0;
  text-align: center;
  height: 100vh;
  width: auto;
  display: flex;
  justify-content: center;
  align-content: center;
  background-image: url('@/assets/panda.jpg');
  background-size: cover;
  background-position: center;
}
.modal-mask {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  width: 420px;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
}

.choose button {
  margin-right: 12px;
}

.form input,
.form select {
  width: 100%;
  margin: 8px 0;
  padding: 8px;
}

.actions {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
}

.msg {
  margin-top: 8px;
  color: #d33;
}

.close {
  margin-top: 12px;
  text-align: right;
}

.announcement-bar {
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  z-index: 90;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: transparent;
  color: #fff;
  font-size: 13px;
  line-height: 1.4;
  box-shadow: none;
  pointer-events: none;
  text-shadow: 0 1px 8px rgba(15, 23, 42, 0.45);
}

.announcement-bar__tag {
  flex-shrink: 0;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(15, 23, 42, 0.3);
}

.announcement-bar__marquee {
  flex: 1;
  overflow: hidden;
  min-width: 0;
}

.announcement-bar__text {
  display: inline-block;
  white-space: nowrap;
  animation: announce-scroll 22s linear infinite;
}

@keyframes announce-scroll {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
