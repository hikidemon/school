<template>
  <div>

    <ScheduleTable :filter="selectedTeacher" :schedule-data="scheduleData" :is-loading="isLoading" :error="error" :is-admin="isAdmin" @edit-schedule="handleEditSchedule" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ScheduleTable from '@/components/molecules/ScheduleTable.vue';
import { ElNotification } from 'element-plus';
import { scheduleService } from '@/common/utils/ScheduleService';
import { authService } from '@/common/utils/AuthService';
import { useAuthStore } from '@/store/authStore'

interface ScheduleItem {
  id: number;
  // Add other properties as needed
}

interface Subject {
  id: number;
  // Add other properties as needed
}

const selectedTeacher = ref<string | number>('');
const teachers = ref([
  { value: 1, label: 'Иванов И.И.' },
  { value: 2, label: 'Петров П.П.' },
]);

const isLoading = ref(false);
const error = ref<string | null>(null);
const isAdmin = ref(false);
const scheduleData = ref<ScheduleItem[]>([]);
const subjects = ref<Subject[]>([]);

// Fetch schedule data
const fetchSchedule = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    const [err, response] = await scheduleService.getSchedule(selectedTeacher.value);
    if (!err && response?.data) {
      scheduleData.value = response.data;
    } else {
      throw new Error(err?.message || 'Failed to fetch schedule');
    }
  } catch (err) {
    console.error('Ошибка при загрузке расписания:', err);
    error.value = err.message;
    ElNotification({
      title: 'Ошибка',
      message: error.value,
      type: 'error',
      position: 'bottom-right',
    });
  } finally {
    isLoading.value = false;
  }
};

// Fetch available subjects
const fetchSubjects = async () => {
  try {
    const [err, response] = await scheduleService.getSubjects();
    if (!err && response?.data) {
      subjects.value = response.data;
    }
  } catch (err) {
    console.error('Ошибка при загрузке предметов:', err);
  }
};

// Admin schedule editing
const handleEditSchedule = async (updatedSchedule: ScheduleItem) => {
  try {
    const [err, response] = await scheduleService.updateScheduleItem(updatedSchedule);
    if (!err && response?.data) {
      const index = scheduleData.value.findIndex((item) => item.id === updatedSchedule.id);
      if (index !== -1) {
        scheduleData.value[index] = response.data;
      }
      ElNotification({
        title: 'Успех',
        message: 'Расписание успешно обновлено',
        type: 'success',
        position: 'bottom-right',
      });
    }
  } catch (err) {
    console.error('Ошибка при обновлении расписания:', err);
    ElNotification({
      title: 'Ошибка',
      message: err.message,
      type: 'error',
      position: 'bottom-right',
    });
  }
};
const auth = useAuthStore()

// Check admin status
onMounted(async () => {
  if (auth.isAdmin) {
  isAdmin.value=true
  console.log('Он админ 🔥')
}
  await fetchSubjects();
  await fetchSchedule();
});
</script>

<style lang="scss" scoped>
h1{
  @include glass-text();
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--color-dark)-light;
}
</style>