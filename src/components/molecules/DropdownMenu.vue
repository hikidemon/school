<template>
  <div class="dropdown-menu" v-if="isOpen" @mouseleave="close">
    <div class="avatar-section">
      <div class="avatar-wrapper">
        <img :src="avatarUrl" alt="Аватар" class="large-avatar" />
        <div class="edit-icon" @click="handleEditAvatar">
          <span>✏️</span>
        </div>
      </div>
    </div>
    <ul>
      <li class="dropdown-item" @click="goToProfile">
        <span>Личный кабинет</span>
      </li>
      <li class="dropdown-item" @click="handleItemClick('Настройки')">
        <span>Настройки</span>
      </li>
      <li class="dropdown-item" @click="handleItemClick('Выйти')">
        <span>Выйти</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineExpose } from 'vue'
import { useRouter } from 'vue-router'
import { ROUTE_NAMES } from '@/common/constants'

const props = defineProps({
  avatarUrl: {
    type: String,
    required: true
  }
})
const router = useRouter()

const goToPosts = () => {
  router.push({ name: ROUTE_NAMES.NewsContent })
}

const goToProfile = () => {
  router.push({ name: ROUTE_NAMES.ProfileContent })

  close()
}

const isOpen = ref(false)

const handleItemClick = (item: string) => {
  console.log('Выбран пункт:', item)

  close()
}

const handleEditAvatar = () => {
  console.log('Редактирование аватарки')

  close()
}

const open = () => {
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}

defineExpose({ open, close })
</script>

<style scoped lang="scss">
.dropdown-menu {
  $primary: $glass-primary-color;
  $secondary: $glass-secondary-color;
  position: absolute;
  top: 50px;
  right: 0;
  background: linear-gradient(
    145deg,
    rgba($secondary, 0.8) 0%,
    rgba($primary, 0.9) 100%
  );
 
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 200px;
  padding: 16px;
  
}

.avatar-section {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.avatar-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
}

.large-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.edit-icon {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: $color-emerald;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-icon:hover {
  background-color: $color-emerald;
}

.edit-icon span {
  font-size: 14px;
  color: var(--color-white);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-item {
  @include glass-button();
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 12px;
  border:none;
}

.dropdown-item:hover {
  
  border-radius: 12px;
}

.dropdown-item span {
  font-size: 0.9rem;
  color: var(--color-black);
  border-radius: 12px;
}
</style>
