<template>
  <div class="page-shell page-shell--narrow">
    <header class="top-nav">
      <router-link class="top-nav__brand" to="/">← 首页</router-link>
    </header>
    <h1 class="page-title">个人资料</h1>

    <div v-if="loading" class="card card--pad profile-card">
      <div class="avatar-box">
        <img v-if="avatarUrl" :src="avatarUrl" class="avatar" alt="头像" />
        <div v-else class="avatar placeholder">暂无头像</div>
      </div>

      <div class="form-stack">
        <div>
          <label class="form-label" for="pf-name">昵称</label>
          <input id="pf-name" class="input" :value="name" type="text" placeholder="请输入昵称" />
        </div>

        <div>
          <label class="form-label" for="pf-email">邮箱</label>
          <input
            id="pf-email"
            v-model="email"
            class="input"
            type="email"
            placeholder="请设置邮箱"
          />
        </div>

        <div>
          <label class="form-label" for="pf-phone">手机号</label>
          <input id="pf-phone" v-model="phone" class="input" />
        </div>

        <div>
          <label class="form-label" for="pf-avatar">上传头像</label>
          <input
            id="pf-avatar"
            class="input"
            type="file"
            accept="image/*"
            @change="onAvatarSelected"
          />
          <p class="avatar-tip">选择本地图片后保存即可更新头像。</p>
        </div>
      </div>

      <div class="btn-row">
        <button type="button" class="btn btn--primary" :disabled="saving" @click="save">
          保存
        </button>
        <button type="button" class="btn btn--secondary" :disabled="saving" @click="reset">
          取消
        </button>
        <button type="button" class="btn btn--secondary" @click="$router.push('/address')">
          管理收货地址
        </button>
      </div>

      <p v-if="message" class="hint">{{ message }}</p>
    </div>

    <div v-else class="empty-state">加载中…</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '../stores'
import https from '../utils/https'

const store = useUserStore()

const loading = ref(false) //判断是否加载成功
const saving = ref(false) //控制按钮能否点击，防止多次重复提交
const message = ref('')
const name = ref('')
const phone = ref('')
const email = ref('')
const avatarUrl = ref('') //头像地址
const avatarFile = ref('') //暂存头像地址
const localAvatarPreviewUrl = ref('') // 本地预览地址

onMounted(async () => {
  if (!store.token) return

  try {
    const { data } = await https.get('/auth/profile')
    loading.value = true
    name.value = data?.name || ''
    phone.value = data?.phone || ''
    email.value = data?.email || ''
    avatarUrl.value = data?.avatarUrl || ''
  } catch (error) {
    console.error('获取当前用户失败', error)
  }
})

const revokeAvatarPreview = () => {
  //释放旧预览
  if (localAvatarPreviewUrl.value) {
    URL.revokeObjectURL(localAvatarPreviewUrl.value)
    localAvatarPreviewUrl.value = ''
  }
}

const onAvatarSelected = (event) => {
  //选择头像
  const file = event.target.files && event.target.files[0]
  if (!file) return

  avatarFile.value = file
  revokeAvatarPreview()
  localAvatarPreviewUrl.value = URL.createObjectURL(file)
}

const uploadAvatarIfNeeded = async () => {
  if (!avatarFile.value) return

  const formData = new FormData()
  formData.append('file', avatarFile.value)

  const response = await https.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  avatarUrl.value = response.data.imageUrl || ''
  avatarFile.value = null
  revokeAvatarPreview()
}

const save = async()=>{
  const message = ref('')
  try{
    await uploadAvatarIfNeeded()
    const res = await https.put
  }
}

const save = () => {}
const reset = () => {}
</script>
