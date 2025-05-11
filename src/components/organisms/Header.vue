<template>
  <header class="header">
    <div class="auth-buttons" v-if="!isAuthenticated">
      <a-button class="auth-button" @click="goToLogin">Войти</a-button>
      <a-button class="auth-button" @click="goToRegister">Регистрация</a-button>
    </div>
    <label class="switch">
      <input type="checkbox" :cheked="isDarkTheme" @change="toggleTheme" />
      <span class="slider">
        <transition name="fade-slide" mode="out-in">
          <component
            :is="isDarkTheme ? moon : emerald"
            class="theme-icon"
            :class="{ 'dark-icon': isDarkTheme }"
            key="theme-icon"
          />
        </transition>
      </span>
    </label>
    <div class="profile" @mouseenter="expandAvatar" @mouseleave="shrinkAvatar">
      <a-image
        :src="user.avatarUrl || Avatar"
        alt="Профиль"
        :class="['avatar', { 'avatar-expanded': isAvatarExpanded }]"
        @click="toggleDropdown"
      />
      <div class="avatar-halo"></div>

      <dropdown-menu ref="dropdown" :avatarUrl="user.avatarUrl || Avatar" />
      <div class="avatar-halo"></div>

    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, inject, Ref } from 'vue'
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
import emerald from '@/assets/icons/emerald.svg'
import moon from '@/assets/icons/moon.svg'
import '@/assets/styles/_dark-theme.scss'

const dropdown = ref()
const isAvatarExpanded = ref(false)
const axiosService = new AxiosService(API_CONFIG)
const isAuthenticated = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const isDarkTheme = inject('isDarkTheme') as Ref<boolean>
const toggleTheme = inject('toggleTheme') as () => void

const user = ref({
  avatarUrl: ''
})

const fetchUserProfile = async () => {
  try {
    const [error, response] = await axiosService.axiosCall<{ avatarUrl: string }>({
      method: 'GET',
      url: '/user/profile'
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

  const savedTheme = localStorage.getItem('theme')

  isDarkTheme.value = savedTheme === 'dark'

  if (isDarkTheme.value) {
    document.documentElement.classList.add('dark-theme')
  } else {
    document.documentElement.classList.remove('dark-theme')
  }
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
    required: true
  }
})
</script>

<style scoped lang="scss">
.switch {
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 2em;
  margin-right: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-black);
  transition: 0.4s;
  border-radius: 30px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
}

.theme-icon {
  width: 1.4em;
  height: 1.4em;
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;
  filter: drop-shadow(0 0 6px $color-emerald);
}

.dark-icon {
  transform: translateX(1.5em);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(10%) rotate(-360deg);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(10%) rotate(360deg);
}

.header {
  $padding: 8px 16px;
  $border-radius: 18px;
  $primary: $glass-primary-color;
  $secondary: $glass-secondary-color;
  $blur: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  //background: linear-gradient(90deg, $color-primary-gradient);
  animation: gradient-shift 4s linear infinite;
  color: var(--color-white);
  padding: $padding;

  background: $iceglass;
  backdrop-filter: blur($blur);
  -webkit-backdrop-filter: blur($blur);
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.3),
    inset 0 1px 1px rgba(255, 255, 255, 0.1),
    0 0 10px rgba($glass-accent-color, 0.2);
  transform: translateZ(10px);
  transition: 
    transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    box-shadow 0.3s ease;
 
  position: relative;
  
 
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  justify-content: left;
  margin-right: auto;
  
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
   width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  z-index: 2;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.3),
    inset 0 0 20px rgba(50, 220, 180, 0.4);
}

.avatar-halo {
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(50, 220, 180, 0.7) 180deg,
    rgba(255, 255, 255, 0.9) 360deg
  );
  z-index: 1;
  filter: blur(6px);
  animation: rotate-halo 8s linear infinite;
  opacity: 0.8;
}
@include glass-animations();
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
  color: var(--color-white);
  @include glass-button();
  padding: 0px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}



</style>
