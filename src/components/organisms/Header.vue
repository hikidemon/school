<template>
  <header class="header">
    <a-image :src="Emerald" class="mini-avatar"/>
    <div class="logo">Изумрудный город</div>
    <div class="auth-buttons" v-if="!isAuthenticated">
      <a-button class="auth-button" @click="goToLogin">Войти</a-button>
      <a-button class="auth-button" @click="goToRegister">Регистрация</a-button>
    </div>
    <div class="profile" @mouseenter="expandAvatar" @mouseleave="shrinkAvatar">
      <a-image :src="user.avatarUrl || Avatar" alt="Профиль" :class="['avatar', { 'avatar-expanded': isAvatarExpanded }]" @click="toggleDropdown" />
      <dropdown-menu ref="dropdown"  :avatarUrl="user.avatarUrl || Avatar" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AImage from '../atoms/AImage.vue'
import DropdownMenu from '../molecules/DropdownMenu.vue'
import { AxiosService, API_CONFIG } from '@/common/utils/AxiosService'
import Avatar from '../../assets/icons/6.png'
import Emerald from '../../assets/icons/5.png'
import ProfileContent from '@/components/organisms/ProfileContent.vue'
import NewsContent from '@/components/organisms/NewsContent.vue'
import { useRouter } from 'vue-router'
import { ROUTE_NAMES } from '@/common/constants'
import { useAuthStore } from '@/store/AuthStore'

const dropdown = ref()
const isAvatarExpanded = ref(false)
const axiosService = new AxiosService(API_CONFIG)
const isAuthenticated = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const user = ref({
  avatarUrl: '', 
})

const fetchUserProfile = async () => {
  try {

    const [error, response] = await axiosService.axiosCall<{ avatarUrl: string }>({
      method: 'GET',
      url: '/user/profile', 
    })

    if (error) {
      throw error
    }

    if (response?.data?.data) {
      user.value.avatarUrl = response.data.data.avatarUrl
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных пользователя:', error)

    user.value.avatarUrl = Avatar
  }
}

onMounted(() => {
  fetchUserProfile()
})

const toggleDropdown = () => {
  dropdown.value.open()
}

const expandAvatar = () => {
  isAvatarExpanded.value = true
}

const shrinkAvatar = () => {
  isAvatarExpanded.value = false
}

const goToLogin = () => {
  router.push({ name: ROUTE_NAMES.AuthPage })
  authStore.togglePanel('signIn')
}

const goToRegister = () => {
  router.push({ name: ROUTE_NAMES.AuthPage })
  authStore.togglePanel('signUp')
}

defineProps({
  changePage: {
    type: Function,
    required: true,
  },
})
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: linear-gradient(90deg, #03ff89, #48f2b9, #6dedc2);
  animation: gradient-shift 4s linear infinite;
  
  color: white;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  justify-content: left;
  margin-left: 20px;
}

.profile {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s ease;
  transform: scale(1.6); 
}


.avatar-expanded {
  transform: scale(2); 
}
.auth-buttons {
  display: flex;
  gap: 0px;
  margin-left: auto;
  margin-right: 20px;
}

.auth-button {
  background-color: transparent;
  color: white;

  padding: 0px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  
}

.auth-button:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  background: linear-gradient(90deg, #03ff89, #48f2b9, #6dedc2);
  animation: gradient-shift 4s linear infinite;
}
</style>