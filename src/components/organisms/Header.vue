<template>
  <header class="header">
    <a-image :src="Emerald"/>
    <div class="logo">Изумрудный город</div>
    <div class="profile" @mouseenter="expandAvatar" @mouseleave="shrinkAvatar">
      <a-image :src="user.avatarUrl || Avatar" alt="Профиль"     :class="['avatar', { 'avatar-expanded': isAvatarExpanded }]" @click="toggleDropdown" />
      <dropdown-menu ref="dropdown" :avatarUrl="user.avatarUrl || Avatar" />
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

const dropdown = ref()
const isAvatarExpanded = ref(false)
const axiosService = new AxiosService(API_CONFIG)

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
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: var(--color-primary);
  color: white;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  justify-content: left;
  margin-left: -1200px;
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
}

.avatar-expanded {
  transform: scale(1.2); 
}
</style>