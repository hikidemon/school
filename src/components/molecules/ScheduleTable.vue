<template>
  <div class="schedule-container">
    <!-- Текущая неделя -->
    <div class="current-week">
      Текущая неделя: {{ currentWeek }}
    </div>

    <!-- Фильтры -->
    <div class="filters">
      <ASelectItem
        v-model="selectedShift"
        :options="shifts"
        placeholder="Выберите смену"
        @change="applyFilters"
        class="select-filter"
      />
      <ASelectItem
        v-model="selectedSubject"
        :options="subjects"
        placeholder="Выберите предмет"
        @change="applyFilters"
      />
      <ASelectItem
        v-model="selectedTeacher"
        :options="teachers"
        placeholder="Выберите преподавателя"
        @change="applyFilters"
      />
    </div>

    <!-- Основной контейнер с группами и расписанием -->
    <div class="schedule-layout">
      <!-- Колонка с группами -->
      <div class="groups-column">
        <div 
          v-for="group in filteredGroups" 
          :key="group.name"
          class="group-item"
          :class="{ 'active-group': openedGroup?.name === group.name }"
          @click="toggleGroup(group)"
        >
          {{ group.name }}
          <el-icon :class="{ 'rotate-icon': openedGroup?.name === group.name }">
            <arrow-right />
          </el-icon>
        </div>
      </div>

      <!-- Колонка с расписанием -->
      <div class="schedule-column">
        <transition name="slide-fade">
          <div v-if="openedGroup" class="schedule-details">
            <div v-for="day in daysOfWeek" :key="day" class="day-column">
              <div class="day-header" @click="openAddModal(day)">
                {{ day }}
              </div>
              <div
                v-for="lesson in openedGroup.schedule[day]"
                :key="lesson.id"
                class="lesson"
                @click="openEditModal(lesson, day)"
              >
                <div class="lesson-content">
                  <div class="time">{{ lesson.time }}</div>
                  <div class="subject">{{ lesson.subject }}</div>
                  <div class="teacher">{{ lesson.teacher }}</div>
                </div>
                <el-icon class="delete-icon" @click.stop="deleteLesson(lesson, day)">
                  <delete />
                </el-icon>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Модальное окно для добавления/редактирования урока -->
    <LessonModal
      v-model:modelValue="isModalVisible"
      :lesson="currentLesson"
      :isEditMode="isEditMode"
      @save="handleSaveLesson"
      @delete="handleDeleteLesson"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { ArrowRight, Delete } from '@element-plus/icons-vue';
import LessonModal from './LessonModal.vue';
import ASelectItem from '@/components/atoms/ASelectItem.vue';
import { ScheduleItem } from '@/common/types/ScheduleItem';
import gsap from 'gsap';
import { scheduleService } from '@/common/utils/ScheduleService';
import { ElNotification } from 'element-plus';

interface Group {
  name: string;
  isOpen: boolean;
  schedule: {
    [day: string]: ScheduleItem[];
  };
}

const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

const groups = ref<Group[]>([]);
const openedGroup = ref<Group | null>(null);
const isModalVisible = ref(false);
const isEditMode = ref(false);
const currentLesson = ref<ScheduleItem>({});
const currentDay = ref<string>('');

// Фильтры
const selectedShift = ref<string | number>('');
const selectedSubject = ref<string | number>('');
const selectedTeacher = ref<string | number>('');

const shifts = ref<{ value: string; label: string }[]>([]);
const subjects = ref<{ value: string; label: string }[]>([]);
const teachers = ref<{ value: string; label: string }[]>([]);

const isUsingMockData = ref(false); // Флаг для использования моковых данных

