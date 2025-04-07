<template>
  <el-dialog :visible="visible" @close="$emit('close')" title="Редактирование расписания">
    <el-form :model="item">
      <el-form-item label="День недели">
        <el-select v-model="item.day">
          <el-option
            v-for="day in daysOfWeek"
            :key="day"
            :label="day"
            :value="day"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Время">
        <el-time-picker v-model="item.time" format="HH:mm" />
      </el-form-item>
      <el-form-item label="Предмет">
        <el-input v-model="item.subject" />
      </el-form-item>
      <el-form-item label="Преподаватель">
        <el-input v-model="item.teacher" />
      </el-form-item>
      <el-form-item label="Группа">
        <el-select v-model="item.group">
          <el-option
            v-for="group in groups"
            :key="group"
            :label="group"
            :value="group"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="$emit('close')">Отмена</el-button>
      <el-button type="primary" @click="$emit('save', item)">Сохранить</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { scheduleService } from '@/common/utils/ScheduleService';
import type { ScheduleItem } from '@/common/types/ScheduleItem';

export default defineComponent({
  props: {
    item: {
      type: Object as () => ScheduleItem,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['save', 'close'],
  setup(props) {
    const groups = ref<string[]>([]);
    const daysOfWeek = ref([
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
      'Воскресенье'
    ]);

    const fetchGroups = async () => {
      try {
        const [error, response] = await scheduleService.getGroups();
        if (!error && response?.data) {
          groups.value = response.data.groups;
        }
      } catch (error) {
        console.error('Ошибка при загрузке групп:', error);
      }
    };

    onMounted(fetchGroups);

    return {
      groups,
      daysOfWeek
    };
  }
});
</script>

<style scoped lang="scss">
.el-dialog {
  width: 500px;
  border-radius: 8px;
}
</style>