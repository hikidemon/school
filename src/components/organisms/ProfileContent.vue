<template>
  <div class="main-layout">
    <admin-panel v-if="isAdmin" />
    <div v-else class="left-side">
      <profile-card />
    </div>
    <div class="right-side">
      <toggle-panel class="toggle-container" v-model="showSchedule" @toggle-view="toggleView" />
      <div class="content">
        <schedule-card v-if="showSchedule" />
        <event-card v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProfileCard from '../molecules/ProfileCard.vue'
import ScheduleCard from '../molecules/ScheduleCard.vue'
import EventCard from '../molecules/EventCard.vue'
import TogglePanel from '../molecules/TogglePanel.vue'
import AdminPanel from '@/components/organisms/AdminPanel.vue'
import { authService } from '@/common/utils/AuthService'
import { useAuthStore } from '@/store/authStore'

const showSchedule = ref(true)
const isAdmin = ref(false)
const auth = useAuthStore()

const toggleView = (value: boolean) => {
  showSchedule.value = value
}

const checkAdminRole = async () => {
  if (auth.isAdmin) {
  isAdmin.value=true
  console.log('Он админ 🔥')
}
}

onMounted(() => {
  checkAdminRole()
})
</script>

<style scoped lang="scss">
.main-layout {
  display: flex;
  padding: 20px;
  gap: 20px;
}

.left-side {
  width: 300px;
}

.right-side {
  flex: 2;
  margin-left: 325px;
  display: flex;
  flex-direction: column;
}

.toggle-container {
  display: flex;
  margin-bottom: 0px;
  width: 140%;
  margin-left: -20%;
}

.toggle-button {
  padding: 0px;
  color: var(--color-white);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.toggle-container .toggle-button:first-child {
  margin-right: 10px;
}

.content {
  width: 500px;
  padding: 20px;
  border-radius: 8px;
}
</style>
