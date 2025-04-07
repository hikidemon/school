<template>
  <div class="admin-panel">
    <h2>Управление расписанием</h2>
    <a-button type="primary" @click="handleAdd">Добавить урок</a-button>
  </div>
</template>

<script setup lang="ts">
import { ScheduleItem } from '@/common/types/ScheduleItem'

const emit = defineEmits(['add'])

const handleAdd = () => {
  emit('add', {
    id: '',
    day: '',
    time: '',
    subject: '',
    teacher: '',
    group: ''
  })
}
</script>

<style scoped lang="scss">
.admin-panel {
  margin-bottom: 20px;
}
</style>
