<template>
  <div class="main-content">
    <h1>Мероприятия</h1>
    <div class="admin-panel" v-if="isAdmin">
      <a-button class="add-post-button" type="primary" @click="openCreateModal">
        Добавить пост
      </a-button>
    </div>
    <div class="post-list">
      <post-card
        v-for="post in posts"
        :key="post.id"
        :id="post.id"
        :title="post.title"
        :content="post.content"
        :image="post.image"
        :date="post.date"
        :type="post.type"
        :area="post.area"
        :time="post.time"
        :eventdate="post.eventdate"
        @open="handleOpenPost(post)"
        @delete="handleDeletePost"
        @edit="handleEditPost"
        @register="handleRegisterForEvent"
        class="fade-in post-card"
        :isRegistered="post.isRegistered"
      />
    </div>
    <post-form
      :visible="isModalVisible"
      :postToEdit="postToEdit"
      @submit="handleSubmitPost"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import PostCard from '../molecules/PostCard.vue'
import { postService } from '@/common/utils/PostService'
import { Post } from '@/common/types/Post'
import programsIcon from '@/assets/icons/3.png'
import '@/assets/styles/_dark-theme.scss'
import { ElNotification } from 'element-plus'
import PostForm from '@/components/molecules/PostForm.vue'
import { authService } from '@/common/utils/AuthService'

const posts = ref<Post[]>([])
const isModalVisible = ref(false)
const postToEdit = ref<Post | null>(null)
const isAdmin = ref(true)
const isLoading = ref(false)
const error = ref<string | null>(null)

// Improved fetchPosts with caching
const fetchPosts = async () => {
  try {
    isLoading.value = true
    error.value = null
    const [err, response] = await postService.getAllPosts()
    if (!err && response?.data) {
      posts.value = response.data.filter(post => post.type === 'event')
      localStorage.setItem('cachedEvents', JSON.stringify(posts.value))
    } else {
      throw new Error(err?.message || 'Failed to fetch events')
    }
  } catch (err) {
    console.error('Ошибка при загрузке мероприятий:', err)
    error.value = err.message
    // Try to load from cache
    const cached = localStorage.getItem('cachedEvents')
    if (cached) {
      posts.value = JSON.parse(cached)
    }
    ElNotification({
      title: 'Ошибка',
      message: error.value,
      type: 'error',
      position: 'bottom-right'
    })
  } finally {
    isLoading.value = false
  }
}

const handleOpenPost = (post: Post) => {
  console.log('Открыт пост:', post)
}

// Improved delete handler
const handleDeletePost = async (postId: number) => {
  try {
    const [err] = await postService.deletePost(postId)
    if (!err) {
      posts.value = posts.value.filter((post) => post.id !== postId)
      ElNotification({
        title: 'Успех',
        message: 'Мероприятие успешно удалено',
        type: 'success',
        position: 'bottom-right'
      })
    } else {
      throw new Error(err.message || 'Failed to delete event')
    }
  } catch (err) {
    console.error('Ошибка при удалении:', err)
    ElNotification({
      title: 'Ошибка',
      message: err.message,
      type: 'error',
      position: 'bottom-right'
    })
  }
}

const handleRegisterForEvent = async (postId: number) => {
  try {
    const [err] = await postService.registerForEvent(postId)
    if (!err) {
      const postIndex = posts.value.findIndex(p => p.id === postId)
      if (postIndex !== -1) {
        posts.value[postIndex].isRegistered = true
      }
      ElNotification({
        title: 'Успех',
        message: 'Вы успешно зарегистрировались на мероприятие',
        type: 'success',
        position: 'bottom-right'
      })
    } else {
      throw new Error(err.message || 'Failed to register for event')
    }
  } catch (err) {
    console.error('Ошибка при регистрации:', err)
    ElNotification({
      title: 'Ошибка',
      message: err.message,
      type: 'error',
      position: 'bottom-right'
    })
  }
}

const openCreateModal = () => {
  postToEdit.value = null
  isModalVisible.value = true
}

const handleEditPost = (post: Post) => {
  postToEdit.value = post
  isModalVisible.value = true
}

const handleSubmitPost = async (post: Post) => {
  try {
    if (post.id) {
      // Редактирование поста
      const [error, response] = await postService.updatePost(post.id, post);
      if (!error && response?.data) {
        // Обновляем локальное состояние
        const index = posts.value.findIndex(p => p.id === post.id);
        if (index !== -1) {
          posts.value[index] = { ...posts.value[index], ...response.data };
        }
      }
    } else {
      // Создание поста
      const [error, response] = await postService.createPost(post);
      if (!error && response?.data) {
        // Добавляем новый пост в локальное состояние
        posts.value.push(response.data.data);
      }
    }
    fetchPosts(); // Перезагружаем посты с сервера
    closeModal();
  } catch (error) {
    console.error('Ошибка при сохранении поста:', error);
    ElNotification({
      title: 'Ошибка',
      message: 'Не удалось сохранить пост.',
      type: 'error',
      position: 'bottom-right'
    });
  }
};

const closeModal = () => {
  isModalVisible.value = false
  postToEdit.value = null
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
const auth = useAuthStore()

// Check admin status on mount
onMounted(async () => {
  if (auth.isAdmin) {
  isAdmin.value=true
  console.log('Он админ 🔥')
}
  await fetchPosts()
  setupIntersectionObserver()
})
</script>

<style scoped lang="scss">
.main-content {
  flex: 1;
  padding: 20px;
}

h1 {
  @include glass-text();
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--color-dark)-light;
}

.post-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  overflow-y: auto;
  max-height: 85vh;
}

.post-card {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.5s ease-out,
    transform 0.5s ease-out;
}

.post-card.fade-in-visible {
  opacity: 1;
  transform: translateY(0);
}

.post-list::-webkit-scrollbar {
  display: none;
}
</style>
