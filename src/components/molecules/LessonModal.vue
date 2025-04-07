<template>
  <el-dialog
    v-model="visible"
    :title="modalTitle"
    width="500px"
    :close-on-click-modal="false"
  >
    <el-form :model="lesson" label-width="120px">
      <!-- Выбор времени -->
      <el-form-item label="Время">
        <el-time-picker
          v-model="timeRange"
          is-range
          range-separator="до"
          start-placeholder="Начало"
          end-placeholder="Конец"
          format="HH:mm"
          @change="handleTimeChange"
        />
      </el-form-item>

      <!-- Выбор предмета -->
      <el-form-item label="Предмет">
        <ASelectItem
          v-model="lesson.subject"
          :options="subjects"
          placeholder="Выберите предмет"
        />
      </el-form-item>

      <!-- Выбор преподавателя -->
      <el-form-item label="Преподаватель">
        <ASelectItem
          v-model="lesson.teacher"
          :options="teachers"
          placeholder="Выберите преподавателя"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">Отмена</el-button>
      <el-button type="primary" @click="onSave">Сохранить</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface Lesson {
  time: string;
  subject: string;
  teacher: string;
}

const props = defineProps<{
  modelValue: boolean;
  lesson: Lesson;
  isEditMode: boolean;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
  (event: 'save', lesson: Lesson): void;
  (event: 'delete'): void;
}>();

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const modalTitle = computed(() => (props.isEditMode ? 'Редактирование урока' : 'Добавление урока'));

// Выбор времени
const timeRange = ref<[Date, Date] | null>(null);

// Преобразуем время из строки в массив Date при открытии модального окна
watch(
  () => props.lesson.time,
  (newTime) => {
    if (newTime) {
      const [start, end] = newTime.split(' - ');
      timeRange.value = [new Date(`1970-01-01T${start}:00`), new Date(`1970-01-01T${end}:00`)];
    } else {
      timeRange.value = null;
    }
  },
  { immediate: true }
);

// Обработка изменения времени
function handleTimeChange(value: [Date, Date] | null) {
  if (value) {
    const startTime = value[0].toTimeString().slice(0, 5);
    const endTime = value[1].toTimeString().slice(0, 5);
    props.lesson.time = `${startTime} - ${endTime}`;
  } else {
    props.lesson.time = '';
  }
}

// Данные для выбора предмета и преподавателя
const subjects = ref([
  { value: 'Математика', label: 'Математика' },
  { value: 'Физика', label: 'Физика' },
  { value: 'Химия', label: 'Химия' },
]);

const teachers = ref([
  { value: 'Иванов И.И.', label: 'Иванов И.И.' },
  { value: 'Петров П.П.', label: 'Петров П.П.' },
  { value: 'Сидоров С.С.', label: 'Сидоров С.С.' },
]);

// Сохранение урока
function onSave() {
  emit('save', props.lesson);
  visible.value = false;
}

// Удаление урока
function onDelete() {
  emit('delete');
  visible.value = false;
}
</script>

<style scoped lang="scss">
.el-dialog {
  border-radius: 8px;
}

.el-form-item {
  margin-bottom: 20px;
}
</style>