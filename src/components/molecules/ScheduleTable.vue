<template>
  <table class="schedule-table">
    <thead>
      <tr>
        <th class="table-header"/>
        <th class="table-header group-header">
          {{ groups[0] }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="day in days" :key="day">
        <th class="table-header day-header">{{ day }}</th>
        <td class="table-cell">
          <div v-for="item in getScheduleForDayAndGroup(day, groups[0])" :key="item.time" class="schedule-item"
            :class="{ editable: isEditable, 'edit-mode': item.isEditing }" @click="handleCellClick(item)">
            <div v-if="!item.isEditing">
              <div class="time">{{ item.time }}</div>
              <div class="subject">{{ item.subject }}</div>
              <div class="teacher">{{ item.teacher }}</div>
            </div>
            <div v-else class="edit-form">
              <a-input v-model="item.time" placeholder="Время" />
              <a-input v-model="item.subject" placeholder="Предмет" />
              <a-input v-model="item.teacher" placeholder="Преподаватель" />
              <a-button type="primary" @click="saveChanges(item)">Сохранить</a-button>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { ScheduleItem } from '@/common/types/ScheduleItem'
import { ElMessage } from 'element-plus'
import { scheduleService } from '@/common/utils/ScheduleService'

const props = defineProps<{
  days: string[];
  groups: string[];
  schedule: ScheduleItem[];
  isEditable: boolean;
}>()

const getScheduleForDayAndGroup = (day: string, group: string) => {
  return props.schedule
    .filter((item) => item.day === day && item.group === group)
    .map((item) => ({ ...item, isEditing: false }))
}

const handleCellClick = (item: ScheduleItem & { isEditing: boolean }) => {
  if (props.isEditable) {
    item.isEditing = true
  }
}

const saveChanges = async (item: ScheduleItem & { isEditing: boolean }) => {
  try {
    const [error] = await scheduleService.updateScheduleItem(item)

    if (error) throw error

    ElMessage.success('Изменения сохранены')
    item.isEditing = false
  } catch (error) {
    console.error('Ошибка при сохранении изменений:', error)
    ElMessage.error('Не удалось сохранить изменения')
  }
}
</script>

<style scoped lang="scss">
.schedule-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0px 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.table-header {
  padding: 12px;
  text-align: center;
  font-weight: bold;
  color: var(--color-white);
  background: #81c5aa;
}

.group-header {
  background: #81c5aa;
  width: auto;
}

.day-header {
  height: auto;
  width:300px;
  background: #81c5aa;
}

.table-cell {
  border: 1px solid #e0e0e0;
  padding: 8px;
  vertical-align: top;
}

.schedule-item {
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0;
  background: #f9f9f9;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  border: 1px solid $color-white-dark;
}
.schedule-item div {
  flex: 1; 
  text-align: center; 
}

.schedule-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.schedule-item.editable {
  cursor: pointer;
}

.schedule-item.edit-mode {
  border: 2px solid transparent;
  background-clip: padding-box;
  position: relative;
}

.schedule-item.edit-mode::before {
  content: "";
  position: absolute;
  top: -160px;
  left: -160px;
  right: -160px;
  bottom: -160px;
  border-radius: 13px;
  background: conic-gradient(from 0deg,
      $color-primary-gradient, $color-primary-gradient);
  z-index: -1;
  animation: rotate 4s linear infinite;
}

.schedule-item.edit-mode::after {
  content: "";
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border-radius: 13px;
  background: conic-gradient(from 0deg,
      $color-primary-gradient, $color-primary-gradient);
  z-index: -2;
  filter: blur(8px);
  opacity: 0.7;
  animation: rotate 4s linear infinite;
}

.edit-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.time {
  font-weight: bold;
  color: var(--color-black-light);
  flex: 0.5; 
  text-align: left;
}

.subject {
  font-size:1.2rem;
  color: var(--color-black-light);
}

.teacher {
  font-size: 0.9rem;
  color: var(--color-black-light);
  flex: 1; 
  text-align: right;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>