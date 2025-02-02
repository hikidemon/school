<template>
  <el-card class="schedule-card">
    <div class="schedule-card__header">
      <h2>Расписание уроков</h2>
    </div>
    <div class="schedule-card__content">
      <el-collapse v-model="activePanels" accordion class="schedule-card__day">
        <el-collapse-item v-for="(day, index) in daysOfWeek" :key="index" :name="day" :title="day">
          <el-table :data="getScheduleForDay(day)" style="width: 100%" stripe>
            <el-table-column prop="time" label="Время" width="120" />
            <el-table-column prop="subject" label="Предмет" />
            <el-table-column prop="teacher" label="Преподаватель" />
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { scheduleService } from '@/common/utils/ScheduleService'
import { ElMessage } from 'element-plus'
import { ScheduleItem } from '@/common/types/ScheduleItem'

const defaultSchedule: ScheduleItem[] = [
  { day: 'Понедельник', time: '08:00-09:00', subject: 'Математика', teacher: 'Иванов И.И.' },
  { day: 'Понедельник', time: '10:00', subject: 'Физика', teacher: 'Петров П.П.' },
  { day: 'Вторник', time: '09:00', subject: 'Литература', teacher: 'Сидоров С.С.' },
  { day: 'Среда', time: '11:00', subject: 'История', teacher: 'Кузнецов А.А.' },
  { day: 'Четверг', time: '12:00', subject: 'Английский', teacher: 'Васильева Е.Е.' },
  { day: 'Пятница', time: '14:00', subject: 'Химия', teacher: 'Морозов В.В.' }
]

const activePanels = ref<string[]>([])

const schedule = ref<ScheduleItem[]>([])

const daysOfWeek = computed(() => {
  return ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница']
})

const getScheduleForDay = (day: string) => {
  if (!schedule.value) {
    return [] 
  }
  
  return schedule.value.filter(event => event.day === day)
}

const fetchSchedule = async () => {
  try {
    const [error, response] = await scheduleService.getSchedule()

    if (error) throw error
    console.log(response)

    if (response?.data ) {
      console.log(response.data)

      schedule.value = response.data.data || defaultSchedule
    }
  } catch (error) {
    console.error('Ошибка при загрузке расписания:', error)

    ElMessage.error('Не удалось загрузить расписание')

    schedule.value = defaultSchedule
  }
}

onMounted(() => {
  fetchSchedule()
})
</script>

<style scoped>
.schedule-card {
  max-width: 900px;
  margin-left: -26%;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 152%;
}

.schedule-card__header {
  text-align: center;
  padding: 20px;
  background: linear-gradient(90deg, #03ff89, #48f2b9, #6dedc2);
  animation: gradient-shift 4s linear infinite;
  border-radius: 12px 12px 0 0;
}

.schedule-card__header h2 {
  margin: 0;
  color: white;
  font-size: 1.5rem;
}

.schedule-card__content {
  padding: 20px;

}

.el-collapse-item {
  padding: 10px;

}

.el-table {
  margin-top: 10px;
}

.schedule-card__day {
  font-size: 2rem;
  font-weight: bold;
}

:deep(.el-table th) {
  background-color: #f5f7fa;
  color: #333;
  font-weight: bold;
}

:deep(.el-table tr) {
  transition: background-color 0.3s ease;
}

:deep(.el-table tr:hover) {
  background-color: #f0f2f5;
}

:deep(.el-table .el-table__row--striped) {
  background-color: #fafafa;
}

:deep(.el-collapse-item__header.is-active) {
  color: #1abc9c !important;
}

:deep(.el-collapse-item__header) {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