const currentWeek = computed(() => {
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1));
  const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 7));
  return `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;
});

const filteredGroups = computed(() => {
  return groups.value
    .filter((group) => {
      const matchesShift = !selectedShift.value || group.name.includes(selectedShift.value);
      return matchesShift;
    })
    .map((group) => {
      return {
        ...group,
        schedule: Object.fromEntries(
          Object.entries(group.schedule).map(([day, lessons]) => [
            day,
            lessons.filter((lesson) => {
              const matchesSubject = !selectedSubject.value || lesson.subject === selectedSubject.value;
              const matchesTeacher = !selectedTeacher.value || lesson.teacher === selectedTeacher.value;
              return matchesSubject && matchesTeacher;
            }),
          ])
        ),
      };
    });
});

// Моковые данные
const mockData = {
  schedule: [
    {
      id: "1",
      day: "Понедельник",
      time: "09:00",
      subject: "Математика",
      teacher: "Иванов И.И.",
      group: "Группа 1",
    },
    {
      id: "2",
      day: "Понедельник",
      time: "10:00",
      subject: "Физика",
      teacher: "Петров П.П.",
      group: "Группа 1",
    },
    {
      id: "3",
      day: "Вторник",
      time: "09:00",
      subject: "Химия",
      teacher: "Сидоров С.С.",
      group: "Группа 2",
    },
  ],
  groups: ["Группа 1", "Группа 2"],
  subjects: ["Математика", "Физика", "Химия", "Биология"],
  teachers: ["Иванов И.И.", "Петров П.П.", "Сидоров С.С.", "Кузнецов К.К."],
};

// Загрузка данных
const loadData = async () => {
  try {
    const response = await scheduleService.getAllData();
    
    if (response.data.data) {
      groups.value = response.data.groups.map(group => ({
        name: group,
        isOpen: false,
        schedule: daysOfWeek.reduce((acc, day) => {
          acc[day] = response.data.schedule.filter(item => item.group === group && item.day === day);
          return acc;
        }, {} as { [day: string]: ScheduleItem[] }),
      }));

      shifts.value = response.data.groups.map(group => ({ value: group, label: group }));
      subjects.value = response.data.subjects.map(subject => ({ value: subject, label: subject }));
      teachers.value = response.data.teachers.map(teacher => ({ value: teacher, label: teacher }));
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    isUsingMockData.value = true;

    // Используем моковые данные
    groups.value = mockData.groups.map(group => ({
      name: group,
      isOpen: false,
      schedule: daysOfWeek.reduce((acc, day) => {
        acc[day] = mockData.schedule.filter(item => item.group === group && item.day === day);
        return acc;
      }, {} as { [day: string]: ScheduleItem[] }),
    }));

    shifts.value = mockData.groups.map(group => ({ value: group, label: group }));
    subjects.value = mockData.subjects.map(subject => ({ value: subject, label: subject }));
    teachers.value = mockData.teachers.map(teacher => ({ value: teacher, label: teacher }));

    // Уведомление пользователю
    ElNotification({
      title: 'Ошибка',
      message: 'Сервер недоступен. Используются локальные данные.',
      type: 'warning',
    });
  }
};


// Обновление openedGroup при изменении фильтров
watch(filteredGroups, (newFilteredGroups) => {
  if (openedGroup.value) {
    const updatedGroup = newFilteredGroups.find((group) => group.name === openedGroup.value?.name);
    if (updatedGroup) {
      openedGroup.value = { ...updatedGroup, isOpen: true };
    }
  }
});

function toggleGroup(group: Group) {
  group.isOpen = !group.isOpen;
  openedGroup.value = group.isOpen ? group : null;
  animateGroup(group);
}

function animateGroup(group: Group) {
  if (group.isOpen) {
    gsap.from('.schedule-details', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.out',
    });
  }
}

function openAddModal(day: string) {
  currentLesson.value = { day, time: '', subject: '', teacher: '', group: selectedShift.value };
  currentDay.value = day;
  isEditMode.value = false;
  isModalVisible.value = true;
}

function openEditModal(lesson: ScheduleItem, day: string) {
  currentLesson.value = { ...lesson };
  currentDay.value = day;
  isEditMode.value = true;
  isModalVisible.value = true;
}

function deleteLesson(lesson: ScheduleItem, day: string) {
  if (openedGroup.value) {
    openedGroup.value.schedule[day] = openedGroup.value.schedule[day].filter(
      (l) => l.id !== lesson.id
    );
  }
}

function handleSaveLesson(lesson: ScheduleItem) {
  if (openedGroup.value && currentDay.value) {
    if (isEditMode.value) {
      // Редактирование урока
      const lessons = openedGroup.value.schedule[currentDay.value];
      const index = lessons.findIndex((l) => l.id === lesson.id);
      if (index !== -1) {
        lessons[index] = { ...lesson };
      }
    } else {
      // Добавление урока
      lesson.id = String(Math.random()); // Генерация уникального ID
      openedGroup.value.schedule[currentDay.value].push({ ...lesson });
    }
  }
}

function handleDeleteLesson() {
  if (openedGroup.value && currentDay.value) {
    openedGroup.value.schedule[currentDay.value] = openedGroup.value.schedule[
      currentDay.value
    ].filter((l) => l.id !== currentLesson.value.id);
  }
}

function applyFilters() {
  console.log('Применены фильтры:', {
    shift: selectedShift.value,
    subject: selectedSubject.value,
    teacher: selectedTeacher.value,
  });
}

// Загрузка данных при монтировании компонента
onMounted(async () => {

 
  loadData()
  });
</script>

<style scoped lang="scss">
.schedule-container {
  padding: 20px;
  background-color: var(--color-white)-dark;
  border-radius: 12px;
  height: auto;
 
}


.current-week {
 
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: var(--color-emerald);
  $size: 2.2rem;
  $weight: 800;
  $thickness: $glass-thickness;
  $color: $glass-text-color;
  $glow-color: $glass-accent-color;
  $font-family: $glass-font-family;
 
  --glass-text-hue-rotate: 0deg;
  --glass-text-brightness: 1;
  
  font-family: $font-family;
  font-size: $size;
  font-weight: $weight;
  color: $color;
  display: inline-block;
  position: relative;
  text-shadow: 
    0 1px 0 rgba(255, 255, 255, 0.3),
    0 -1px 0 rgba(0, 0, 0, 0.7),
    0 2px 4px rgba(0, 0, 0, 0.5),
    0 4px 8px rgba($glow-color, 0.3),
    0 8px 16px rgba($glow-color, 0.2);
  
  &::before {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    color: rgba($glow-color, 0.7);
    z-index: -1;
    transform: translateZ(-$thickness/2);
    filter: 
      blur(1px)
      hue-rotate(var(--glass-text-hue-rotate))
      brightness(var(--glass-text-brightness));
    text-shadow: 
      0 0 10px rgba($glow-color, 0.7),
      0 0 20px rgba($glow-color, 0.5),
      0 0 30px rgba($glow-color, 0.3);
  }
  color:var(--color-black)-light;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.schedule-layout {
  display: flex;
  gap: 20px;
}

.groups-column {
  width: auto;
  border-right: 1px solid var(--color-black)-light;
  padding-right: 20px;
  height: auto;
}

.group-item {
  @include glass-button();
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 15px;
  margin-bottom: 8px;
  
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
   
    transform: translateY(-2px);
  }

  &.active-group {
    background-color: var(--color-emerald);
    font-weight: bold;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
}

.schedule-column {
  flex: 1;
  min-height: 500px;
}

.schedule-details {
  display: flex;
  padding: 10px;
  background-color: var(--color-white)-dark;
  border-radius: 8px;

  @include card-style();

}

.day-column {
  flex: 1;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
}

.day-header {
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--color-black)-light;
  cursor: pointer;
  transition: color 0.3s, transform 0.3s;
  $size: 2.2rem;
  $weight: 800;
  $thickness: $glass-thickness;
  $color: $glass-text-color;
  $glow-color: $glass-accent-color;
  $font-family: $glass-font-family;
 
  --glass-text-hue-rotate: 0deg;
  --glass-text-brightness: 1;
  
  font-family: $font-family;
  font-size: $size;
  font-weight: $weight;
  
  display: inline-block;
  position: relative;
  text-shadow: 
    0 1px 0 rgba(255, 255, 255, 0.3),
 
    0 4px 8px rgba($glow-color, 0.3),
    0 8px 16px rgba($glow-color, 0.2);
  
  &::before {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    color: rgba($glow-color, 0.7);
    z-index: -1;
    transform: translateZ(-$thickness/2);
    filter: 
      blur(1px)
      hue-rotate(var(--glass-text-hue-rotate))
      brightness(var(--glass-text-brightness));
    text-shadow: 
      0 0 10px rgba($glow-color, 0.7),
      0 0 20px rgba($glow-color, 0.5),
      0 0 30px rgba($glow-color, 0.3);
  }
  
 
  font-size:medium;

  &:hover {
    color: #0d8c5f;
    transform: translateY(-2px);
  }
}

.lesson {
  
  margin-bottom: 10px;
  padding: 10px;
  background-color: #73edc4;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  @include glass-button();


}

.lesson-content {
  flex: 1;
}

.delete-icon {
  cursor: pointer;
  color: #ff4444;
  transition: color 0.3s, transform 0.3s;

  &:hover {
    color: #cc0000;
    transform: scale(1.1);
  }
}

.rotate-icon {
  transform: rotate(90deg);
  transition: transform 0.3s;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>