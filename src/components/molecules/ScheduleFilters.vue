<template>
  <div class="schedule-filters">
    <el-select v-model="filters.group" placeholder="Группа" clearable>
      <el-option
        v-for="group in groups"
        :key="group"
        :label="group"
        :value="group"
      />
    </el-select>
    <el-select v-model="filters.subject" placeholder="Предмет" clearable>
      <el-option
        v-for="subject in subjects"
        :key="subject"
        :label="subject"
        :value="subject"
      />
    </el-select>
    <el-select v-model="filters.teacher" placeholder="Преподаватель" clearable>
      <el-option
        v-for="teacher in teachers"
        :key="teacher"
        :label="teacher"
        :value="teacher"
      />
    </el-select>
    <el-button type="primary" icon="el-icon-search" @click="applyFilters">Применить</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { scheduleService } from '@/common/utils/ScheduleService';

export default defineComponent({
  emits: ['filter'],
  setup(props, { emit }) {
    const filters = ref({
      group: '',
      subject: '',
      teacher: ''
    });

    const groups = ref<string[]>([]);
    const subjects = ref<string[]>([]);
    const teachers = ref<string[]>([]);

    const fetchGroups = async () => {
      try {
        const [error, response] = await scheduleService.getGroups();
        if (error) {
          throw error;
        }
        if (response?.data?.data) {
          groups.value = response.data.data.groups;
        }
      } catch (error) {
        console.error('Ошибка при загрузке групп:', error);
      }
    };

    const applyFilters = () => {
      emit('filter', filters.value);
    };

    onMounted(fetchGroups);

    return {
      filters,
      groups,
      subjects,
      teachers,
      applyFilters
    };
  }
});
</script>

<style scoped lang="scss">
.schedule-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
</style>