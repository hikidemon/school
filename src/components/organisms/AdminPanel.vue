<template>
  <div class="admin-panel">
    <el-card class="admin-card">
      <h2>Управление пользователями</h2>
      <user-management :users="users" @edit-user="handleEditUser" @delete-user="handleDeleteUser" />
    </el-card>

    <el-card class="admin-card">
      <h2>Управление расписанием</h2>
      <schedule-management
        :schedule="schedule"
        @add-schedule="handleAddSchedule"
        @edit-schedule="handleEditSchedule"
        @delete-schedule="handleDeleteSchedule"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UserManagement from '@/components/molecules/AdminUserEdit.vue'
import ScheduleManagement from '@/components/molecules/AdminScheduleEdit.vue'
import { userService } from '../../common/utils/UserService'
import { scheduleService } from '@/common/utils/ScheduleService'
import { User } from '@/common/types/User'
import { ScheduleItem } from '@/common/types/ScheduleItem'
import { authService } from '@/common/utils/AuthService'
import { useAuthStore } from '@/store/authStore'

const users = ref<User[]>([])
const schedule = ref<ScheduleItem[]>([])
const isAdmin=ref(true)
const auth = useAuthStore()

const loadData = async () => {
  try {
    if (auth.isAdmin) {
  isAdmin.value=true
  console.log('Он админ 🔥')
}

    const [userError, userResponse] = await userService.getUser('userId')

    if (!userError && userResponse?.data) {
      users.value = [userResponse.data]
    } else {
      users.value = [userService.getDefaultUser()]
    }

    const [scheduleError, scheduleResponse] = await scheduleService.getSchedule()

    if (!scheduleError && scheduleResponse?.data) {
      schedule.value = scheduleResponse.data.data
    } else {
      schedule.value = scheduleService.getDefaultSchedule()
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error)

    users.value = [userService.getDefaultUser()]

    schedule.value = scheduleService.getDefaultSchedule()
  }
}

const handleEditUser = (user: User) => {
  console.log('Редактирование пользователя:', user)
}

const handleDeleteUser = (user: User) => {
  users.value = users.value.filter((u) => u.id !== user.id)

  console.log('Пользователь удален:', user)
}

const handleAddSchedule = () => {
  console.log('Добавление нового занятия')
}

const handleEditSchedule = (item: ScheduleItem) => {
  console.log('Редактирование занятия:', item)
}

const handleDeleteSchedule = (item: ScheduleItem) => {
  schedule.value = schedule.value.filter((s) => s.id !== item.id)

  console.log('Занятие удалено:', item)
}

onMounted(() => {
  loadData()
})
</script>

<style scoped lang="scss">
.admin-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.admin-card {
  background: var(--color-white);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  h2 {
    margin-bottom: 20px;
    font-size: 1.5rem;
    color: var(--color-emerald);
    text-align: center;
  }
}
</style>
