<template>
  <div class="teachers-page">
    <h1 class="page-title">Наши преподаватели</h1>
    <div class="teachers-list" :class="{ 'has-expanded': expandedCardId }">
      <teacher-card 
        v-for="userId in userIds" 
        :key="userId" 
        :userId="userId" 
        :is-expanded="expandedCardId === userId"
        :is-collapsed="!!expandedCardId && expandedCardId !== userId"
        class="post-card" 
        @expand="handleExpand"
        @collapse="handleCollapse"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TeacherCard from '../molecules/TeacherCard.vue'
import { ref, onMounted, nextTick } from 'vue'
import { userService } from '@/common/utils/UserService'

const userIds = ref<string[]>([])
const expandedCardId = ref<string | null>(null)
const scrollPosition = ref(0)

const handleExpand = (id: string) => {
  // Сохраняем позицию скролла перед открытием карточки
  scrollPosition.value = window.scrollY
  expandedCardId.value = id
  document.body.style.overflow = 'hidden' // Блокируем скролл страницы
}

const handleCollapse = () => {
  expandedCardId.value = null
  document.body.style.overflow = '' // Восстанавливаем скролл страницы
  
  // Возвращаем скролл на прежнюю позицию после обновления DOM
  nextTick(() => {
    window.scrollTo(0, scrollPosition.value)
  })
}

const fetchTeacherIds = async () => {
  try {
    const [error, response] = await userService.getTeachers()

    if (error) throw error

    const teacherList = response?.data?.data

    if (Array.isArray(teacherList) && teacherList.length > 0) {
      userIds.value = teacherList
    } else {
      throw new Error('Список преподавателей пуст')
    }
  } catch (error) {
    console.error('Ошибка при загрузке преподавателей:', error)
    userIds.value = ['1', '2', '3', '4', '5']
  }
}

const setupIntersectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible')
        } else {
          entry.target.classList.remove('fade-in-visible')
        }
      })
    },
    { threshold: 0.3 }
  )

  const postCards = document.querySelectorAll('.post-card')

  postCards.forEach((card) => {
    observer.observe(card)
  })
}

onMounted(() => {
  fetchTeacherIds().then(() => {
    setupIntersectionObserver()
  })
})
</script>

<style scoped lang="scss">
.teachers-page {
  padding: 20px;
  flex: 1;
  
}

.page-title {
  @include glass-text();
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--color-dark)-light;
}

.teachers-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  overflow-y: auto;
  max-height: 85vh;
  padding-right: 10px;
  transition: all 0.5s ease;
  
  &.has-expanded {
    grid-template-columns: 1fr;
    padding-right: 50vw;
    
    .collapsed-card {
      margin-right: 20px;
    }
  }
}

.teachers-list::-webkit-scrollbar {
  display: none;
}

.post-card {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.5s ease-out,
    transform 0.5s ease-out;
    
  &.expanded-card {
    position: fixed;
    right: 0;
    top: 0;
    width: 50vw;
    height: 100vh;
    z-index: 100;
  }
}

.post-card.fade-in-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>