<template>
  <div class="schedule-management">
    <el-button type="primary" @click="addSchedule">Добавить занятие</el-button>
    <el-table :data="filteredSchedule" stripe style="width: 100%">
      <el-table-column prop="day" label="День" />
      <el-table-column prop="time" label="Время" />
      <el-table-column prop="subject" label="Предмет" />
      <el-table-column prop="teacher" label="Преподаватель" />
      <el-table-column label="Действия">
        <template #default="{ row }">
          <el-button type="text" @click="editSchedule(row)">Редактировать</el-button>
          <el-button type="text" @click="deleteSchedule(row)">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import type { ScheduleItem } from '@/common/types/ScheduleItem'

const props = defineProps<{
  schedule: ScheduleItem[]
}>()

const emit = defineEmits(['add-schedule', 'edit-schedule', 'delete-schedule'])

const searchQuery = ref('')

const filteredSchedule = computed(() => {
  return props.schedule.filter((item) => {
    if (item.subject !== undefined && item.teacher !== undefined) {
      item.subject.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.teacher.toLowerCase().includes(searchQuery.value.toLowerCase())
    }
  })
})

const addSchedule = () => {
  emit('add-schedule')

  ElMessage.success('Добавление нового занятия')
}

const editSchedule = (item: ScheduleItem) => {
  emit('edit-schedule', item)

  ElMessage.success(`Редактирование занятия: ${item.subject}`)
}

const deleteSchedule = (item: ScheduleItem) => {
  emit('delete-schedule', item)

  ElMessage.success(`Занятие ${item.subject} удалено`)
}
</script>

<style scoped lang="scss">
.schedule-management {
  .el-button {
    margin-bottom: 20px;
  }

  .el-table {
    border-radius: 8px;
    overflow: hidden;
  }
}
</style>
