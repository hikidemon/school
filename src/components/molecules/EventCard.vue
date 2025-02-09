<template>
  <el-card class="event-card">
    <div class="event-card__header">
      <h2>Мои мероприятия</h2>
    </div>
    <div class="event-card__content">
      <div class="event-list">
        <div v-for="(event, index) in events" :key="index" class="event-item">
          <div class="event-item__info">
            <img :src="event.image" alt="Avatar" class="event-item__avatar" />
            <div class="event-item__details">
              <h3 class="event-item__title">{{ event.title }}</h3>
            </div>
          </div>
          <p class="event-item__date">{{ event.date }}</p>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { Ref, ref, onMounted, inject } from 'vue'
import { postService } from '@/common/utils/PostService'
import { ElNotification } from 'element-plus'
import { Post } from '@/common/types/Post'
import programsIcon from '@/assets/icons/3.png'

const events = ref<Post[]>([])
const registeredEvents = inject('registeredEvents') as Ref<number[]>
const defaultEvent: Post[] = [
  {
    id: 1,
    title: 'Конференция Vue.js',
    date: '2022-07-15',
    image: programsIcon,
  },
  {
    id: 2,
    title: 'Конференция React.js',
    date: '2022-07-15',
    image: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  },
  {
    id: 3,
    title: 'Конференция Angular.js',
    date: '2022-07-15',
    image: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  },
]

const fetchEvents = async () => {
  try {
    const [error, response] = await postService.getPosts()

    if (error) {
      throw error
    }

    const filteredEvents = response?.data.data.filter((event: Post) =>
      registeredEvents.value.includes(event.id)
    )

    events.value = filteredEvents || defaultEvent


  } catch (error) {
    console.error('Ошибка при загрузке мероприятий:', error)
    events.value =  defaultEvent
    ElNotification({
      title: 'Ошибка',
      message: 'Не удалось загрузить мероприятия',
      type: 'error',
      position: 'bottom-right',
    })
  }
}

onMounted(() => {
  fetchEvents()
})
</script>

<style scoped lang="scss">
.event-card {
  max-width: 900px;
  margin-left: -26%;
  border-radius: 12px;
  box-shadow: $box-shadow;
  width: 152%;
}

.event-card__header {
  text-align: center;
  padding: 20px;
  background: linear-gradient(90deg, $color-primary-gradient);
  animation: gradient-shift 4s linear infinite;
  border-radius: 12px 12px 0 0;
}

.event-card__header h2 {
  margin: 0;
  color: var(--color-white);
  font-size: 1.5rem;
}

.event-card__content {
  padding: 20px;
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.event-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  height: 120px;
}

.event-item:hover {
  background-color: var(--color-white)-dark;
}

.event-item__info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.event-item__avatar {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
}

.event-item__details {
  display: flex;
  flex-direction: column;
}

.event-item__title {
  font-size: 1.2rem;
  font-weight: bold;
}

.event-item__date {
  font-size: 1rem;
  font-weight: normal;
  color: #888;
  margin-left: auto;
}

@keyframes gradient-shift {
  0% {
    background-position: 0%;
  }

  100% {
    background-position: 100%;
  }
}
</style>
