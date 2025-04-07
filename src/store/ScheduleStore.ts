import { defineStore } from 'pinia';
import { ref } from 'vue';
import { scheduleService } from '@/common/utils/scheduleService';

export const useScheduleStore = defineStore('schedule', () => {
  const schedule = ref([]);
  const isAdmin = ref(false);

  async function fetchSchedule() {
    const response = await scheduleService.getSchedule();
    schedule.value = response.data;
  }

  async function fetchGroups() {
    const response = await scheduleService.getGroups();
    // Обработка групп
  }

  async function updateScheduleItem(item) {
    await scheduleService.updateScheduleItem(item);
    await fetchSchedule();
  }

  async function deleteScheduleItem(id) {
    await scheduleService.deleteScheduleItem(id);
    await fetchSchedule();
  }

  async function addScheduleItem(item) {
    // Логика добавления
    await fetchSchedule();
  }

  async function checkAdmin() {
    const response = await scheduleService.check();
    isAdmin.value = response.data.id_role === 'admin';
  }

  return {
    schedule,
    isAdmin,
    fetchSchedule,
    fetchGroups,
    updateScheduleItem,
    deleteScheduleItem,
    addScheduleItem,
    checkAdmin
  };
});