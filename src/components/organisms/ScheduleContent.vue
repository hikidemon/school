<template>
  <div class="schedule-page">
    <h1>Расписание занятий</h1>
    <div class="schedule-container">
      <div class="group-cards">
        <div v-for="group in groups" :key="group" class="group-card" :class="{ active: selectedGroup === group }"
          @click="selectGroup(group)">
          {{ group }}
        </div>
      </div>

      <div class="schedule-wrapper card">
        <schedule-table v-if="selectedGroup"  :key="selectedGroup" :isEditable="isEditable" :days="days" :groups="[selectedGroup]"
          :schedule="filteredSchedule" />
        <div v-else class="no-group-selected">
          Выберите группу для отображения расписания
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import ScheduleTable from '../molecules/ScheduleTable.vue'
import { scheduleService } from '@/common/utils/ScheduleService'
import { ScheduleItem } from '@/common/types/ScheduleItem'
import { authService } from '@/common/utils/AuthService'

const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
const groups = ref<string[]>([])
const schedule = ref<ScheduleItem[]>([])
const userRole = ref<string | null>(null)
const selectedGroup = ref<string | null>(null)

const filteredSchedule = computed(() => {
  if (!selectedGroup.value || !schedule.value) return []
  return schedule.value.filter((item) => item.group === selectedGroup.value)
})

const selectGroup = (group: string) => {
  console.log('Выбрана группа:', group)
  selectedGroup.value = group
}

const fetchUserRole = async () => {
  try {
    const [error, response] = await authService.check<{ id_role: string }>()

    if (error) throw error

    if (response?.data) {
      userRole.value = response.data.data.id_role
    }
  } catch (error) {
    console.error('Ошибка при проверке роли пользователя:', error)
  }
}

const isEditable = computed(() => {
  return userRole.value === 'admin' || userRole.value === 'teacher'
})

const fetchSchedule = async () => {
  try {
    const [error, response] = await scheduleService.getSchedule()

    if (error) throw error
      
    if (response?.data) {
      schedule.value = response.data.data
    } else {
      schedule.value = scheduleService.getDefaultSchedule()
    }

    console.log('Updated schedule:', schedule.value)
  } catch (error) {
    console.error('Ошибка при загрузке расписания:', error)

    schedule.value = scheduleService.getDefaultSchedule()

    console.log('Fallback to default schedule:', schedule.value)
  }
}

const fetchGroups = async () => {
  try {
    const [error, response] = await scheduleService.getGroups()

    if (error) throw error

    if (response?.data) {
      groups.value = response.data.data.groups
    } else {
      groups.value = ['Группа 1', 'Группа 2', 'Группа 3', 'Группа 3', 'Группа 3', 'Группа 3']
    }
  } catch (error) {
    console.error('Ошибка при загрузке групп:', error)

    groups.value = ['Группа 1', 'Группа 2', 'Группа 3',]
  }
}

onMounted(() => {
  fetchSchedule()

  fetchGroups()

  fetchUserRole()
})
</script>

<style scoped lang="scss">
.schedule-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  margin-right: auto;
  color: var(--color-black)-light;

}

.schedule-container {
  display: flex;
  width: 100%;
  max-width: 1600px;
  gap: 20px;
  align-items: flex-start;
  
}

.group-cards {
  width: 350px; 
  overflow-y: auto;
  scrollbar-width: none; 
  padding: 10px; 
  background: var(--color-white); 
  border-radius: 12px; 
  box-shadow: $box-shadow; 
  flex-shrink: 0;
}

.group-cards::-webkit-scrollbar {
  display: none; 
}

.group-card {
  padding: 16px; 
  margin-bottom: 12px; 
  background: var(--color-white);
  border-radius: 12px; 
  cursor: pointer;
  text-align: center;
  transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
  box-shadow:0 0 2px $color-emerald ;
  font-size: 1.1rem;
  font-weight: 500; 

  &:hover {
    background: darken($color-white, 5%);
    transform: translateY(-4px); 
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); 
  }

  &.active {
    background: $color-primary-gradient;
    color: var(--color-emerald);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  }
}

.schedule-wrapper {
  overflow-y: auto;
  flex-grow: 1;
  scrollbar-width: none;
}

.schedule-wrapper::-webkit-scrollbar {
  display: none;
}

.no-group-selected {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.2rem;
  color: var(--color-black)-light;
}

.card {
  position: relative;
  width: 100%;
  max-height: 80vh;
  padding: 13px;
  background: var(--color-white);
  border-radius: 12px;
  overflow: hidden;
  z-index: 0;
  box-shadow: $box-shadow;
}

.card::before {
  content: "";
  position: absolute;
  top: -1000px;
  left: -1000px;
  right: -1000px;
  bottom: -1000px;
  border-radius: 13px;
  background: conic-gradient(from 0deg, $color-primary-gradient, $color-emerald, $color-primary-gradient);
  z-index: -1;
  animation: rotate 13s linear infinite;
}

.card::after {
  content: "";
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border-radius: 13px;
  background: conic-gradient(from 0deg, $color-primary-gradient, $color-emerald, $color-primary-gradient);
  z-index: -2;
  filter: blur(8px);
  opacity: 0.7;
  animation: rotate 4s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
